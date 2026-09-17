gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // ---------- Section headings (eyebrow / title / sub) ----------
  document.querySelectorAll(".section-head").forEach((head) => {
    gsap.from(head.children, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: head,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ---------- Card grids (staggered rise + scale) ----------
  // process-grid is intentionally excluded: it has its own pinned,
  // scrubbed GSAP timeline defined in script.js.
  ["services-grid", "work-grid"].forEach((className) => {
    const grid = document.querySelector("." + className);
    if (!grid || !grid.children.length) return;
    const cards = gsap.utils.toArray(grid.children);

    gsap.set(cards, { opacity: 0, y: 30, scale: 0.96 });

    ScrollTrigger.batch(cards, {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
        }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 30, scale: 0.96 }),
    });
  });

  // ---------- AI Agent spotlight ----------
  const agentTitle = document.querySelector(".agent-title");
  const agentSub = document.querySelector(".agent-sub");
  if (agentTitle && agentSub) {
    gsap.from([agentTitle, agentSub], {
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
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
      y: 34,
      scale: 0.9,
      duration: 0.8,
      ease: "back.out(1.5)",
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
      y: 18,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".agent-tags-row",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ---------- Contact ----------
  const contactKids = document.querySelectorAll(".contact-copy > *");
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
      y: 34,
      scale: 0.97,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactForm,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ---------- Parallax: fixed cube drifts slowly with scroll ----------
  const fixedCube = document.querySelector(".fixed-cube");
  if (fixedCube) {
    gsap.to(fixedCube, {
      y: 140,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // ---------- Parallax: fixed backdrop photo drifts too, slower ----------
  const fixedBg = document.querySelector(".fixed-bg");
  if (fixedBg) {
    gsap.to(fixedBg, {
      backgroundPosition: "center 55%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  return () => {
    // gsap.matchMedia() auto-reverts every tween/ScrollTrigger created above
    // when this media query stops matching (e.g. reduced-motion toggled on).
  };
});
