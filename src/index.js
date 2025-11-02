import './index.css';
document.addEventListener('DOMContentLoaded', () => {
  const SELECTORS = {
    toggle: '[data-toggle]',
    dismiss: '[data-dismiss]',
    tab: '[data-tab]',
  };

  const EVENTS = {
    click: 'click',
    show: 'yuui.show',
    hide: 'yuui.hide',
  };

  const notificationTimers = new Map();

  const dispatch = (el, name) => {
    if (!el) return;
    const event = new CustomEvent(name, { bubbles: true, cancelable: true });
    el.dispatchEvent(event);
  };

  const handleNotification = (el) => {
    const targetId = el.dataset.target;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;

    const activeClass = 'show';
    if (notificationTimers.has(target.id)) {
      clearTimeout(notificationTimers.get(target.id));
    }
    if (!target.classList.contains(activeClass)) {
      target.classList.add(activeClass);
      dispatch(target, EVENTS.show);
    }
    const timeout = parseInt(el.dataset.timeout, 10);
    if (!isNaN(timeout)) {
      const timerId = setTimeout(() => {
        dismiss(target);
        notificationTimers.delete(target.id);
      }, timeout);
      notificationTimers.set(target.id, timerId);
    }
  };

  const toggle = (el) => {
    const targetId = el.dataset.target;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;
    const activeClass = 'active';
    if (target.classList.contains(activeClass)) {
      dismiss(target);
    } else {
      target.classList.add(activeClass);
      dispatch(target, EVENTS.show);
    }
  };

  const dismiss = (target) => {
    if (!target) return;
    const isNotification = target.classList.contains('notification');
    const activeClass = isNotification ? 'show' : 'active';
    if (target.classList.contains(activeClass)) {
      target.classList.remove(activeClass);
      dispatch(target, EVENTS.hide);
    }
  };

  const activateTab = (el) => {
    const targetId = el.dataset.tab;
    const target = document.querySelector(targetId);
    if (!target) return;
    const tabGroup = el.closest('.tabs');
    if (tabGroup) {
      tabGroup.querySelectorAll(SELECTORS.tab).forEach(t => t.classList.remove('active'));
    }
    const contentParent = target.parentElement;
    if (contentParent) {
      contentParent.querySelectorAll(':scope > *').forEach(c => c.classList.remove('active'));
    }
    el.classList.add('active');
    target.classList.add('active');
    dispatch(el, EVENTS.show);
  };

  const toggleAccordion = (el) => {
    el.classList.toggle('active');
    const panel = el.nextElementSibling;
    if (panel && panel.classList.contains('panel')) {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        dispatch(el, EVENTS.hide);
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        dispatch(el, EVENTS.show);
      }
    }
  };

  const toggleCode = (el) => {
    const targetId = el.dataset.target;
    const target = document.querySelector(targetId);
    if (!target) return;

    target.classList.toggle('active');
    el.textContent = target.classList.contains('active') ? 'Hide Code' : 'Show Code';
  };

  document.addEventListener(EVENTS.click, (e) => {
    if (e.target.matches('.modal.active')) {
      dismiss(e.target);
      return;
    }

    const el = e.target.closest(SELECTORS.toggle + ', ' + SELECTORS.dismiss + ', ' + SELECTORS.tab);
    if (!el) return;

    const toggleType = el.dataset.toggle;
    if (toggleType) {
      switch (toggleType) {
        case 'notification':
          handleNotification(el);
          break;
        case 'accordion':
          toggleAccordion(el);
          break;
        case 'code':
          toggleCode(el);
          break;
        default:
          toggle(el);
          break;
      }
    }

    if (el.matches(SELECTORS.dismiss)) {
      const target = el.closest('.modal, .notification');
      dismiss(target);
    }

    if (el.matches(SELECTORS.tab)) {
      e.preventDefault();
      activateTab(el);
    }
  });

  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const activeTab = tabGroup.querySelector(SELECTORS.tab + '.active') || tabGroup.querySelector(SELECTORS.tab);
    if (activeTab) {
      activateTab(activeTab);
    }
  });
});
