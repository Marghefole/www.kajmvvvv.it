(function () {
  'use strict';

  var BASE_PRICE = 8;
  var DECO_COST  = { none: 0, fiori: 2, glitter: 1, oro: 3, perle: 2, luna: 2 };
  var CORD_COST  = { silver: 0, gold: 1, leather: 2, chain: 2 };

  // ── Stato ──────────────────────────────────────────────────────
  var state = {
    step:        0,
    letter:      'A',
    colorId:     'rosa',
    colorHex:    '#E8B4A0',
    colorLabel:  'Rosa antico',
    deco:        'fiori',
    decoLabel:   'Fiori secchi',
    cord:        'silver',
    cordLabel:   'Moschettone argento',
    channel:     'instagram',
    nome:        '',
    contatto:    '',
    note:        ''
  };

  function total() {
    return BASE_PRICE + (DECO_COST[state.deco] || 0) + (CORD_COST[state.cord] || 0);
  }

  // ── SVG keychain ───────────────────────────────────────────────
  // La forma della resina è la lettera stessa, come nelle foto reali.
  function renderKeychain(size) {
    size = size || 260;
    var h = Math.round(size * 1.45);

    var cordColor = state.cord === 'gold'    ? '#D4A574'
                  : state.cord === 'leather' ? '#8A5A3A'
                  : state.cord === 'chain'   ? '#D4A574'
                  : '#B8B8B8';

    var color  = state.colorHex;
    var letter = state.letter;
    var deco   = state.deco;
    var cord   = state.cord;
    var uid    = 'k' + Math.random().toString(36).slice(2, 7);

    // Font size scala sulla lunghezza della lettera
    var fs = letter.length > 2 ? 85 : letter.length > 1 ? 108 : 158;
    var ly = 265; // baseline della lettera

    // ── Connettore anello → lettera ──
    var connectorSvg = '';
    if (cord === 'leather') {
      connectorSvg =
        '<rect x="97" y="52" width="6" height="44" rx="3" fill="' + cordColor + '"/>' +
        '<rect x="98" y="53" width="2" height="42" rx="1" fill="#fff" opacity="0.2"/>';
    } else if (cord === 'chain') {
      connectorSvg =
        '<g stroke="' + cordColor + '" stroke-width="2.5" fill="none">' +
        '<ellipse cx="100" cy="60" rx="5" ry="3"/>' +
        '<ellipse cx="106" cy="69" rx="3" ry="5"/>' +
        '<ellipse cx="100" cy="78" rx="5" ry="3"/>' +
        '<ellipse cx="94"  cy="87" rx="3" ry="5"/>' +
        '<ellipse cx="100" cy="96" rx="5" ry="3"/>' +
        '</g>';
    } else {
      connectorSvg = '<line x1="100" y1="52" x2="100" y2="98" stroke="' + cordColor + '" stroke-width="3"/>';
    }

    // ── Decorazioni (clippate alla forma lettera) ──
    var decoSvg = '';
    if (deco === 'fiori') {
      decoSvg =
        '<g clip-path="url(#lc' + uid + ')" opacity="0.88">' +
        '<circle cx="72" cy="193" r="7" fill="#F5EFE6"/>' +
        '<circle cx="72" cy="185" r="4" fill="#C26B4A"/><circle cx="79" cy="198" r="4" fill="#C26B4A"/>' +
        '<circle cx="65" cy="198" r="4" fill="#C26B4A"/><circle cx="72" cy="201" r="4" fill="#C26B4A"/>' +
        '<circle cx="65" cy="186" r="4" fill="#C26B4A"/><circle cx="79" cy="186" r="4" fill="#C26B4A"/>' +
        '<circle cx="145" cy="236" r="6" fill="#F5EFE6"/>' +
        '<circle cx="145" cy="229" r="3.5" fill="#A4533A"/><circle cx="151" cy="241" r="3.5" fill="#A4533A"/>' +
        '<circle cx="139" cy="241" r="3.5" fill="#A4533A"/>' +
        '<path d="M100 158 q6 -14 17 -10 q-6 9 -17 10 z" fill="#6B7F5A"/>' +
        '<path d="M148 176 q6 -14 17 -10 q-6 9 -17 10 z" fill="#6B7F5A"/>' +
        '</g>';
    } else if (deco === 'glitter') {
      var dots = '';
      for (var i = 0; i < 60; i++) {
        var gx = 38 + (i * 41 + i * i * 7) % 144;
        var gy = 108 + (i * 53 + i * i * 11) % 162;
        var gr = 0.7 + (i % 4) * 0.75;
        var go = (0.3 + (i % 5) * 0.13).toFixed(2);
        dots += '<circle cx="' + gx + '" cy="' + gy + '" r="' + gr + '" opacity="' + go + '"/>';
      }
      decoSvg = '<g clip-path="url(#lc' + uid + ')" fill="#fff">' + dots + '</g>';
    } else if (deco === 'oro') {
      decoSvg =
        '<g clip-path="url(#lc' + uid + ')" fill="#D4A574" opacity=".92">' +
        '<path d="M60 156 l14 5 l-4 13 l-13 -4 z"/>' +
        '<path d="M146 181 l16 5 l-5 14 l-15 -5 z"/>' +
        '<path d="M76 241 l12 6 l-4 12 l-12 -5 z"/>' +
        '<path d="M130 226 l11 4 l-3 11 l-11 -3 z"/>' +
        '<path d="M100 254 l13 4 l-3 12 l-13 -3 z"/>' +
        '</g>';
    } else if (deco === 'perle') {
      var pp = [[66,162],[148,156],[160,214],[77,241],[133,249],[105,187],[54,209],[148,238]];
      var ps = '';
      for (var j = 0; j < pp.length; j++) {
        ps += '<circle cx="' + pp[j][0] + '" cy="' + pp[j][1] + '" r="5.5" fill="#fff" stroke="#D4A574" stroke-width=".6"/>';
      }
      decoSvg = '<g clip-path="url(#lc' + uid + ')">' + ps + '</g>';
    } else if (deco === 'luna') {
      decoSvg =
        '<g clip-path="url(#lc' + uid + ')" fill="#D4A574">' +
        '<path d="M62 152 a18 18 0 1 0 8 22 a14 14 0 1 1 -8 -22 z"/>' +
        '<path d="M148 215 l4 8 l9 1 l-6 6 l2 9 l-9 -4 l-9 4 l2 -9 l-6 -6 l9 -1 z" transform="scale(.65) translate(80 115)"/>' +
        '<circle cx="158" cy="174" r="2.5"/>' +
        '<circle cx="77" cy="238" r="2.5"/>' +
        '<circle cx="139" cy="159" r="2"/>' +
        '</g>';
    }

    return (
      '<svg width="' + size + '" height="' + h + '" viewBox="0 0 200 295" style="overflow:visible">' +
      '<defs>' +
      // Ombra portata
      '<filter id="f' + uid + '" x="-15%" y="-5%" width="135%" height="125%">' +
      '<feGaussianBlur in="SourceAlpha" stdDeviation="5"/>' +
      '<feOffset dx="4" dy="8"/>' +
      '<feComponentTransfer><feFuncA type="linear" slope="0.28"/></feComponentTransfer>' +
      '<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      // Clip path = forma lettera
      '<clipPath id="lc' + uid + '">' +
      '<text x="100" y="' + ly + '" text-anchor="middle"' +
      ' font-family="\'Playfair Display\',Georgia,serif" font-weight="700" font-size="' + fs + '">' +
      letter + '</text>' +
      '</clipPath>' +
      '</defs>' +
      // Anello
      '<circle cx="100" cy="28" r="18" fill="none" stroke="' + cordColor + '" stroke-width="4.5"/>' +
      // Connettore
      connectorSvg +
      // Corpo lettera (riempito con il colore resina)
      '<text x="100" y="' + ly + '" text-anchor="middle"' +
      ' font-family="\'Playfair Display\',Georgia,serif" font-weight="700" font-size="' + fs + '"' +
      ' fill="' + color + '" filter="url(#f' + uid + ')">' +
      letter + '</text>' +
      // Decorazioni interne (clippate)
      decoSvg +
      // Riflesso lucido
      '<g clip-path="url(#lc' + uid + ')">' +
      '<ellipse cx="80" cy="148" rx="40" ry="26" fill="#fff" opacity="0.14"/>' +
      '</g>' +
      // Contorno per profondità
      '<text x="100" y="' + ly + '" text-anchor="middle"' +
      ' font-family="\'Playfair Display\',Georgia,serif" font-weight="700" font-size="' + fs + '"' +
      ' fill="none" stroke="#fff" stroke-width="2.5" stroke-opacity="0.22">' +
      letter + '</text>' +
      '</svg>'
    );
  }

  // ── Aggiorna UI ────────────────────────────────────────────────
  function updatePreview() {
    var stage = document.getElementById('preview-stage');
    if (stage) stage.innerHTML = renderKeychain(260);
    var t = total();
    var priceEl  = document.getElementById('preview-price');
    var totalEl  = document.getElementById('config-total');
    if (priceEl) priceEl.textContent = '€' + t;
    if (totalEl) totalEl.textContent = '€' + t;
  }

  function updatePills() {
    document.querySelectorAll('.k-step-pill[data-step]').forEach(function (pill) {
      var idx = parseInt(pill.dataset.step, 10);
      pill.classList.remove('active', 'done');
      if (idx === state.step) {
        pill.classList.add('active');
      } else if (idx < state.step) {
        pill.classList.add('done');
        var numEl = pill.querySelector('.k-step-num');
        if (numEl) numEl.innerHTML = '';  // CSS ::before shows checkmark
      }
    });
  }

  function showStep(idx) {
    document.querySelectorAll('.k-step-content').forEach(function (el) { el.style.display = 'none'; });
    var el = document.querySelector('[data-step-idx="' + idx + '"]');
    if (el) { el.style.display = ''; el.classList.add('k-fade-in'); }
    var done = document.getElementById('step-done');
    if (done) done.style.display = 'none';
    var foot = document.getElementById('config-foot');
    if (foot) foot.style.display = '';
  }

  function showDone() {
    document.querySelectorAll('.k-step-content').forEach(function (el) { el.style.display = 'none'; });
    var done = document.getElementById('step-done');
    if (done) { done.style.display = 'flex'; done.classList.add('k-fade-in'); }
    var foot = document.getElementById('config-foot');
    if (foot) foot.style.display = 'none';

    document.getElementById('recap-letter').textContent    = state.letter;
    document.getElementById('recap-color').textContent     = state.colorLabel;
    document.getElementById('recap-deco').textContent      = state.decoLabel;
    document.getElementById('recap-cord').textContent      = state.cordLabel;
    document.getElementById('recap-nome').textContent      = state.nome || '—';
    document.getElementById('recap-channel-lbl').textContent = state.channel === 'instagram' ? 'Instagram' : 'Email';
    document.getElementById('recap-contatto').textContent  = state.contatto || '—';
    document.getElementById('recap-total').textContent     = '€' + total();
    var noteRow = document.getElementById('recap-note-row');
    if (state.note) {
      document.getElementById('recap-note').textContent = state.note;
      if (noteRow) noteRow.style.display = '';
    } else {
      if (noteRow) noteRow.style.display = 'none';
    }
    updatePills();
  }

  function updateNextBtn() {
    var btn = document.getElementById('btn-next');
    if (!btn) return;
    if (state.step === 4) {
      var valid = state.nome.trim().length > 0 && state.contatto.trim().length > 0;
      btn.disabled = !valid;
      btn.innerHTML = 'Riepilogo <i class="fa-solid fa-arrow-right"></i>';
    } else {
      btn.disabled = false;
      btn.innerHTML = 'Avanti <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  // ── Navigazione step ──────────────────────────────────────────
  document.getElementById('btn-next').addEventListener('click', function () {
    if (state.step < 4) {
      state.step++;
      showStep(state.step);
      document.getElementById('btn-prev').disabled = false;
      updatePills();
      updateNextBtn();
    } else {
      showDone();
    }
  });

  document.getElementById('btn-prev').addEventListener('click', function () {
    if (state.step > 0) {
      state.step--;
      showStep(state.step);
      document.getElementById('btn-prev').disabled = state.step === 0;
      updatePills();
      updateNextBtn();
    }
  });

  document.querySelectorAll('.k-step-pill[data-step]').forEach(function (pill) {
    pill.addEventListener('click', function () {
      state.step = parseInt(pill.dataset.step, 10);
      showStep(state.step);
      document.getElementById('btn-prev').disabled = state.step === 0;
      updatePills();
      updateNextBtn();
    });
  });

  // ── Selezioni ─────────────────────────────────────────────────
  document.querySelectorAll('.k-letter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.k-letter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.letter = btn.dataset.letter;
      updatePreview();
    });
  });

  document.querySelectorAll('.k-color-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.k-color-chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      state.colorId    = chip.dataset.colorId;
      state.colorHex   = chip.dataset.colorHex;
      state.colorLabel = chip.dataset.colorLabel;
      updatePreview();
    });
  });

  document.querySelectorAll('.k-deco-card').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.k-deco-card').forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      state.deco      = card.dataset.decoId;
      state.decoLabel = card.dataset.decoLabel;
      updatePreview();
    });
  });

  document.querySelectorAll('.k-cord-card').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.k-cord-card').forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      state.cord      = card.dataset.cordId;
      state.cordLabel = card.dataset.cordLabel;
      updatePreview();
    });
  });

  // ── Info step ─────────────────────────────────────────────────
  document.getElementById('info-nome').addEventListener('input', function () {
    state.nome = this.value;
    updateNextBtn();
  });
  document.getElementById('info-contatto').addEventListener('input', function () {
    state.contatto = this.value;
    updateNextBtn();
  });
  document.getElementById('info-note').addEventListener('input', function () {
    state.note = this.value;
  });

  window.selectChannel = function (ch) {
    state.channel = ch;
    document.getElementById('ch-instagram').classList.toggle('active', ch === 'instagram');
    document.getElementById('ch-email').classList.toggle('active', ch === 'email');
    var lbl   = document.getElementById('contatto-label');
    var input = document.getElementById('info-contatto');
    if (ch === 'instagram') {
      lbl.textContent   = 'Il tuo @username Instagram';
      input.placeholder = '@iltuonome';
    } else {
      lbl.textContent   = 'La tua email';
      input.placeholder = 'tuonome@email.it';
    }
  };

  // ── Riepiloga e invia ─────────────────────────────────────────
  document.getElementById('btn-restart').addEventListener('click', function () {
    state = { step:0, letter:'A', colorId:'rosa', colorHex:'#E8B4A0', colorLabel:'Rosa antico',
              deco:'fiori', decoLabel:'Fiori secchi', cord:'silver', cordLabel:'Moschettone argento',
              channel:'instagram', nome:'', contatto:'', note:'' };
    document.getElementById('info-nome').value     = '';
    document.getElementById('info-contatto').value = '';
    document.getElementById('info-note').value     = '';
    document.querySelectorAll('.k-letter').forEach(function (b) { b.classList.toggle('active', b.dataset.letter === 'A'); });
    document.querySelectorAll('.k-color-chip').forEach(function (c) { c.classList.toggle('active', c.dataset.colorId === 'rosa'); });
    document.querySelectorAll('.k-deco-card').forEach(function (d) { d.classList.toggle('active', d.dataset.decoId === 'fiori'); });
    document.querySelectorAll('.k-cord-card').forEach(function (c) { c.classList.toggle('active', c.dataset.cordId === 'silver'); });
    showStep(0);
    document.getElementById('btn-prev').disabled = true;
    updatePills();
    updateNextBtn();
    updatePreview();
  });

  document.getElementById('btn-send').addEventListener('click', function () {
    var t = total();
    document.getElementById('modal-recap').innerHTML =
      '<div class="k-config-recap-row"><span>Lettera</span><strong>' + state.letter + '</strong></div>' +
      '<div class="k-config-recap-row"><span>Colore</span><strong>' + state.colorLabel + '</strong></div>' +
      '<div class="k-config-recap-row"><span>Decorazione</span><strong>' + state.decoLabel + '</strong></div>' +
      '<div class="k-config-recap-row"><span>Cordino</span><strong>' + state.cordLabel + '</strong></div>' +
      '<div class="k-config-recap-row" style="padding-top:10px;border-top:1px solid var(--k-line)"><span>Per</span><strong>' + (state.nome || '—') + '</strong></div>' +
      '<div class="k-config-recap-row"><span>' + (state.channel === 'instagram' ? 'Instagram' : 'Email') + '</span><strong>' + (state.contatto || '—') + '</strong></div>' +
      '<div class="k-config-recap-row total"><span>Totale</span><strong>€' + t + '</strong></div>';
    var subj = 'Ordine portachiavi ' + state.letter + ' — ' + (state.nome || '');
    var body = 'Ciao Alice,\n\nSono ' + (state.nome || '') + '.\nMi puoi ricontattare su ' +
      (state.channel === 'instagram' ? 'Instagram: ' : 'email: ') + (state.contatto || '') +
      '.\n\nVorrei ordinare:\n- Lettera: ' + state.letter +
      '\n- Colore: '       + state.colorLabel +
      '\n- Decorazione: '  + state.decoLabel +
      '\n- Cordino: '      + state.cordLabel +
      '\n- Totale: €'      + t +
      (state.note ? '\n\nNote: ' + state.note : '') + '\n\nGrazie!';
    document.getElementById('modal-email').href =
      'mailto:rizzoalice.ar@gmail.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
    document.getElementById('send-modal').classList.add('show');
  });

  document.getElementById('modal-close').addEventListener('click', function () {
    document.getElementById('send-modal').classList.remove('show');
  });
  document.getElementById('send-modal').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('show');
  });

  // ── Init ──────────────────────────────────────────────────────
  updatePreview();
  updatePills();
  updateNextBtn();

})();
