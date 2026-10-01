(function () {
  'use strict';

  var D = window.KAJ;
  var MESI = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
              'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  // ── Vetrina ──
  fill('k-catalog', D.products.map(function (p) {
    return '<article class="k-product">' +
      '<div class="k-product-img"><img src="images/prodotti/' + esc(p.image) + '" alt="Portachiavi ' + esc(p.letter) + '" loading="lazy"></div>' +
      '<div class="k-product-body">' +
        '<h4 class="k-h4">Portachiavi · ' + esc(p.letter) + '</h4>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<div class="k-product-foot">' +
          '<div class="k-product-price">' + esc(p.price) + '</div>' +
          '<a href="mailto:' + D.email + '?subject=' + encodeURIComponent('Richiesta portachiavi ' + p.letter) + '" class="k-product-cta">Richiedi <i class="fa-solid fa-arrow-right"></i></a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join(''));

  // ── Configuratore: opzioni ──
  fill('k-letter-grid', D.alphabet.map(function (l) {
    return '<button class="k-letter' + (l === 'A' ? ' active' : '') + '" data-letter="' + l + '">' + l + '</button>';
  }).join(''));

  fill('k-color-row', D.colors.map(function (c) {
    return '<div class="k-color-chip' + (c.id === 'rosa' ? ' active' : '') + '" data-color-id="' + c.id + '" data-color-hex="' + c.hex + '" data-color-label="' + esc(c.label) + '">' +
      '<span class="k-color-swatch" style="background:' + c.hex + '"></span>' + esc(c.label) + '</div>';
  }).join(''));

  fill('k-deco-grid', D.decos.map(function (d) {
    return '<div class="k-deco-card' + (d.id === 'fiori' ? ' active' : '') + '" data-deco-id="' + d.id + '" data-deco-cost="' + d.cost + '" data-deco-label="' + esc(d.name) + '">' +
      '<div class="k-deco-icon"><i class="fa-solid ' + d.icon + '"></i></div>' +
      '<div class="k-deco-name">' + esc(d.name) + '</div>' +
      '<div class="k-deco-extra">' + esc(d.extra) + '</div></div>';
  }).join(''));

  fill('k-cord-row', D.cords.map(function (c) {
    return '<div class="k-cord-card' + (c.id === 'silver' ? ' active' : '') + '" data-cord-id="' + c.id + '" data-cord-cost="' + c.cost + '" data-cord-label="' + esc(c.name) + '">' +
      '<div class="k-cord-vis"><i class="fa-solid ' + c.icon + '"></i></div>' +
      '<div class="k-cord-info"><div class="k-cord-name">' + esc(c.name) + '</div><div class="k-cord-desc">' + esc(c.desc) + '</div></div>' +
      '<div class="k-cord-extra">' + esc(c.extra) + '</div></div>';
  }).join(''));

  // ── Mercatini ──
  var today = new Date(); today.setHours(0, 0, 0, 0);
  fill('k-events', D.events.map(function (e) {
    var d = new Date(e.date + 'T00:00:00');
    var upcoming = d >= today;
    return '<article class="k-event">' +
      '<div class="k-event-img">' +
        (upcoming ? '<span class="k-event-status upcoming">In arrivo</span>' : '') +
        '<img src="' + esc(e.image) + '" alt="Mercatino" loading="lazy">' +
      '</div>' +
      '<div class="k-event-body">' +
        '<h4>' + esc(e.title) + '</h4>' +
        '<p>' + esc(e.desc) + '</p>' +
        '<div class="k-event-meta">' +
          '<div class="k-event-meta-row"><i class="fa-solid fa-location-dot"></i>' + esc(e.place) + '</div>' +
          '<div class="k-event-meta-row"><i class="fa-regular fa-calendar"></i>' + d.getDate() + ' ' + MESI[d.getMonth()] + ' ' + d.getFullYear() + '</div>' +
          '<div class="k-event-meta-row"><i class="fa-regular fa-clock"></i>' + esc(e.time) + '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join(''));

  // ── Anno footer ──
  fill('k-year', String(new Date().getFullYear()));

  // ── Smooth scroll + offset nav ──
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var el = id && document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll-spy ──
  var sections = ['home', 'vetrina', 'crea', 'alice', 'eventi'];
  var links = document.querySelectorAll('#k-menu a[data-section]');
  function updateNav() {
    var y = window.scrollY + 120;
    var cur = sections[0];
    for (var i = sections.length - 1; i >= 0; i--) {
      var el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= y) { cur = sections[i]; break; }
    }
    links.forEach(function (a) {
      a.classList.toggle('active', a.dataset.section === cur);
    });
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ── Toast ──
  window.showKajToast = function (msg) {
    var toast = document.getElementById('k-toast');
    document.getElementById('k-toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3500);
  };

})();
