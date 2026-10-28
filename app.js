/* OWN STUDIO · cotizador. Sin dependencias. Todo corre en el navegador del cliente. */
(function () {
  'use strict';
  var C = window.OWN_CONFIG;
  var RATE = C.rate;
  var STAR_D = 'M12 0C12.8 7.5 16.5 11.2 24 12 16.5 12.8 12.8 16.5 12 24 11.2 16.5 7.5 12.8 0 12 7.5 11.2 11.2 7.5 12 0Z';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('es-MX'); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var starSVG = function () { return '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="' + STAR_D + '"/></svg>'; };

  /* ---------- iconos dibujados a mano (trazos ligeramente chuecos a propósito) ---------- */
  var ICONS = {
    post: '<path d="M5 6.5 L27 5.8 L26.6 25.9 L5.4 26.4Z"/><circle cx="12" cy="13" r="2.4"/><path d="M6 23 L13 17.5 L18 21 L22 16 L26.5 21"/>',
    historia: '<path d="M10 3.5 L22 3.8 L22.4 28.4 L9.8 28.1Z"/><path d="M14 24.5 H18"/><circle cx="16" cy="13" r="3.2"/>',
    carrusel: '<path d="M9 8 L24 7.6 L24.4 24 L8.6 24.4Z"/><path d="M5 11 V21 M28 11 V21"/>',
    video: '<path d="M4.5 8 L27.4 7.6 L27 24.3 L4.8 24.6Z"/><path d="M13.5 12 L21 16 L13.6 20.4Z"/>',
    copy: '<path d="M5 8 H27 M5 14.5 H23 M5 21 H27 M5 27 H16"/>',
    plan: '<path d="M5 7.5 L27 7 L27.4 27 L5.2 27.5Z"/><path d="M5 13 H27.2 M11 4 V9 M21 4 V9"/><path d="M10 18 H12 M15 18 H17 M20 18 H22 M10 22.5 H12 M15 22.5 H17"/>',
    auditoria: '<circle cx="14" cy="14" r="8.2"/><path d="M20 20.2 L27.5 27.6"/><path d="M10.5 14 H17.5"/>',
    logo: '<path d="M16 3C17 11.5 20.5 15 29 16 20.5 17 17 20.5 16 29 15 20.5 11.5 17 3 16 11.5 15 15 11.5 16 3Z"/>',
    identidad: '<circle cx="11" cy="12" r="6.2"/><circle cx="21.5" cy="12.5" r="6.2"/><circle cx="16" cy="21.5" r="6.2"/>',
    manual: '<path d="M5 6 L15.4 7.6 L15.6 26.6 L5.2 25Z"/><path d="M27 6 L16.6 7.6 L16.4 26.6 L26.8 25Z"/>',
    concepto: '<path d="M16 3.5 C10 3.5 7.5 8.4 9.5 12.6 C10.8 15 12 16 12 19 H20 C20 16 21.2 15 22.5 12.6 C24.5 8.4 22 3.5 16 3.5Z"/><path d="M12.5 23 H19.6 M13.8 27 H18.4"/>',
    estrategia: '<path d="M7 28 V4"/><path d="M7 5 L25 7.5 L18.5 12 L25 17 L7 17.5"/>',
    competencia: '<path d="M4 11 H25 M20 6 L26 11 L20 16"/><path d="M28 21 H7 M12 16 L6 21 L12 26"/>',
    voz: '<path d="M4.6 6 L27.4 5.6 L27 20.5 L15 20.8 L9 27 L9.3 21 L4.8 21Z"/><path d="M10 11.5 H22 M10 15.8 H18"/>',
    lanzamiento: '<path d="M16 3 C21 8 21.6 14 20.2 21 H11.8 C10.4 14 11 8 16 3Z"/><circle cx="16" cy="12" r="2.2"/><path d="M11.8 21 L7.5 25 L12 24.5 M20.2 21 L24.5 25 L20 24.5 M16 24 V29"/>',
    pantalla: '<path d="M9.5 3.5 L22.5 3.8 L22.2 28.3 L9.8 28.5Z"/><path d="M14 24.8 H18"/>',
    prototipo: '<path d="M8 5 L24 15.6 L16 17.4 L12.4 25Z"/><path d="M16.5 18 L22 25"/>',
    uikit: '<path d="M5 5.5 H13.5 V13.8 H5Z M18.4 5.6 H27 V13.6 H18.4Z M5 18.5 H13.4 V27 H5Z"/><circle cx="22.8" cy="22.8" r="4.4"/>',
    landing: '<path d="M4.5 6 L27.5 5.6 L27.2 26.4 L4.8 26.8Z"/><path d="M4.7 11.8 H27.4"/><path d="M9 16.5 H19 M9 20.5 H15"/>',
    web: '<path d="M4.5 6 L27.5 5.6 L27.2 26.4 L4.8 26.8Z"/><path d="M4.7 11.8 H27.4 M12 11.8 V26.6"/><path d="M16 16 H23 M16 20.5 H21"/>',
    ajustes: '<path d="M4 9 H28 M4 16 H28 M4 23 H28"/><circle cx="11" cy="9" r="2.8"/><circle cx="21" cy="16" r="2.8"/><circle cx="13" cy="23" r="2.8"/>',
    flyer: '<path d="M7.5 3.8 L24.5 3.5 L24.6 28.3 L7.4 28.5Z"/><path d="M11.5 10 H20.5 M11.5 15 H20.5 M11.5 20 H16.5"/>',
    banner: '<path d="M3.5 10 L28.4 9.4 L28.2 22.4 L3.7 22.8Z"/><path d="M8 16 H24"/>',
    tarjeta: '<path d="M3.8 8.5 L28 8 L28.2 23.6 L3.7 24Z"/><path d="M8 14 H16 M8 18.5 H13"/><circle cx="22.5" cy="15.5" r="2.4"/>',
    portada: '<path d="M4.5 6 L27.5 5.6 L27.2 26.4 L4.8 26.8Z"/><circle cx="16" cy="14.5" r="5"/><path d="M9 23 H23"/>',
    lona: '<path d="M3.5 8 L28.5 7.6 L28.2 24 L3.8 24.4Z"/><path d="M6.5 10.5 H6.6 M25.4 10.5 H25.5 M6.5 21.5 H6.6 M25.4 21.5 H25.5" stroke-width="3"/><path d="M11 16 H21"/>',
    menu: '<path d="M8 4 L24 3.6 L24.4 28.2 L8.2 28.5Z"/><path d="M12 9.5 H20 M12 14.5 H20 M12 19.5 H17.5"/>',
    invitacion: '<path d="M3.8 8 L28.2 7.6 L28 24.4 L4 24.8Z"/><path d="M4.5 9 L16 17.5 L27.6 8.8"/>',
    presentacion: '<path d="M4.5 5.5 L27.5 5.2 L27.3 20.8 L4.7 21Z"/><path d="M16 21 V27.5 M10 28 H22"/><path d="M9 15.5 L13.5 11.5 L17.5 14.5 L23 9.5"/>',
    etiqueta: '<path d="M3.8 5.5 L16.2 4.8 L28 17 L17 28 L4.6 16Z"/><circle cx="10" cy="10.6" r="2"/>'
  };
  var icon = function (k) {
    return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[k] || ICONS.logo) + '</svg>';
  };

  /* ---------- datos ---------- */
  var ITEMS = {};
  C.categories.forEach(function (cat) { cat.items.forEach(function (it) { ITEMS[it.id] = { it: it, cat: cat }; }); });
  var PKG = {};
  C.packages.forEach(function (p) { PKG[p.id] = p; });

  var state = { tab: 'paquetes', qty: {}, variant: {}, pkg: { mensual: null, proyecto: null, combo: null }, folio: '' };

  var d0 = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  state.folio = 'OWN-' + String(d0.getFullYear()).slice(2) + pad(d0.getMonth() + 1) + pad(d0.getDate()) + '-' + (100 + Math.floor(Math.random() * 900));

  function vOf(it, forced) {
    if (!it.variants) return null;
    var k = forced || state.variant[it.id] || it.variants[0].key;
    for (var i = 0; i < it.variants.length; i++) if (it.variants[i].key === k) return it.variants[i];
    return it.variants[0];
  }
  function unitPts(it, forced) { var v = vOf(it, forced); return v ? v.pts : (it.pts || 0); }
  function unitPrice(it, forced) { return it.price != null ? it.price : unitPts(it, forced) * RATE; }

  function pkgBreakdown(p) {
    var r = { proy: 0, mens: 0, pts: 0, bonus: 0, bonusNames: [] };
    p.items.forEach(function (x) {
      var e = ITEMS[x.id], pr = unitPrice(e.it, x.variant) * x.qty;
      r.pts += unitPts(e.it, x.variant) * x.qty;
      if (e.cat.monthly) r.mens += pr; else r.proy += pr;
    });
    (p.bonus || []).forEach(function (x) {
      var e = ITEMS[x.id];
      r.bonus += unitPrice(e.it) * x.qty;
      r.bonusNames.push(e.it.name);
    });
    return r;
  }

  function tierFor(pts) {
    var t = C.tiers.slice().sort(function (a, b) { return b.min - a.min; });
    for (var i = 0; i < t.length; i++) if (pts >= t[i].min) return t[i];
    return null;
  }
  function nextTier(pts) {
    var t = C.tiers.slice().sort(function (a, b) { return a.min - b.min; });
    for (var i = 0; i < t.length; i++) if (pts < t[i].min) return t[i];
    return null;
  }

  function calc() {
    var r = { proyLines: [], mensLines: [], quote: [], proy: 0, mens: 0, disc: 0, pct: 0, customPts: 0, customOne: 0, direct: 0, start: 0, any: false };
    ['mensual', 'proyecto', 'combo'].forEach(function (slot) {
      var id = state.pkg[slot]; if (!id) return;
      var p = PKG[id], bd = pkgBreakdown(p);
      var inc = p.includes.join(' · ');
      var bonus = bd.bonusNames.length ? 'Incluido sin costo: ' + bd.bonusNames.join(' y ') + ' (valor ' + fmt(bd.bonus) + ')' : '';
      if (bd.proy > 0) { r.proyLines.push({ label: p.name + (slot === 'combo' ? ' · arranque' : ''), sub: slot === 'combo' ? 'Identidad visual básica y landing page' : inc, bonus: bonus, amt: bd.proy }); r.proy += bd.proy; }
      if (bd.mens > 0) { r.mensLines.push({ label: p.name + (slot === 'combo' ? ' · redes' : ''), sub: slot === 'combo' ? 'Redes Medio cada mes' : inc, bonus: slot === 'combo' ? '' : bonus, amt: bd.mens }); r.mens += bd.mens; }
    });
    C.categories.forEach(function (cat) {
      cat.items.forEach(function (it) {
        var q = state.qty[it.id] || 0; if (!q) return;
        if (it.quote) { r.quote.push(it.name); return; }
        var v = vOf(it), up = unitPrice(it), tot = up * q, pts = unitPts(it) * q;
        var line = { label: it.name + (q > 1 ? ' ×' + q : ''), sub: (v ? v.label + ' · ' : '') + (it.price != null ? fmt(up) + ' c/u' : pts + ' pts'), amt: tot };
        if (cat.monthly) { r.mensLines.push(line); r.mens += tot; }
        else if (it.price != null) { r.proyLines.push(line); r.direct += tot; }
        else { r.proyLines.push(line); r.customOne += tot; r.customPts += pts; }
      });
    });
    var t = tierFor(r.customPts);
    if (t) { r.pct = t.pct; r.disc = r.customOne * t.pct / 100; }
    r.proy += r.customOne - r.disc + r.direct;
    r.start = r.proy * C.advancePct / 100 + r.mens;
    r.any = r.proyLines.length + r.mensLines.length + r.quote.length > 0;
    return r;
  }

  /* ---------- UI: tabs y paneles ---------- */
  var tabsEl = $('#tabs'), panel = $('#panel');
  var TABS = [{ id: 'paquetes', tab: 'Paquetes' }].concat(C.categories.map(function (c) { return { id: c.id, tab: c.tab }; }));

  function renderTabs() {
    tabsEl.innerHTML = TABS.map(function (t) {
      return '<button class="tab" role="tab" id="tab-' + t.id + '" data-tab="' + t.id + '" aria-selected="' + (state.tab === t.id) + '" aria-controls="panel">' + esc(t.tab) + '<span class="dot num" data-dot="' + t.id + '" hidden></span></button>';
    }).join('');
  }

  function pkgCard(p) {
    var bd = pkgBreakdown(p);
    var pill = p.slot === 'mensual' ? 'ink' : (p.slot === 'combo' ? 'inkSun' : 'line');
    var price;
    if (p.slot === 'combo') price = fmt(bd.proy) + '<small> + ' + fmt(bd.mens) + '/mes</small>';
    else if (bd.mens > 0 && bd.proy === 0) price = fmt(bd.mens) + '<small>/mes</small>';
    else price = fmt(bd.proy);
    var inc = '<ul>' + p.includes.map(function (s) { return '<li>' + starSVG() + '<span>' + esc(s) + '</span></li>'; }).join('') + '</ul>';
    var bonus = (p.bonus && bd.bonusNames.length) ? '<div class="pkg__bonus"><b>de regalo</b><br>' + esc(bd.bonusNames.join(' y ')) + ' (valor ' + fmt(bd.bonus) + ')</div>' : '';
    var note = p.note ? '<p class="pkg__note">' + esc(p.note) + '</p>' : '';
    var btn = '<button class="pkg__btn" type="button" data-act="pkg" data-id="' + p.id + '" aria-pressed="false">Elegir</button>';
    var head = '<span class="pill pill--' + pill + '">' + esc(p.tag) + '</span><h3 class="pkg__name">' + esc(p.name) + '</h3><p class="pkg__blurb">' + esc(p.blurb) + '</p><p class="pkg__price num">' + price + '</p><p class="pkg__pts num">' + bd.pts + ' puntos' + (bd.mens > 0 ? ' · mínimo ' + C.minMonths + ' meses' : '') + '</p>';
    if (p.slot === 'combo') {
      return '<article class="pkg pkg--wide" data-pkg="' + p.id + '"><div class="col">' + head + '</div><div class="col">' + inc + bonus + note + btn + '</div></article>';
    }
    return '<article class="pkg" data-pkg="' + p.id + '">' + head + inc + bonus + note + btn + '</article>';
  }

  function renderPaquetes() {
    var groups = [
      { slot: 'mensual', title: 'Redes cada mes' },
      { slot: 'proyecto', title: 'Proyectos' },
      { slot: 'combo', title: 'Todo en uno' }
    ];
    var html = '<div class="section-head"><h2>Paquetes</h2><span class="hand">listos para elegir</span></div><p class="blurb">Elige uno por grupo, o ve a las otras pestañas para armar lo tuyo servicio por servicio. Los paquetes ya traen su precio final.</p>';
    groups.forEach(function (g) {
      var list = C.packages.filter(function (p) { return p.slot === g.slot; });
      if (!list.length) return;
      html += '<div class="pkg-group"><h3>' + starSVG() + g.title + '</h3><div class="pkgs">' + list.map(pkgCard).join('') + '</div></div>';
    });
    panel.innerHTML = html;
  }

  function rowHTML(it, cat) {
    var ctl;
    if (it.quote || it.max === 1) {
      ctl = '<button class="toggle" type="button" data-act="tog" data-id="' + it.id + '" aria-pressed="false">' + (it.quote ? 'Cotizar' : 'Agregar') + '</button>';
    } else {
      ctl = '<div class="stepper" role="group" aria-label="Cantidad de ' + esc(it.name) + '"><button type="button" data-act="dec" data-id="' + it.id + '" aria-label="Quitar uno">−</button><output class="num" data-q="' + it.id + '" aria-live="polite">0</output><button type="button" data-act="inc" data-id="' + it.id + '" aria-label="Agregar uno">+</button></div>';
    }
    var vars = '';
    if (it.variants) {
      vars = '<div class="variants" role="group" aria-label="Opción de ' + esc(it.name) + '">' + it.variants.map(function (v) {
        return '<button type="button" data-act="var" data-id="' + it.id + '" data-key="' + v.key + '" aria-pressed="false">' + esc(v.label) + '</button>';
      }).join('') + '</div>';
    }
    return '<li class="row" data-row="' + it.id + '"><div class="row__icon">' + icon(it.icon) + '</div>' +
      '<div class="row__txt"><div class="row__name">' + esc(it.name) + '</div><div class="row__desc">' + esc(it.desc) + '</div>' + vars +
      '<div class="row__meta"><span class="price-tag num" data-price="' + it.id + '"></span>' + (it.days ? '<span class="row__days">Entrega: ' + esc(it.days) + '</span>' : '') + '</div></div>' +
      '<div class="row__ctl">' + ctl + '</div></li>';
  }

  function renderCategory(cat) {
    var html = '<div class="section-head"><h2>' + esc(cat.name) + '</h2>' + (cat.monthly ? '<span class="hand">cada mes</span>' : '') + '</div><p class="blurb">' + esc(cat.blurb) + '</p>';
    html += '<ul class="rows">' + cat.items.map(function (it) { return rowHTML(it, cat); }).join('') + '</ul>';
    if (!cat.monthly && cat.id !== 'alacarta') html += '<div class="tier-hint" id="tierHint"></div>';
    if (cat.monthly) html += '<div class="tier-hint">' + starSVG() + '<span>Planes mensuales: mínimo ' + C.minMonths + ' meses y el primer mes se paga por adelantado.</span></div>';
    panel.innerHTML = html;
  }

  function renderPanel() {
    if (state.tab === 'paquetes') renderPaquetes();
    else renderCategory(C.categories.filter(function (c) { return c.id === state.tab; })[0]);
    updateAll();
  }

  /* ---------- actualizar en sitio ---------- */
  function updateRows() {
    $$('.row', panel).forEach(function (row) {
      var id = row.getAttribute('data-row'), e = ITEMS[id], it = e.it, q = state.qty[id] || 0;
      row.classList.toggle('is-on', q > 0);
      var out = $('[data-q]', row); if (out) out.textContent = q;
      var dec = $('[data-act="dec"]', row), inc = $('[data-act="inc"]', row);
      if (dec) dec.disabled = q <= 0;
      if (inc) inc.disabled = q >= (it.max || 99);
      var tog = $('[data-act="tog"]', row); if (tog) tog.setAttribute('aria-pressed', q > 0 ? 'true' : 'false');
      if (it.variants) { var cur = vOf(it).key; $$('[data-act="var"]', row).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-key') === cur ? 'true' : 'false'); }); }
      var pt = $('[data-price]', row), txt;
      if (it.quote) txt = 'Por cotizar';
      else if (it.price != null) txt = fmt(it.price) + (it.max > 1 ? ' c/u' : '');
      else txt = fmt(unitPrice(it)) + (it.max > 1 ? ' c/u' : '') + ' · ' + unitPts(it) + (unitPts(it) === 1 ? ' pt' : ' pts');
      if (e.cat.monthly) txt += ' al mes';
      pt.textContent = txt;
    });
  }
  function updatePkgs() {
    $$('.pkg', panel).forEach(function (card) {
      var id = card.getAttribute('data-pkg'), on = state.pkg[PKG[id].slot] === id;
      card.classList.toggle('is-on', on);
      var b = $('.pkg__btn', card); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.textContent = on ? 'Elegido' : 'Elegir';
    });
  }
  function updateDots() {
    TABS.forEach(function (t) {
      var n = 0;
      if (t.id === 'paquetes') n = ['mensual', 'proyecto', 'combo'].filter(function (s) { return state.pkg[s]; }).length;
      else C.categories.filter(function (c) { return c.id === t.id; })[0].items.forEach(function (it) { if (state.qty[it.id]) n++; });
      var el = $('[data-dot="' + t.id + '"]', tabsEl); el.textContent = n; el.hidden = n === 0;
    });
  }
  function updateTier(r) {
    var el = $('#tierHint'); if (!el) return;
    var tiers = C.tiers.slice().sort(function (a, b) { return a.min - b.min; }).map(function (t) { return t.min + '+ pts = ' + t.pct + '%'; }).join(' · ');
    var nt = nextTier(r.customPts), msg;
    if (r.customPts === 0) msg = 'Descuento por volumen en proyectos a tu medida: ' + tiers + '.';
    else if (nt) msg = 'Llevas ' + r.customPts + ' pts' + (r.pct ? ' (' + r.pct + '% de descuento)' : '') + '. Con ' + (nt.min - r.customPts) + ' más llegas al ' + nt.pct + '%.';
    else msg = 'Llevas ' + r.customPts + ' pts: ya tienes el descuento máximo de ' + r.pct + '%.';
    el.innerHTML = starSVG() + '<span>' + esc(msg) + '</span>';
  }

  /* ---------- recibo ---------- */
  function lineHTML(l, per) {
    return '<div class="rl"><b>' + esc(l.label) + '</b><span class="amt num">' + fmt(l.amt) + (per || '') + '</span>' +
      (l.sub ? '<small>' + esc(l.sub) + '</small>' : '') + (l.bonus ? '<small>' + esc(l.bonus) + '</small>' : '') + '</div>';
  }
  function renderReceipt(r) {
    var L = $('#rcLines'), T = $('#rcTotals');
    if (!r.any) {
      L.innerHTML = '<div class="empty">Aún no agregas nada.<span class="hand">elige un paquete o suma con +</span></div>';
      T.innerHTML = '';
    } else {
      var h = '';
      if (r.proyLines.length) {
        h += '<div class="rl rl--head">Proyecto</div>' + r.proyLines.map(function (l) { return lineHTML(l); }).join('');
        if (r.disc > 0) h += '<div class="rl rl--disc"><b>Descuento por volumen (' + r.pct + '%)</b><span class="amt num">−' + fmt(r.disc) + '</span></div>';
      }
      if (r.mensLines.length) h += '<div class="rl rl--head">Mensual</div>' + r.mensLines.map(function (l) { return lineHTML(l, '/mes'); }).join('');
      if (r.quote.length) h += '<div class="rl rl--head">Por cotizar</div><div class="rl rl--quote"><b>' + esc(r.quote.join(', ')) + '</b><span class="amt">Te respondemos el precio</span></div>';
      L.innerHTML = h;
      var t = '';
      if (r.proyLines.length) t += '<div class="tot tot--main"><span>Proyecto</span><b class="num">' + fmt(r.proy) + '</b></div>';
      if (r.mensLines.length) t += '<div class="tot tot--main"><span>Cada mes</span><b class="num">' + fmt(r.mens) + '</b></div>';
      if (r.proyLines.length || r.mensLines.length) {
        var how = (r.proyLines.length ? C.advancePct + '% del proyecto' : '') + (r.proyLines.length && r.mensLines.length ? ' + ' : '') + (r.mensLines.length ? 'primer mes' : '');
        t += '<div class="tot tot--start"><span>Para arrancar<br><small>' + how + '</small></span><b class="num">' + fmt(r.start) + '</b></div>';
      }
      T.innerHTML = t;
    }
    $('#barTotal').textContent = fmt(r.start);
    $('#dl').setAttribute('aria-disabled', r.any && (r.proyLines.length || r.mensLines.length) ? 'false' : 'true');
    $('#wa').href = 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(buildText(r));
  }

  function clientBits() {
    var n = ($('#fName').value || '').trim(), b = ($('#fBiz').value || '').trim();
    return { n: n, b: b };
  }
  function buildText(r) {
    var cb = clientBits(), o = [];
    if (!r.any) return 'Hola Own, quiero cotizar un proyecto. ¿Me ayudan?';
    o.push('Hola Own, quiero esta cotización (' + state.folio + '):');
    if (cb.n) o.push('Nombre: ' + cb.n);
    if (cb.b) o.push('Negocio: ' + cb.b);
    if (r.proyLines.length) {
      o.push('', 'PROYECTO');
      r.proyLines.forEach(function (l) { o.push('- ' + l.label + ': ' + fmt(l.amt)); });
      if (r.disc > 0) o.push('- Descuento por volumen (' + r.pct + '%): -' + fmt(r.disc));
      o.push('Total proyecto: ' + fmt(r.proy));
    }
    if (r.mensLines.length) {
      o.push('', 'MENSUAL');
      r.mensLines.forEach(function (l) { o.push('- ' + l.label + ': ' + fmt(l.amt) + '/mes'); });
      o.push('Total mensual: ' + fmt(r.mens) + '/mes');
    }
    if (r.proyLines.length || r.mensLines.length) o.push('', 'Para arrancar: ' + fmt(r.start));
    if (r.quote.length) o.push('', 'Quiero cotizar también: ' + r.quote.join(', '));
    return o.join('\n');
  }

  function updateAll() {
    var r = calc();
    if ($('.row', panel)) updateRows();
    if ($('.pkg', panel)) updatePkgs();
    updateDots(); updateTier(r); renderReceipt(r);
    return r;
  }

  /* ---------- eventos ---------- */
  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tab]'); if (!b) return;
    state.tab = b.getAttribute('data-tab');
    $$('.tab', tabsEl).forEach(function (t) { t.setAttribute('aria-selected', t === b ? 'true' : 'false'); });
    renderPanel();
  });
  panel.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
    var act = b.getAttribute('data-act'), id = b.getAttribute('data-id');
    if (act === 'inc' || act === 'dec') {
      var it = ITEMS[id].it, q = (state.qty[id] || 0) + (act === 'inc' ? 1 : -1);
      state.qty[id] = Math.max(0, Math.min(it.max || 99, q));
    } else if (act === 'tog') {
      state.qty[id] = state.qty[id] ? 0 : 1;
    } else if (act === 'var') {
      state.variant[id] = b.getAttribute('data-key');
    } else if (act === 'pkg') {
      var slot = PKG[id].slot, on = state.pkg[slot] === id;
      if (slot === 'combo') { state.pkg.mensual = null; state.pkg.proyecto = null; }
      else state.pkg.combo = null;
      state.pkg[slot] = on ? null : id;
    }
    updateAll();
  });

  /* ---------- recibo: estructura fija (los campos no se re-renderizan) ---------- */
  var receipt = $('#receipt');
  receipt.innerHTML =
    '<div class="receipt__head"><span class="hand">Tu cotización</span><span class="receipt__folio num">' + new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) + '<br>' + state.folio + '</span></div>' +
    '<div class="receipt__scroll" id="rcLines"></div><div class="totals" id="rcTotals"></div>' +
    '<div class="fields"><label class="sr" for="fName">Tu nombre</label><input id="fName" type="text" placeholder="Tu nombre (opcional)" autocomplete="name"><label class="sr" for="fBiz">Tu negocio</label><input id="fBiz" type="text" placeholder="Tu negocio o proyecto (opcional)" autocomplete="organization"></div>' +
    '<div class="actions"><button class="btn btn--ink" id="dl" type="button" aria-disabled="true">Descargar cotización</button>' +
    '<a class="btn btn--line" id="wa" href="#" target="_blank" rel="noopener">Enviar por WhatsApp</a>' +
    '<button class="btn btn--line" id="cp" type="button">Copiar texto</button>' +
    '<button class="btn btn--line" id="rs" type="button">Empezar de nuevo</button></div>' +
    '<div class="toast" id="toast" role="status"></div>' +
    '<p class="receipt__note">Es un estimado válido por ' + C.validDays + ' días, no un contrato. Tus datos no salen de tu navegador hasta que los mandas tú.</p>';

  var toastT;
  function toast(msg) { var t = $('#toast'); t.textContent = msg; clearTimeout(toastT); toastT = setTimeout(function () { t.textContent = ''; }, 3200); }
  ['#fName', '#fBiz'].forEach(function (s) { $(s).addEventListener('input', function () { $('#wa').href = 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(buildText(calc())); }); });

  $('#cp').addEventListener('click', function () {
    var txt = buildText(calc());
    var fallback = function () {
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Texto copiado.'); } catch (e) { toast('No se pudo copiar. Selecciona el texto a mano.'); }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast('Texto copiado.'); }, fallback); else fallback();
  });
  $('#rs').addEventListener('click', function () {
    state.qty = {}; state.variant = {}; state.pkg = { mensual: null, proyecto: null, combo: null }; updateAll(); toast('Listo, empezamos de cero.');
  });
  $('#wa').addEventListener('click', function () { toast('Se abre WhatsApp con tu cotización lista para enviar.'); });

  /* ---------- PNG de la cotización ---------- */
  function wrapText(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function drawQuote(ctx, W, r, draw) {
    var P = 72, y = 0, ink = '#1F1A17', paper = '#F6EFE3', sun = '#F2C14E';
    var F = 'Satoshi, system-ui, -apple-system, "Segoe UI", sans-serif', H = 'Caveat, "Bradley Hand", cursive';
    var star = new Path2D(STAR_D);
    var drawStar = function (x, yy, s, c) { if (!draw) return; ctx.save(); ctx.translate(x, yy); ctx.scale(s / 24, s / 24); ctx.fillStyle = c; ctx.fill(star); ctx.restore(); };
    var rect = function (x, yy, w, h, c) { if (draw) { ctx.fillStyle = c; ctx.fillRect(x, yy, w, h); } };
    var text = function (s, x, yy, font, c, align) { if (!draw) return; ctx.font = font; ctx.fillStyle = c; ctx.textAlign = align || 'left'; ctx.fillText(s, x, yy); };
    var dash = function (yy) { if (!draw) return; ctx.save(); ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(P, yy); ctx.lineTo(W - P, yy); ctx.stroke(); ctx.restore(); };

    rect(0, 0, W, 250, ink);
    text('OWN', P, 150, '900 92px ' + F, paper);
    drawStar(P + 214, 74, 64, sun);
    text('COTIZACIÓN', W - P, 108, '900 26px ' + F, sun, 'right');
    var valid = new Date(Date.now() + C.validDays * 86400000);
    var fd = function (d) { return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }); };
    text(state.folio, W - P, 150, '500 24px ' + F, paper, 'right');
    text(fd(new Date()), W - P, 186, '500 24px ' + F, paper, 'right');
    y = 250 + 64;

    var cb = clientBits();
    if (cb.n || cb.b) {
      text('PARA', P, y, '900 18px ' + F, ink); y += 34;
      if (cb.n) { text(cb.n, P, y, '900 34px ' + F, ink); y += 42; }
      if (cb.b) { text(cb.b, P, y, '500 26px ' + F, ink); y += 36; }
      y += 16;
    }
    var amtFont = '900 30px ' + F;
    var section = function (title, lines, per, disc) {
      text(title.toUpperCase(), P, y, '900 20px ' + F, ink);
      if (draw) { ctx.fillStyle = ink; ctx.fillRect(P, y + 14, W - 2 * P, 3); }
      y += 52;
      lines.forEach(function (l) {
        var amt = fmt(l.amt) + per, aw = 0;
        if (draw) { ctx.font = amtFont; aw = ctx.measureText(amt).width; } else { ctx.font = amtFont; aw = ctx.measureText(amt).width; }
        ctx.font = '900 30px ' + F;
        var nameLines = wrapText(ctx, l.label, W - 2 * P - aw - 24);
        nameLines.forEach(function (n, i) { text(n, P, y + i * 38, '900 30px ' + F, ink); });
        text(amt, W - P, y, amtFont, ink, 'right');
        y += nameLines.length * 38;
        [l.sub, l.bonus].forEach(function (s) {
          if (!s) return;
          ctx.font = '500 22px ' + F;
          wrapText(ctx, s, W - 2 * P).forEach(function (ln) { text(ln, P, y, '500 22px ' + F, ink); y += 30; });
        });
        y += 14; dash(y); y += 36;
      });
      if (disc > 0) {
        var s = 'Descuento por volumen (' + r.pct + '%)';
        text(s, P, y, '900 26px ' + F, ink);
        text('−' + fmt(disc), W - P, y, '900 26px ' + F, ink, 'right');
        y += 14; dash(y); y += 36;
      }
      y += 8;
    };
    if (r.proyLines.length) section('Proyecto', r.proyLines, '', r.disc);
    if (r.mensLines.length) section('Mensual', r.mensLines, '/mes', 0);
    if (r.quote.length) {
      text('POR COTIZAR', P, y, '900 20px ' + F, ink);
      if (draw) { ctx.fillStyle = ink; ctx.fillRect(P, y + 14, W - 2 * P, 3); }
      y += 52;
      ctx.font = '700 26px ' + F;
      wrapText(ctx, r.quote.join(', ') + '. Te respondemos el precio.', W - 2 * P).forEach(function (ln) { text(ln, P, y, '700 26px ' + F, ink); y += 36; });
      y += 24;
    }

    /* totales sobre amarillo */
    var rows = [];
    if (r.proyLines.length) rows.push(['Total proyecto', fmt(r.proy)]);
    if (r.mensLines.length) rows.push(['Total mensual', fmt(r.mens) + '/mes']);
    var boxH = 40 + rows.length * 56 + 96;
    rect(P, y, W - 2 * P, boxH, sun);
    var by = y + 56;
    rows.forEach(function (rw) { text(rw[0], P + 32, by, '700 28px ' + F, ink); text(rw[1], W - P - 32, by, '900 40px ' + F, ink, 'right'); by += 56; });
    rect(P + 32, by - 20, W - 2 * P - 64, 3, ink);
    text('PARA ARRANCAR', P + 32, by + 40, '900 22px ' + F, ink);
    text(fmt(r.start), W - P - 32, by + 44, '900 56px ' + F, ink, 'right');
    y += boxH + 64;

    /* términos */
    text('Antes de arrancar', P, y, '700 54px ' + H, ink); y += 50;
    C.terms.forEach(function (t) {
      ctx.font = '500 22px ' + F;
      var ls = wrapText(ctx, t, W - 2 * P - 36);
      drawStar(P, y - 18, 18, ink);
      ls.forEach(function (ln, i) { text(ln, P + 36, y + i * 30, '500 22px ' + F, ink); });
      y += ls.length * 30 + 10;
    });
    y += 40;

    /* pie */
    rect(0, y, W, 150, ink);
    text('You own it. We build it.', P, y + 70, '900 36px ' + F, sun);
    text(C.handle + ' · Estudio creativo. México.', P, y + 112, '500 22px ' + F, paper);
    text('WhatsApp +' + C.whatsapp.replace(/^52/, '52 ').replace(/(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3'), W - P, y + 112, '500 22px ' + F, paper, 'right');
    y += 150;
    return y;
  }
  function download() {
    var r = calc();
    if (!(r.proyLines.length || r.mensLines.length)) { toast('Agrega algo primero para descargar.'); return; }
    var go = function () {
      var W = 1080, probe = document.createElement('canvas').getContext('2d');
      var H = drawQuote(probe, W, r, false);
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var ctx = cv.getContext('2d'); ctx.fillStyle = '#F6EFE3'; ctx.fillRect(0, 0, W, H);
      drawQuote(ctx, W, r, true);
      cv.toBlob(function (blob) {
        if (!blob) { toast('No se pudo crear la imagen.'); return; }
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cotizacion-own-' + state.folio + '.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
        toast('Descargada. Mándala por WhatsApp con el botón de abajo.');
      }, 'image/png');
    };
    var fonts = document.fonts && document.fonts.load ? Promise.all(['900 30px Satoshi', '500 22px Satoshi', '700 54px Caveat'].map(function (f) { return document.fonts.load(f); })) : Promise.resolve();
    fonts.then(go, go);
  }
  $('#dl').addEventListener('click', download);

  /* ---------- recibo en móvil ---------- */
  var wrap = $('#receiptWrap');
  function openReceipt() { wrap.classList.add('is-open'); setTimeout(function () { $('#closeReceipt').focus(); }, 60); }
  function closeReceipt() { wrap.classList.remove('is-open'); $('#openReceipt').focus(); }
  $('#openReceipt').addEventListener('click', openReceipt);
  $('#closeReceipt').addEventListener('click', closeReceipt);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('is-open')) closeReceipt(); });

  /* ---------- términos y entregas ---------- */
  $('#terms').innerHTML = C.terms.map(function (t) { return '<li>' + starSVG() + '<span>' + esc(t) + '</span></li>'; }).join('');
  $('#delivery').innerHTML = C.delivery.map(function (d) { return '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>'; }).join('');
  $('#handle').textContent = C.handle; $('#handle2').textContent = C.handle;

  renderTabs();
  renderPanel();
})();
