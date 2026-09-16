// ============ Mobile nav ============
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ============ Project data for lightbox ============
const PROJECTS = {
  scraping: {
    tag: "Python · Web Scraping",
    title: "Any public catalog → structured data",
    desc: "A scraping pipeline that walks paginated listings, extracts titles, prices, ratings, and stock, then deduplicates and exports a clean report. The same script adapts to a new target site by swapping the base URL and the selectors — the pipeline underneath stays the same.",
    stats: [
      { num: "1,248", label: "items scraped" },
      { num: "63", label: "pages crawled" },
      { num: "1,102", label: "in stock" },
    ],
    images: [
      "assets/web-scraping/gallery-1-title.png",
      "assets/web-scraping/gallery-2-items.png",
      "assets/web-scraping/gallery-3-dashboard.png",
    ],
    video: "assets/web-scraping/project-video.mp4",
    pdf: "assets/web-scraping/sample-deliverable.pdf",
  },
  excel: {
    tag: "Excel · Dashboards",
    title: "Manual invoice tracking → a live dashboard",
    desc: "An Excel workbook where VLOOKUP applies the right tax rate per category, IF flags anything overdue against today's date, and SUMIF rolls totals up automatically. Delivered as a working .xlsx file, not a screenshot — open it and the formulas are already there.",
    stats: [
      { num: "€18.9k", label: "revenue tracked" },
      { num: "5", label: "categories" },
      { num: "0", label: "manual formulas needed" },
    ],
    images: [
      "assets/excel-automation/gallery-1-title.png",
      "assets/excel-automation/gallery-2-invoices.png",
      "assets/excel-automation/gallery-3-dashboard.png",
    ],
    video: "assets/excel-automation/project-video.mp4",
    pdf: "assets/excel-automation/sample-deliverable.pdf",
  },
  workflow: {
    tag: "n8n · Python · Scripts",
    title: "Invoices, orders, and daily reports on autopilot",
    desc: "Three separate automations built on the same idea: watch for something to happen, do the tedious part instantly, and leave a clean trail. PDFs get parsed into a spreadsheet, new orders get synced and posted to Slack, and a sales report gets built and emailed out — all without anyone opening the source files by hand.",
    stats: [
      { num: "18", label: "invoices in 4.8s" },
      { num: "1.8s", label: "avg. order sync" },
      { num: "2.5 hrs", label: "saved per week" },
    ],
    images: [
      "assets/invoice-automation/gallery-1-invoice.png",
      "assets/invoice-automation/gallery-2-order-sync.png",
      "assets/invoice-automation/gallery-3-daily-report.png",
    ],
    pdfs: [
      { label: "Invoice extraction — sample", href: "assets/invoice-automation/automation-1-invoice-extraction.pdf" },
      { label: "Order sync — sample", href: "assets/invoice-automation/automation-2-order-sync.pdf" },
      { label: "Daily report — sample", href: "assets/invoice-automation/automation-3-daily-report.pdf" },
    ],
  },
  website: {
    tag: "Web Design · Front-End",
    title: "A boutique real-estate site, built to convert",
    desc: "A responsive business site for a real-estate brand: a hero that sells the listing, a gallery grid the team can update themselves, and a live viewing-slot scheduler that plugs into whatever booking tool the business already uses.",
    stats: [
      { num: "100%", label: "responsive" },
      { num: "3", label: "core pages" },
      { num: "1", label: "booking flow" },
    ],
    images: [
      "assets/website-customization/gallery-1-hero.png",
      "assets/website-customization/gallery-2-listings.png",
      "assets/website-customization/gallery-3-booking.png",
    ],
    video: "assets/website-customization/project-video.mp4",
    pdf: "assets/website-customization/sample-deliverable.pdf",
  },
  northstudio: {
    tag: "Web Design · Booking Flow",
    title: "A booking-ready site for local service businesses",
    desc: "A concept website built for a modern salon-style business: a landing page that sells the experience, clearly priced services, a photo gallery, a founder/about section, and a live appointment scheduler where a visitor picks a service, a date, and a time. Presented here as a demo, not a real client build — the structure adapts quickly to any local service business with branding, photos, and pricing swapped in.",
    stats: [
      { num: "3", label: "steps to book" },
      { num: "100%", label: "responsive" },
      { num: "Live", label: "interactive demo" },
    ],
    images: [
      "assets/north-studio/gallery-1-hero.png",
      "assets/north-studio/gallery-2-services.png",
      "assets/north-studio/gallery-3-booking.png",
    ],
    live: "https://north-studio-upwork-demo.pages.dev",
  },
  cleaning: {
    tag: "PowerShell · Data Cleaning",
    title: "Messy sales exports → a clean report, automatically",
    desc: "A script that normalizes inconsistent date formats and product-name casing, fills in missing quantities and prices from known values, flags anything it had to guess at, and removes duplicate rows — then writes out a clean CSV plus a revenue-by-product summary.",
    stats: [
      { num: "12", label: "raw rows read" },
      { num: "2", label: "duplicates removed" },
      { num: "$657.41", label: "total revenue" },
    ],
    images: [],
  },
};

// ============ Lightbox ============
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");

