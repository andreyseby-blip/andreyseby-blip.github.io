gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // ---------- Headline wipe reveal (clip-path, left to right) ----------
  const wipeTargets = document.querySelectorAll(
    ".section-head h2, .agent-title, .contact-copy h2"
  );
  wipeTargets.forEach((el) => {
    gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.9,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ---------- Section eyebrows / subs (fade + rise) ----------
  document.querySelectorAll(".section-head").forEach((head) => {
    const rest = Array.from(head.children).filter(
      (c) => !c.matches("h2")
    );
    if (!rest.length) return;
    gsap.from(rest, {
      opacity: 0,
      y: 22,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: head,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ---------- Card grids: alternating slide-in with rotation + snap ----------
  // process-grid is intentionally excluded: it has its own pinned,
  // scrubbed GSAP timeline defined in script.js.
  // Horizontal travel is desktop-only: on narrow viewports the grid is a
  // single column, so an x-offset would push cards past the screen edge.
  const isNarrow = window.matchMedia("(max-width: 700px)").matches;

  ["services-grid", "work-grid"].forEach((className) => {
    const grid = document.querySelector("." + className);
    if (!grid || !grid.children.length) return;
    const cards = gsap.utils.toArray(grid.children);

    cards.forEach((card, i) => {
      const fromX = isNarrow ? 0 : i % 2 === 0 ? -90 : 90;
      gsap.set(card, {
        opacity: 0,
        x: fromX,
        y: 40,
        rotate: isNarrow ? 0 : i % 2 === 0 ? -5 : 5,
        scale: 0.9,
      });
    });

    ScrollTrigger.batch(cards, {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.5)",
          stagger: 0.12,
          overwrite: true,
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.3,
          overwrite: true,
        }),
    });
  });

  // ---------- AI Agent spotlight ----------
  const agentSub = document.querySelector(".agent-sub");
  if (agentSub) {
    gsap.from(agentSub, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".agent-spotlight",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const uiCard = document.querySelector(".ui-card");
  if (uiCard) {
    gsap.from(uiCard, {
      opacity: 0,
      y: 60,
      rotate: -8,
      scale: 0.8,
      duration: 0.9,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: uiCard,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const agentTags = document.querySelectorAll(".agent-tag");
  if (agentTags.length) {
    gsap.from(agentTags, {
      opacity: 0,
      y: 24,
      scale: 0.7,
      duration: 0.6,
      ease: "back.out(2)",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".agent-tags-row",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ---------- Contact ----------
  const contactKids = document.querySelectorAll(
    ".contact-copy > *:not(h2)"
  );
  if (contactKids.length) {
    gsap.from(contactKids, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".contact-copy",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    gsap.from(contactForm, {
      opacity: 0,
      x: isNarrow ? 0 : 80,
      y: isNarrow ? 40 : 0,
      rotate: isNarrow ? 0 : 4,
      scale: 0.92,
      duration: 0.9,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: contactForm,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ---------- Parallax: fixed cube reacts strongly to scroll ----------
  const fixedCube = document.querySelector(".fixed-cube");
  if (fixedCube) {
    gsap.to(fixedCube, {
      y: 480,
      x: 60,
      rotateZ: 14,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // ---------- Parallax: fixed backdrop photo drifts + slow zoom ----------
  const fixedBg = document.querySelector(".fixed-bg");
  if (fixedBg) {
    gsap.to(fixedBg, {
      backgroundPosition: "center 80%",
      scale: 1.18,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // ---------- Hero glow pulses outward as you leave the hero ----------
  const heroGlow = document.querySelector(".hero-glow");
  if (heroGlow) {
    gsap.to(heroGlow, {
      scale: 1.6,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  return () => {
    // gsap.matchMedia() auto-reverts every tween/ScrollTrigger created above
    // when this media query stops matching (e.g. reduced-motion toggled on).
  };
});
