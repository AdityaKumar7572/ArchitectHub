/* nav shadow */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("sh", scrollY > 10),
);

/* hamburger */
const hbg = document.getElementById("hbg"),
  mob = document.getElementById("mobMenu");
hbg.addEventListener("click", () => mob.classList.toggle("open"));
mob
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => mob.classList.remove("open")),
  );

/* scroll reveal */
const rvEls = document.querySelectorAll(".rv");
const rvObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        rvObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
rvEls.forEach((el) => rvObs.observe(el));

/* counter */
const counters = document.querySelectorAll(".si-num[data-t]");
const cntObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target,
        tgt = +el.dataset.t,
        step = Math.ceil(tgt / 50);
      let cur = 0;
      const tick = setInterval(() => {
        cur = Math.min(cur + step, tgt);
        el.textContent = cur.toLocaleString();
        if (cur >= tgt) clearInterval(tick);
      }, 28);
      cntObs.unobserve(el);
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => cntObs.observe(c));

/* portfolio tabs */
document.querySelectorAll(".port-tab").forEach((t) => {
  t.addEventListener("click", function () {
    document
      .querySelectorAll(".port-tab")
      .forEach((x) => x.classList.remove("active"));
    this.classList.add("active");
    const g = document.querySelector(".port-grid");
    g.style.opacity = ".45";
    g.style.transition = "opacity .18s";
    setTimeout(() => {
      g.style.opacity = "1";
    }, 260);
  });
});

/* testimonials */
const tests = [
  {
    txt: "They were friendly and a pleasure to work with — in close contact throughout the build. ArchitectHub is professional, transparent, and their pricing is 100% fair. Absolutely first-call for our next development.",
    name: "Riya Choudhary",
    role: "Homeowner, Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    txt: "ArchitectHub delivered our commercial complex three weeks ahead of schedule and 8% under budget. The quality is outstanding and their communication never missed a beat.",
    name: "David Mercer",
    role: "Property Developer, London",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    txt: "From concept to handover the team guided every decision. They flagged potential issues before they became problems and our staff love working in the new building.",
    name: "Priya Singh",
    role: "Operations Director, Dubai",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b78c?w=200&q=80",
  },
];
let ct = 0;
const tt = document.getElementById("testiTxt"),
  tn = document.getElementById("testiName"),
  tr = document.getElementById("testiRole"),
  ta = document.getElementById("testiAvatar"),
  dots = document.querySelectorAll(".tdot");
function showT(i) {
  [tt, tn, tr, ta].forEach((el) => {
    el.style.opacity = "0";
    el.style.transition = "opacity .28s";
  });
  setTimeout(() => {
    tt.textContent = tests[i].txt;
    tn.textContent = tests[i].name;
    tr.textContent = tests[i].role;
    ta.src = tests[i].avatar;
    [tt, tn, tr, ta].forEach((el) => (el.style.opacity = "1"));
    dots.forEach((d, j) => d.classList.toggle("act", j === i));
  }, 280);
}
dots.forEach((d) =>
  d.addEventListener("click", () => {
    ct = +d.dataset.i;
    showT(ct);
  }),
);
setInterval(() => {
  ct = (ct + 1) % tests.length;
  showT(ct);
}, 6500);

/* contact form */
document.getElementById("cForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const b = this.querySelector(".btn-y");
  b.textContent = "✓ Message Sent!";
  b.style.background = "#4caf50";
  b.style.color = "#fff";
  setTimeout(() => {
    this.reset();
    b.textContent = "Send Message →";
    b.style.background = "";
    b.style.color = "";
  }, 3500);
});
