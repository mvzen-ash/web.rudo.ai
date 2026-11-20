// Orion marketing site — small, dependency-free interactivity.
(function(){
  "use strict";

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if (toggle && links){
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ links.classList.remove("open"); });
    });
  }

  /* ---------- active nav link ---------- */
  var path = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  document.querySelectorAll(".nav-links a[href]").forEach(function(a){
    var href = a.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    if (href === path || (href !== "/" && path.indexOf(href) === 0)) a.classList.add("active");
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      item.closest(".faq-list").querySelectorAll(".faq-item.open").forEach(function(o){
        if (o !== item) o.classList.remove("open");
      });
      item.classList.toggle("open", !isOpen);
    });
  });

  /* ---------- "Coming soon" modal ---------- */
  var overlay = document.getElementById("coming-soon-modal");
  function openModal(){
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    var closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(){
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-coming-soon]").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      openModal();
    });
  });
  if (overlay){
    overlay.addEventListener("click", function(e){
      if (e.target === overlay) closeModal();
    });
    overlay.querySelectorAll("[data-modal-close]").forEach(function(b){
      b.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------- OS tab switcher (download page) ---------- */
  var osTabs = document.querySelectorAll(".os-tab");
  var osPanels = document.querySelectorAll("[data-os-panel]");
  if (osTabs.length){
    osTabs.forEach(function(tab){
      tab.addEventListener("click", function(){
        osTabs.forEach(function(t){ t.classList.remove("active"); });
        tab.classList.add("active");
        var os = tab.getAttribute("data-os");
        osPanels.forEach(function(p){
          p.style.display = (p.getAttribute("data-os-panel") === os) ? "" : "none";
        });
      });
    });
  }

  /* ---------- docs scroll-spy ---------- */
  var tocLinks = document.querySelectorAll(".docs-toc a");
  if (tocLinks.length){
    var targets = [];
    tocLinks.forEach(function(a){
      var id = a.getAttribute("href").replace("#", "");
      var el = document.getElementById(id);
      if (el) targets.push({ a: a, el: el });
    });
    var onScroll = function(){
      var y = window.scrollY + 120;
      var current = targets[0];
      targets.forEach(function(t){ if (t.el.offsetTop <= y) current = t; });
      tocLinks.forEach(function(a){ a.classList.remove("active"); });
      if (current) current.a.classList.add("active");
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- terminal typing effect (hero) ---------- */
  var term = document.querySelector("[data-term-lines]");
  if (term && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var lines = Array.prototype.slice.call(term.querySelectorAll(".term-line"));
    lines.forEach(function(l){ l.style.display = "none"; });
    var i = 0;
    var reveal = function(){
      if (i >= lines.length) return;
      lines[i].style.display = "";
      i++;
      setTimeout(reveal, 260);
    };
    setTimeout(reveal, 300);
  }
})();
