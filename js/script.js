/* ============================================================
   The Clarion — interactions + content rendering
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Data (stands in for a CMS / API feed) ---------- */
  const railItems = [
    { cat: "Ground Report", title: "The land that gives us light, and the people poisoned with it", author: "Hridayesh Joshi", img: "linear-gradient(135deg,#2b3a2a,#5a7a4a)" },
    { cat: "Press Freedom", title: "Journalists critical of the CM 'were targeted' until they backed off", author: "Ayush Tiwari", img: "linear-gradient(135deg,#2c2c3a,#54546b)" },
    { cat: "Podcast · Hafta 418", title: "Ramayana retelling, cinema politics & a new memoir", author: "Rajyasree & Abhinandan", img: "linear-gradient(135deg,#3a2740,#7a4f86)" },
  ];

  const stories = [
    { tag: "Explainer", tagClass: "", title: "Falling poverty numbers vs reality: can families afford two full meals?", dek: "Government surveys suggest historic reductions, but household expenditure figures paint a sobering picture of calorie deficits across small towns.", author: "Pooja Prasanna", time: "4 hours ago", img: "linear-gradient(135deg,#7a4a1f,#caa36b)" },
    { tag: "Legal Report", tagClass: "is-primary", title: "Anti-protest affidavit: journalists dispute the police account in court", dek: "Affidavits before the bench claim journalists were instigating crowds, but video metadata submitted by independent media tells a contradictory story.", author: "Khushi Mehrotra", time: "6 hours ago", img: "linear-gradient(135deg,#2a3344,#53647e)" },
    { tag: "Opinion", tagClass: "", title: "A licence to kill: why new experimentation rules put science at risk", dek: "The dismantling of regulatory oversight shifts scrutiny onto internal committees, risking compliance failures and unethical testing.", author: "Ambika Shukla", time: "Yesterday", img: "linear-gradient(135deg,#20323a,#3e6a74)" },
    { tag: "International", tagClass: "is-dark", title: "Top court finds state responsible for crimes against a minority", dek: "The panel unanimously rejected jurisdictional objections, mandating landmark reparations and monitored safe-return frameworks.", author: "Wire Service", time: "2 days ago", img: "linear-gradient(135deg,#3a2020,#7a4040)" },
  ];

  const columns = [
    {
      icon: "lock", title: "Subscriber Only", pill: "Pass",
      feature: { tag: "Exclusive", tagClass: "", icon: "lock", title: "Awful & Awesome 418: a retelling and a memoir", dek: "A critical look at upcoming film franchises, cultural censorship and political autobiographies.", author: "The Team", time: "Thu" , img: "linear-gradient(135deg,#3a2740,#6f4f86)" },
      list: [
        { t: "A tunnel project mired in cost audits and a 'lasting legacy'", m: "Sowmya Aji • 12 min" },
        { t: "Book launch: who made the guest list, and who didn't", m: "Manisha Pande • Analysis" },
        { t: "Survivors allege an arrested official abused institutional power", m: "Adil Bhat • Report" },
        { t: "Hafta 615: pollution crisis, crackers and the week's news", m: "Editorial Podcast" },
        { t: "The party, the committee and a disbanded panel", m: "Nidheesh M.K. • Politics" },
      ],
    },
    {
      icon: "bolt", title: "The Shot", pill: "Rapid",
      feature: { tag: "Quick Dispatch", tagClass: "is-primary", icon: "", title: "'A journalist would never shout slogans': police deny detaining reporters", dek: "The commissioner's office submits a defence affidavit amid mounting press-association petitions.", author: "The Desk", time: "Wed", img: "linear-gradient(135deg,#2a3344,#53647e)" },
      list: [
        { t: "A sting that exposed no crime: 'Operation Regime Change' dismantled", m: "Media Watch • Fact-check" },
        { t: "Impostor posing as cyber cell sought takedown of rights accounts", m: "Digital Rights Desk" },
        { t: "Police seek to silence digital-rights groups, want handle frozen", m: "Prateek Goyal • Tech" },
        { t: "Two firms make a global 'press freedom predators' watchlist", m: "International Wire" },
        { t: "People's tribunal indicts police over a student protest", m: "Civil Liberties Team" },
      ],
    },
    {
      icon: "travel_explore", title: "Ground Report", pill: "Field",
      feature: { tag: "Field Video", tagClass: "is-primary", icon: "", title: "The land that gives us light, and the people poisoned with mercury", dek: "Behind the power grid that lights the metros lies a silent neurological crisis in a tribal belt.", author: "Hridayesh Joshi", time: "Wed", img: "linear-gradient(135deg,#2b3a2a,#5a7a4a)" },
      list: [
        { t: "A 'clean river' PR stunt exposed: fake ghats, photo-ops and foam", m: "Basant Kumar • Ecology" },
        { t: "Locked when women need help? A reality check across 18 stations", m: "Akankhya Rout • Investigation" },
        { t: "Police vs protesters: an extraordinary cat-and-mouse chase", m: "Shivnarayan Rajpurohit" },
        { t: "Detention day: protesters picked up at dawn, counsel denied access", m: "Tanishka Sodhi • Legal" },
        { t: "As a firm sells green credits, a grassland community is left behind", m: "Ayush Tiwari • Carbon" },
      ],
    },
  ];

  const tickerLines = [
    "SC questions government over delay in filling vacant tribunals; next hearing Friday.",
    "NL-style crowdfund: Climate Docket 78% funded with three days to go.",
    "Parliament monsoon session: 12 bills listed, two referred to committee.",
    "AQI crosses 400 in the capital; schools shift to hybrid classes.",
  ];

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Render: hero rail ---------- */
  function renderRail() {
    const root = $("#heroRail");
    if (!root) return;
    railItems.forEach((it) => {
      const card = el("a", "rail-card reveal");
      card.href = "#";
      card.innerHTML = `
        <span class="rail-thumb" style="--img:${it.img}"></span>
        <span class="rail-info">
          <span class="rail-cat">${esc(it.cat)}</span>
          <span class="rail-title">${esc(it.title)}</span>
          <span class="rail-author">${esc(it.author)}</span>
        </span>`;
      root.appendChild(card);
    });
  }

  /* ---------- Render: story grid ---------- */
  function renderStories() {
    const root = $("#storyGrid");
    if (!root) return;
    stories.forEach((s) => {
      const a = el("article", "story reveal");
      a.innerHTML = `
        <a href="#" class="story-media" style="--img:${s.img}">
          <span class="story-tag ${s.tagClass}">${esc(s.tag)}</span>
        </a>
        <div class="story-body">
          <h3 class="story-title"><a href="#">${esc(s.title)}</a></h3>
          <p class="story-dek">${esc(s.dek)}</p>
          <div class="story-foot">
            <span class="author">${esc(s.author)}</span>
            <span>${esc(s.time)}</span>
          </div>
        </div>`;
      root.appendChild(a);
    });
  }

  /* ---------- Render: three columns ---------- */
  function renderColumns() {
    const root = $("#columns");
    if (!root) return;
    columns.forEach((c) => {
      const col = el("div", "column reveal");
      const listHtml = c.list.map((li) => `
        <a href="#">
          <span class="col-list-title">${esc(li.t)}</span>
          <span class="col-list-meta">${esc(li.m)}</span>
        </a>`).join("");
      const featIcon = c.feature.icon ? `<span class="material-symbols-outlined">${c.feature.icon}</span> ` : "";
      col.innerHTML = `
        <div class="col-head">
          <div class="col-head-left">
            <span class="material-symbols-outlined">${c.icon}</span>
            <h3>${esc(c.title)}</h3>
          </div>
          <span class="col-pill">${esc(c.pill)}</span>
        </div>
        <a href="#" class="col-feature">
          <span class="col-feature-media" style="--img:${c.feature.img}">
            <span class="col-feature-tag ${c.feature.tagClass}">${featIcon}${esc(c.feature.tag)}</span>
          </span>
          <span class="col-feature-body">
            <span class="col-feature-title">${esc(c.feature.title)}</span>
            <span class="col-feature-dek">${esc(c.feature.dek)}</span>
            <span class="col-feature-foot"><span>${esc(c.feature.author)}</span><span>${esc(c.feature.time)}</span></span>
          </span>
        </a>
        <nav class="col-list">${listHtml}</nav>`;
      root.appendChild(col);
    });
  }

  /* ---------- Date in utility bar ---------- */
  function setDate() {
    const node = $("#todayDate");
    if (!node) return;
    node.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const yr = $("#year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ---------- Theme toggle (persisted) ---------- */
  function initTheme() {
    const btn = $("#themeToggle");
    const icon = btn && btn.querySelector(".material-symbols-outlined");
    const root = document.documentElement;
    let stored = null;
    try { stored = localStorage.getItem("tc-theme"); } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const apply = (mode) => {
      root.setAttribute("data-theme", mode);
      if (icon) icon.textContent = mode === "dark" ? "light_mode" : "dark_mode";
    };
    apply(stored || (prefersDark ? "dark" : "light"));
    if (btn) btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("tc-theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  function initMenu() {
    const btn = $("#menuToggle");
    const nav = $("#mainNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Search drawer ---------- */
  function initSearch() {
    const btn = $("#searchToggle");
    const drawer = $("#searchDrawer");
    if (!btn || !drawer) return;
    btn.addEventListener("click", () => {
      drawer.hidden = !drawer.hidden;
      if (!drawer.hidden) {
        const input = drawer.querySelector("input");
        if (input) input.focus();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") drawer.hidden = true;
    });
  }

  /* ---------- Rotating ticker ---------- */
  function initTicker() {
    const track = $("#tickerTrack");
    if (!track) return;
    let i = 0;
    track.firstElementChild
      ? (track.firstElementChild.textContent = tickerLines[0])
      : (track.innerHTML = `<span>${esc(tickerLines[0])}</span>`);
    const span = track.querySelector("span");
    setInterval(() => {
      i = (i + 1) % tickerLines.length;
      span.style.opacity = "0";
      setTimeout(() => {
        span.textContent = tickerLines[i];
        span.style.opacity = "1";
      }, 300);
    }, 4000);
    span.style.transition = "opacity .3s";
  }

  /* ---------- Newsletter form ---------- */
  function initNewsletter() {
    const form = $("#newsForm");
    const msg = $("#newsMsg");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const val = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg.style.color = "#ff8a80";
        msg.textContent = "Please enter a valid email address.";
        return;
      }
      msg.style.color = "#7dd87d";
      msg.textContent = "You're subscribed to The Dispatch. Thank you!";
      form.reset();
    });
  }

  /* ---------- Scroll reveal + back-to-top + sticky shadow ---------- */
  function initScroll() {
    const toTop = $("#toTop");
    const reveals = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              obs.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((r) => io.observe(r));
    } else {
      reveals.forEach((r) => r.classList.add("in"));
    }

    if (toTop) {
      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
      window.addEventListener(
        "scroll",
        () => { toTop.classList.toggle("show", window.scrollY > 600); },
        { passive: true }
      );
    }
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderRail();
    renderStories();
    renderColumns();
    setDate();
    initTheme();
    initMenu();
    initSearch();
    initTicker();
    initNewsletter();
    initScroll();
  });
})();
