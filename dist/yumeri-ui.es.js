document.addEventListener("DOMContentLoaded", () => {
  const i = {
    toggle: "[data-toggle]",
    dismiss: "[data-dismiss]",
    tab: "[data-tab]"
  }, c = {
    click: "click",
    show: "yuui.show",
    hide: "yuui.hide"
  }, r = /* @__PURE__ */ new Map(), o = (t, e) => {
    if (!t) return;
    const s = new CustomEvent(e, { bubbles: !0, cancelable: !0 });
    t.dispatchEvent(s);
  }, g = (t) => {
    const e = t.dataset.target, s = e ? document.querySelector(e) : null;
    if (!s) return;
    const a = "show";
    r.has(s.id) && clearTimeout(r.get(s.id)), s.classList.contains(a) || (s.classList.add(a), o(s, c.show));
    const n = parseInt(t.dataset.timeout, 10);
    if (!isNaN(n)) {
      const l = setTimeout(() => {
        d(s), r.delete(s.id);
      }, n);
      r.set(s.id, l);
    }
  }, f = (t) => {
    const e = t.dataset.target, s = e ? document.querySelector(e) : null;
    if (!s) return;
    const a = "active";
    s.classList.contains(a) ? d(s) : (s.classList.add(a), o(s, c.show));
  }, d = (t) => {
    if (!t) return;
    const s = t.classList.contains("notification") ? "show" : "active";
    t.classList.contains(s) && (t.classList.remove(s), o(t, c.hide));
  }, u = (t) => {
    const e = t.dataset.tab, s = document.querySelector(e);
    if (!s) return;
    const a = t.closest(".tabs");
    a && a.querySelectorAll(i.tab).forEach((l) => l.classList.remove("active"));
    const n = s.parentElement;
    n && n.querySelectorAll(":scope > *").forEach((l) => l.classList.remove("active")), t.classList.add("active"), s.classList.add("active"), o(t, c.show);
  }, m = (t) => {
    t.classList.toggle("active");
    const e = t.nextElementSibling;
    e && e.classList.contains("panel") && (e.style.maxHeight ? (e.style.maxHeight = null, o(t, c.hide)) : (e.style.maxHeight = e.scrollHeight + "px", o(t, c.show)));
  }, h = (t) => {
    const e = t.dataset.target, s = document.querySelector(e);
    s && (s.classList.toggle("active"), t.textContent = s.classList.contains("active") ? "Hide Code" : "Show Code");
  };
  document.addEventListener(c.click, (t) => {
    if (t.target.matches(".modal.active")) {
      d(t.target);
      return;
    }
    const e = t.target.closest(i.toggle + ", " + i.dismiss + ", " + i.tab);
    if (!e) return;
    const s = e.dataset.toggle;
    if (s)
      switch (s) {
        case "notification":
          g(e);
          break;
        case "accordion":
          m(e);
          break;
        case "code":
          h(e);
          break;
        default:
          f(e);
          break;
      }
    if (e.matches(i.dismiss)) {
      const a = e.closest(".modal, .notification");
      d(a);
    }
    e.matches(i.tab) && (t.preventDefault(), u(e));
  }), document.querySelectorAll(".tabs").forEach((t) => {
    const e = t.querySelector(i.tab + ".active") || t.querySelector(i.tab);
    e && u(e);
  });
});