function renderProject(key) {
  const p = PROJECTS[key];
  if (!p) return "";

  const gallery = p.images && p.images.length
    ? `<div class="lb-gallery">${p.images.map((src) => `<img src="${src}" alt="${p.title} screenshot" loading="lazy">`).join("")}</div>`
    : "";

  const video = p.video
    ? `<video class="lb-video" src="${p.video}" controls preload="metadata"></video>`
    : "";

  const stats = p.stats
    ? `<div class="lb-stats">${p.stats.map((s) => `<div class="lb-stat"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>`).join("")}</div>`
    : "";

  let actions = "";
  if (p.pdf) {
    actions = `<a class="btn btn-secondary" href="${p.pdf}" target="_blank" rel="noopener">View sample deliverable (PDF)</a>`;
  } else if (p.pdfs) {
    actions = p.pdfs.map((pdf) => `<a class="btn btn-secondary" href="${pdf.href}" target="_blank" rel="noopener">${pdf.label}</a>`).join("");
  } else if (p.live) {
    actions = `<a class="btn btn-secondary" href="${p.live}" target="_blank" rel="noopener">View live demo →</a>`;
  }

  return `
    <p class="lb-tag">${p.tag}</p>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    ${stats}
    ${video}
    ${gallery}
    <div class="lb-actions">${actions}</div>
  `;
}

function openLightbox(key) {
  lightboxContent.innerHTML = renderProject(key);
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";

  lightboxContent.querySelectorAll(".lb-gallery img").forEach((img) => {
    img.addEventListener("click", () => openFullImage(img.src));
  });

  lightboxContent.querySelectorAll(".lb-stat").forEach((stat, i) => {
    stat.style.opacity = "0";
    stat.style.transform = "translateY(10px) scale(0.94)";
    requestAnimationFrame(() => {
      stat.style.transition = `opacity 0.4s ease ${i * 90}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`;
      stat.style.opacity = "1";
      stat.style.transform = "translateY(0) scale(1)";
    });
  });
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  lightboxContent.querySelectorAll("video").forEach((v) => v.pause());
}

document.querySelectorAll("[data-open]").forEach((el) => {
  el.addEventListener("click", () => openLightbox(el.getAttribute("data-open")));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeFullImage();
  }
});

// ============ Full-size image viewer ============
const lbFull = document.createElement("div");
lbFull.className = "lb-full";
lbFull.innerHTML = '<img id="lbFullImg" src="" alt="">';
document.body.appendChild(lbFull);
const lbFullImg = document.getElementById("lbFullImg");

function openFullImage(src) {
  lbFullImg.src = src;
  lbFull.classList.add("open");
}
function closeFullImage() {
  lbFull.classList.remove("open");
}
lbFull.addEventListener("click", closeFullImage);

// ============ Live terminal widget ============
const terminalLines = [
  { text: "Reading raw file: messy_sales_data.csv", cls: "" },
  { text: "12 raw rows read", cls: "" },
  { text: "Row 7 (Keyboard, 2026-01-11): missing Customer -&gt; marked 'Unknown'", cls: "" },
  { text: "Row 10 (USB-C Hub, 2026-01-14): missing Quantity -&gt; defaulted to 1", cls: "" },
  { text: "2 duplicate rows removed", cls: "" },
  { text: "3 data issues auto-fixed", cls: "" },
  { text: "clean_sales_data.csv written &check;", cls: "ok" },
  { text: "sales_summary_report.csv written &check;", cls: "ok" },
  { text: "TOTAL REVENUE: <span class=\"hl\">$657.41</span>", cls: "" },
];

function typeTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body || body.dataset.done) return;
  body.innerHTML = "";
  let i = 0;
  function next() {
    if (i >= terminalLines.length) {
      body.dataset.done = "true";
      const cursor = document.createElement("span");
      cursor.className = "terminal-cursor";
      body.appendChild(cursor);
      return;
    }
    const line = document.createElement("div");
    line.className = `terminal-line ${terminalLines[i].cls}`;
    line.innerHTML = `<span style="color:#4a5266">$</span> ${terminalLines[i].text}`;
    body.appendChild(line);
    i++;
    setTimeout(next, 260);
  }
  next();
}

const terminalCard = document.querySelector(".work-card--live");
if (terminalCard) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeTerminal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(terminalCard);
}

// ============ Scroll-reveal for cards (staggered) ============
const revealGroups = document.querySelectorAll(".services-grid, .work-grid, .process-grid, .credentials-grid");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealGroups.forEach((group) => {
  Array.from(group.children).forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`;
    revealObserver.observe(el);
  });
});

// ============ Tilt-on-hover for cards ============
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  document.querySelectorAll(".work-card, .service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ============ Contact form (Formspree AJAX) ============
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const action = contactForm.getAttribute("action");

  if (!action || action.includes("YOUR_FORM_ID")) {
    formNote.textContent = "Contact form isn't connected yet — reach out on Upwork instead for now.";
    formNote.style.color = "var(--accent-bright)";
    return;
  }

  formNote.textContent = "Sending…";
  try {
    const res = await fetch(action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      contactForm.reset();
      formNote.textContent = "Thanks — message sent. I'll get back to you within a day or two.";
      formNote.style.color = "var(--success)";
    } else {
      throw new Error("Request failed");
    }
  } catch (err) {
    formNote.textContent = "Something went wrong — please reach out on Upwork instead.";
    formNote.style.color = "var(--accent-bright)";
  }
});
