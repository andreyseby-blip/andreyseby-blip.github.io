import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("heroCanvas");
if (canvas && !window.matchMedia("(max-width: 640px)").matches) {
  initScene(canvas);
}

function makeGlowTexture(hex) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, hex + "ff");
  g.addColorStop(0.35, hex + "aa");
  g.addColorStop(1, hex + "00");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function initScene(canvas) {
  const hero = canvas.closest(".hero");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const group = new THREE.Group();
  scene.add(group);

  // --- nodes ---
  const NODE_COUNT = 30;
  const nodePositions = [];
  const spread = { x: 7.5, y: 4, z: 3.5 };

  for (let i = 0; i < NODE_COUNT; i++) {
    const pos = new THREE.Vector3(
      (Math.random() * 2 - 1) * spread.x,
      (Math.random() * 2 - 1) * spread.y,
      (Math.random() * 2 - 1) * spread.z
    );
    nodePositions.push(pos);
  }

  const glowOrange = makeGlowTexture("#f0924f");
  const glowWhite = makeGlowTexture("#c7ccd6");

  nodePositions.forEach((pos, i) => {
    const isHub = i % 6 === 0;
    const material = new THREE.SpriteMaterial({
      map: isHub ? glowOrange : glowWhite,
      transparent: true,
      opacity: isHub ? 0.95 : 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(material);
    const scale = isHub ? 0.85 : 0.4 + Math.random() * 0.25;
    sprite.scale.set(scale, scale, 1);
    sprite.position.copy(pos);
    sprite.userData.baseY = pos.y;
    sprite.userData.bobOffset = Math.random() * Math.PI * 2;
    sprite.userData.bobSpeed = 0.4 + Math.random() * 0.3;
    group.add(sprite);
  });

  // --- connections (nearest neighbours) ---
  const K = 2;
  const MAX_DIST = 4.5;
  const linePositions = [];
  const lineColor = new THREE.Color("#e2793d");

  nodePositions.forEach((pos, i) => {
    const distances = nodePositions
      .map((p, j) => ({ j, d: i === j ? Infinity : pos.distanceTo(p) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K);

    distances.forEach(({ j, d }) => {
      if (d < MAX_DIST) {
        linePositions.push(pos.x, pos.y, pos.z, nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
      }
    });
  });

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  // --- render sizing ---
  function resize() {
    const rect = hero.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // --- mouse parallax ---
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let raf = null;
  let visible = true;
  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
    if (visible && !raf) animate();
  });

  const clock = new THREE.Clock();

  function animate() {
    if (!visible) {
      raf = null;
      return;
    }
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      group.rotation.y += 0.0009;
      group.rotation.x += (mouseY * 0.12 - group.rotation.x) * 0.02;
      group.rotation.y += (mouseX * 0.08) * 0.002;

      group.children.forEach((child) => {
        if (child.isSprite) {
          child.position.y = child.userData.baseY + Math.sin(t * child.userData.bobSpeed + child.userData.bobOffset) * 0.18;
        }
      });
    }

    renderer.render(scene, camera);
  }
  animate();
}
