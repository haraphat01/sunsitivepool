(function () {
  var header = document.querySelector('.site-header');
  function onScroll() { header && header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer
  var drawer = document.getElementById('drawer');
  var opener = document.querySelector('.burger');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    opener && opener.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var first = drawer.querySelector('a,button'); first && first.focus(); }
    else { opener && opener.focus(); }
  }
  opener && opener.addEventListener('click', function () { setDrawer(true); });
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () { setDrawer(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) setDrawer(false);
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Quote form -> pre-filled email (no backend on a static site)
  var form = document.getElementById('quote-form');
  if (form) {
    var params = new URLSearchParams(location.search);
    var pre = params.get('service');
    if (pre && form.service) form.service.value = pre;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var body = [
        'Name: ' + f.name.value,
        'Phone: ' + f.phone.value,
        'Email: ' + f.email.value,
        'Service: ' + f.service.value,
        '',
        f.message.value
      ].join('\n');
      var subject = 'Service request: ' + f.service.value + ' (' + f.name.value + ')';
      location.href = 'mailto:sunsitivepools.austin@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
