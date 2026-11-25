/* ==========================================================================
   HS Code Lookup — interaction layer
   Demo dataset only. Not an official tariff source.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.HSDATA;
  if (!DATA) return;

  var HS_ENTRIES = DATA.HS_ENTRIES;
  var CH1_US = DATA.CH1_US;
  var CH1_EU = DATA.CH1_EU;
  var US_HTS = DATA.US_HTS;
  var EU_TARIFF = DATA.EU_TARIFF;
  var CN_TARIFF = DATA.CN_TARIFF;
  var CHAPTERS = DATA.CHAPTERS;
  var CH1_TITLES = DATA.CH1_TITLES;

  var HS = {};
  HS_ENTRIES.forEach(function (entry) { HS[entry.code] = entry; });

  /* Chapter 01 six-digit entries come from the real HTSUS file. */
  (function () {
    var seen = {};
    CH1_US.forEach(function (record) {
      var code = record.hts8.slice(0, 6);
      if (seen[code]) return;
      seen[code] = true;
      if (HS[code]) return;
      var eu = CH1_EU.filter(function (row) { return row.code6 === code; })[0];
      var title = eu ? eu.desc : record.description;
      HS[code] = {
        code: code,
        rank: 0,
        tags: {},
        chapter: { num: '01', title: 'Live animals' },
        heading: { num: code.slice(0, 4), title: CH1_TITLES[code.slice(0, 4)] || '' },
        sub: { title: title },
        short: title,
        plain: '',
        verify: [],
        detail: { build: '', mixup: '', note: '' },
        terms: [title.toLowerCase()]
      };
    });
  })();

  var COUNTRIES = {
    US: { id: 'US', name: 'United States', system: 'HTSUS', digits: 10 },
    EU: { id: 'EU', name: 'European Union', system: 'TARIC', digits: 10 },
    CN: { id: 'CN', name: 'China', system: 'China Tariff', digits: 10 }
  };

  /* Destinations offered in the lookup form and the result tabs. */
  var DESTINATIONS = ['US'];

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    checkSq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
  };

  var el = {
    form: document.getElementById('search-form'),
    input: document.getElementById('query'),
    error: document.getElementById('query-error'),
    errorText: document.getElementById('query-error-text'),
    submit: document.getElementById('submit-btn'),
    results: document.getElementById('results'),
    title: document.getElementById('results-title'),
    count: document.getElementById('results-count'),
    meta: document.getElementById('results-meta'),
    kicker: document.getElementById('results-kicker'),
    body: document.getElementById('results-body'),
    live: document.getElementById('live-status'),
    toast: document.getElementById('toast')
  };

  var defaultSubmit = el.submit.innerHTML;
  var toastTimer = null;
  var searchToken = 0;

  var state = {
    query: '',
    result: null,
    refine: null,
    expanded: {},
    destCode: null,
    destCountry: null,
    movement: null,
    localCountry: null,
    localDetail: {},
    wizard: null,
    treeOpen: null
  };

  /* ---------------------------------------------------------------- helpers */
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function pad2(num) {
    var value = String(num);
    return value.length < 2 ? '0' + value : value;
  }

  function motionOK() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function toast(message, isError) {
    el.toast.innerHTML = (isError ? ICON.alert : ICON.check) + '<span></span>';
    el.toast.querySelector('span').textContent = message;
    el.toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { el.toast.classList.remove('is-visible'); }, 2800);
  }

  function setLoading(on) {
    el.submit.disabled = on;
    el.submit.innerHTML = on
      ? '<span class="hs-spinner" aria-hidden="true"></span><span>Searching…</span>'
      : defaultSubmit;
  }

  function showError(message) {
    el.error.hidden = false;
    el.errorText.textContent = message;
    el.input.setAttribute('aria-invalid', 'true');
    el.input.focus();
  }

  function clearError() {
    el.error.hidden = true;
    el.errorText.textContent = '';
    el.input.setAttribute('aria-invalid', 'false');
  }

  function contextLabel() {
    if (!state.movement || !state.destCountry) return 'International · six-digit code';
    var country = COUNTRIES[state.destCountry];
    return (state.movement === 'import' ? 'Import' : 'Export') + ' · ' +
      country.name + ' · ' + country.system;
  }

  function countryName(id) {
    return (COUNTRIES[id] || COUNTRIES.US).name;
  }

  /* --------------------------------------------------------------- matching */
  var TERM_INDEX = new Map();
  HS_ENTRIES.forEach(function (entry) {
    entry.terms.forEach(function (term) {
      var key = normalize(term);
      if (!key) return;
      if (!TERM_INDEX.has(key)) TERM_INDEX.set(key, { term: key, codes: [] });
      var record = TERM_INDEX.get(key);
      if (record.codes.indexOf(entry.code) === -1) record.codes.push(entry.code);
    });
  });
  var TERMS = Array.from(TERM_INDEX.values()).sort(function (a, b) { return b.term.length - a.term.length; });

  function endBoundary(text, end) {
    if (end >= text.length) return end;
    if (text.charAt(end) === ' ') return end;
    if (text.charAt(end) === 's' && (end + 1 >= text.length || text.charAt(end + 1) === ' ')) return end + 1;
    return -1;
  }

  function matchProducts(text) {
    var q = normalize(text);
    if (!q) return [];
    var ranges = [];
    var scores = new Map();

    TERMS.forEach(function (record) {
      var from = q.indexOf(record.term);
      while (from !== -1) {
        var startOK = from === 0 || q.charAt(from - 1) === ' ';
        var end = startOK ? endBoundary(q, from + record.term.length) : -1;
        var overlaps = ranges.some(function (range) { return from < range.end && end > range.start; });
        if (startOK && end > 0 && !overlaps) {
          ranges.push({ start: from, end: end });
          record.codes.forEach(function (code) {
            scores.set(code, (scores.get(code) || 0) + record.term.length);
          });
          break;
        }
        from = q.indexOf(record.term, from + 1);
      }
    });

    return Array.from(scores.entries())
      .map(function (pair) { return { entry: HS[pair[0]], score: pair[1] }; })
      .filter(function (item) { return item.entry; })
      .sort(function (a, b) { return b.score - a.score || a.entry.rank - b.entry.rank; })
      .slice(0, 3)
      .map(function (item) { return item.entry; });
  }

  function detectFamily(candidates) {
    if (candidates.some(function (c) { return c.tags && c.tags.knitted !== undefined; })) return 'apparel';
    if (candidates.some(function (c) {
      return c.tags && (c.tags.porcelain !== undefined || c.tags.ceramic !== undefined);
    })) return 'tableware';
    return null;
  }

  var REFINE = {
    apparel: {
      question: 'How is the garment made?',
      options: [
        { id: 'knitted', label: 'Knitted or crocheted' },
        { id: 'woven', label: 'Woven' },
        { id: 'unsure', label: 'Not sure' }
      ],
      feedback: {
        knitted: 'Knitted or crocheted construction points to chapter 61, so the woven options drop out.',
        woven: 'Woven construction points to chapter 62. The wearer then decides between the men’s and women’s headings.',
        unsure: 'Knit and woven cotton tops sit in different chapters. Answering the question would remove one of these.'
      }
    },
    tableware: {
      question: 'What is the body made of?',
      options: [
        { id: 'porcelain', label: 'Porcelain or china' },
        { id: 'ceramic', label: 'Stoneware or other ceramic' },
        { id: 'unsure', label: 'Not sure' }
      ],
      feedback: {
        porcelain: 'Porcelain or china has its own subheading, 691110.',
        ceramic: 'Stoneware and other ceramics stay in 691200, while porcelain moves to 691110.',
        unsure: 'Porcelain is a type of ceramic, so both subheadings remain listed.'
      }
    }
  };

  /* ------------------------------------------------------------- evaluation */
  function treeFor(digits) {
    var chapterNum = digits.slice(0, 2);
    var entries = Object.keys(HS).map(function (key) { return HS[key]; });
    var sample = entries.filter(function (entry) { return entry.chapter.num === chapterNum; })[0];
    var chapterTitle = sample ? sample.chapter.title : 'Chapter ' + chapterNum;
    var heads = [];

    if (chapterNum === '01') {
      var codes = digits.length === 2 ? Object.keys(CH1_TITLES) : [digits];
      codes.forEach(function (code) {
        heads.push({ code: code, title: CH1_TITLES[code] || '', subs: ch1Subs(code) });
      });
    } else {
      var groups = {};
      entries.forEach(function (entry) {
        if (entry.code.indexOf(digits) !== 0) return;
        var head = entry.heading.num;
        if (!groups[head]) groups[head] = { code: head, title: entry.heading.title, subs: [] };
        groups[head].subs.push({ code: entry.code, title: entry.short });
      });
      heads = Object.keys(groups).map(function (key) { return groups[key]; });
    }

    return {
      digits: digits,
      level: digits.length === 2 ? 'chapter' : 'heading',
      chapterNum: chapterNum,
      chapterTitle: chapterTitle,
      heads: heads
    };
  }

  function compute(raw) {
    var cleaned = raw.replace(/[\s.\-–—]/g, '');
    var isDigits = /^[0-9]+$/.test(cleaned) && cleaned.length >= 2;

    if (isDigits) {
      if (cleaned.length === 2 || cleaned.length === 4) {
        return { kind: 'tree', tree: treeFor(cleaned) };
      }
      if (cleaned.length === 6) {
        if (HS[cleaned]) return { kind: 'code', code: cleaned, entry: HS[cleaned] };
        return { kind: 'none', query: raw, reason: 'code', digits: cleaned };
      }
      if (cleaned.length < 6) {
        var matches = Object.keys(HS).filter(function (key) { return key.indexOf(cleaned) === 0; }).slice(0, 3);
        if (matches.length) {
          var candidates = matches.map(function (key) { return HS[key]; });
          return { kind: 'prefix', digits: cleaned, candidates: candidates, family: detectFamily(candidates) };
        }
        return { kind: 'none', query: raw, reason: 'code', digits: cleaned };
      }
      var base = cleaned.slice(0, 6);
      return { kind: 'localcode', digits: cleaned, code: base, entry: HS[base] || null };
    }

    var found = matchProducts(raw);
    if (found.length) return { kind: 'product', query: raw, candidates: found, family: detectFamily(found) };

    var chapters = chapterSuggestions(raw);
    if (chapters.length) return { kind: 'chapters', query: raw, chapters: chapters };
    return { kind: 'none', query: raw, reason: 'text' };
  }

  function visibleCandidates(result) {
    if (!result.candidates) return [];
    if (state.refine && result.family && state.refine !== 'unsure') {
      var filtered = result.candidates.filter(function (c) { return c.tags && c.tags[state.refine]; });
      if (filtered.length) return filtered;
    }
    return result.candidates;
  }

  function queryTokens(query) {
    return query.toLowerCase().split(/[^a-z0-9]+/).filter(function (word) {
      return word.length > 2 && ['the', 'and', 'for', 'with', 'other', 'product', 'goods', 'chapter', 'code', 'item', 'items'].indexOf(word) === -1;
    });
  }

  function wordScore(text, tokens) {
    var words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    return tokens.filter(function (token) {
      return words.some(function (word) { return word.indexOf(token) === 0; });
    }).length;
  }

  function chapterOf(num) {
    var value = parseInt(num, 10);
    return CHAPTERS.filter(function (chapter) { return value >= chapter.from && value <= chapter.to; })[0] || null;
  }

  function chapterSuggestions(query) {
    var tokens = queryTokens(query);
    if (!tokens.length) return [];
    var groups = {};

    function bucket(chapter) {
      if (!groups[chapter.range]) {
        groups[chapter.range] = {
          range: chapter.range, from: chapter.from, to: chapter.to,
          label: chapter.label, count: 0, score: 0
        };
      }
      return groups[chapter.range];
    }

    Object.keys(HS).forEach(function (key) {
      var entry = HS[key];
      var score = wordScore(entry.chapter.title + ' ' + entry.heading.title + ' ' + entry.short, tokens);
      if (!score) return;
      var chapter = chapterOf(entry.chapter.num);
      if (!chapter) return;
      var group = bucket(chapter);
      group.count += 1;
      group.score += score;
    });

    CHAPTERS.forEach(function (chapter) {
      var score = wordScore(chapter.label, tokens);
      if (!score) return;
      bucket(chapter).score += score * 2;
    });

    return Object.keys(groups).map(function (key) {
      var group = groups[key];
      group.count = chapterEntries(group).length;
      return group;
    })
      .sort(function (a, b) { return b.score - a.score || a.from - b.from; })
      .slice(0, 4);
  }

  /* --------------------------------------------------------------- rendering */
  function pathHTML(entry) {
    return '<div class="hs-path">' +
      '<div class="hs-path-row"><span class="hs-path-k">Chapter</span><span class="hs-path-v"><b>' + esc(entry.chapter.num) + '</b>' + esc(entry.chapter.title) + '</span></div>' +
      '<div class="hs-path-row"><span class="hs-path-k">Heading</span><span class="hs-path-v"><b>' + esc(entry.heading.num) + '</b>' + esc(entry.heading.title) + '</span></div>' +
      '<div class="hs-path-row"><span class="hs-path-k">Subheading</span><span class="hs-path-v"><b>' + esc(entry.code) + '</b>' + esc(entry.sub.title) + '</span></div>' +
      '</div>';
  }

  function verifyHTML(items, heading) {
    if (!items || !items.length) return '';
    return '<div class="hs-verify"><p class="hs-verify-h">' + esc(heading) + '</p><ul>' +
      items.map(function (item) { return '<li>' + ICON.checkSq + '<span>' + esc(item) + '</span></li>'; }).join('') +
      '</ul></div>';
  }

  // Numbered band above a result step, with an optional right-aligned hint.
  function stepHead(num, title, hint) {
    return '<div class="hs-step-head"><span class="hs-step-num" aria-hidden="true">' + num + '</span>' +
      '<span class="hs-step-title">' + esc(title) + '</span>' +
      (hint ? '<span class="hs-step-hint">' + esc(hint) + '</span>' : '') +
      '</div>';
  }

  // Two or more candidates need an explicit picker, because the destination
  // block below can only show the local rows for one of them.
  function classPickerHTML(entries, code) {
    if (!entries || entries.length < 2) return '';
    return '<div class="hs-pick">' +
      '<span class="hs-field-label" id="pick-label">Which six-digit candidate?</span>' +
      '<div class="hs-pick-grid" role="radiogroup" aria-labelledby="pick-label">' +
      entries.map(function (item) {
        var on = item.code === code;
        return '<button class="hs-pick-card' + (on ? ' is-on' : '') + '" type="button" role="radio" aria-checked="' + on + '" data-cand="' + esc(item.code) + '">' +
          '<span class="hs-pick-code">' + esc(item.code) + '</span>' +
          '<span class="hs-pick-desc">' + esc(item.short) + '</span>' +
          (on ? '<span class="hs-pick-check" aria-hidden="true">' + ICON.check + '</span>' : '') +
          '</button>';
      }).join('') +
      '</div>' +
      '</div>';
  }

  function candidateHTML(entry, isPrimary) {
    var open = !!state.expanded[entry.code];
    return '<article class="hs-cand' + (isPrimary ? ' is-primary' : '') + '">' +
      '<div class="hs-cand-top">' +
        '<div><span class="hs-code">' + esc(entry.code) + '</span>' +
          '<span class="hs-code-meta">6-digit HS · Chapter ' + esc(entry.chapter.num) + '</span></div>' +
        (isPrimary ? '<span class="tag">Best starting point</span>' : '') +
      '</div>' +
      '<h3>' + esc(entry.short) + '</h3>' +
      (entry.plain ? '<p>' + esc(entry.plain) + '</p>' : '') +
      pathHTML(entry) +
      verifyHTML(entry.verify, 'Check before you choose') +
      '<p class="hs-lookup-meta">' +
        '<span><b>Data source</b>Demo dataset</span>' +
        '<span><b>Version</b>Demo dataset</span>' +
      '</p>' +
      '<div class="hs-cand-actions">' +
        '<button class="btn btn-outline btn-sm" type="button" data-copy="' + esc(entry.code) + '">' + ICON.copy + '<span>Copy code</span></button>' +
        (entry.detail && (entry.detail.build || entry.detail.mixup || entry.detail.note)
          ? '<button class="hs-toggle" type="button" data-toggle="' + esc(entry.code) + '" aria-expanded="' + open + '" aria-controls="detail-' + esc(entry.code) + '">' +
            (open ? 'Hide classification details' : 'View classification details') + ICON.chevron + '</button>'
          : '') +
        '<button class="hs-toggle" type="button" data-dest="' + esc(entry.code) + '">See destination lines ' + ICON.arrow + '</button>' +
      '</div>' +
      '<div class="hs-detail" id="detail-' + esc(entry.code) + '"' + (open ? '' : ' hidden') + '>' +
        (entry.detail.build ? '<div><h4>How the code is built</h4><p>' + esc(entry.detail.build) + '</p></div>' : '') +
        (entry.detail.mixup ? '<div><h4>Common mix-up</h4><p>' + esc(entry.detail.mixup) + '</p></div>' : '') +
        (entry.detail.note ? '<div><h4>Detail usually needed</h4><p>' + esc(entry.detail.note) + '</p></div>' : '') +
        '<p class="hs-fine">Demo explanation, written for this prototype.</p>' +
      '</div>' +
      '</article>';
  }

  function refineHTML(result, shownCount) {
    var config = REFINE[result.family];
    var current = state.refine;
    var feedback = '';

    if (current) {
      var lead = current === 'unsure'
        ? 'Showing all ' + shownCount + ' candidates. '
        : 'Narrowed to ' + shownCount + ' candidate' + (shownCount === 1 ? '' : 's') + '. ';
      feedback = '<div class="hs-refine-feedback">' + ICON.info + '<span>' + esc(lead + config.feedback[current]) + '</span></div>';
    }

    var chips = config.options.map(function (option) {
      var pressed = current === option.id;
      return '<button class="hs-chip" type="button" data-refine="' + option.id + '" aria-pressed="' + pressed + '">' +
        (pressed ? ICON.check : '') + esc(option.label) + '</button>';
    }).join('');

    return '<div class="hs-refine">' +
      '<h3>Help narrow down the results</h3>' +
      '<p class="sub">If none of these fit, <a href="#chapters" data-browse>browse by chapter below</a> and drill down from the schedule instead.</p>' +
      '<p class="hs-refine-q" id="refine-q">' + esc(config.question) + '</p>' +
      '<div class="hs-chips" role="group" aria-labelledby="refine-q">' + chips + '</div>' +
      feedback +
      (current ? '<div><button class="hs-toggle" type="button" data-refine="clear">Clear answer</button></div>' : '') +
      '</div>';
  }

  /* ------------------------------------------------------- local tariff rows */
  function ch1Rows(code6) {
    var rows = [];
    CH1_US.forEach(function (record) {
      if (record.hts8.slice(0, 6) !== code6) return;
      if (record.suffixes && record.suffixes.length) {
        record.suffixes.forEach(function (suffix) {
          var label = (suffix.context ? suffix.context + ' — ' : '') + (suffix.description || record.description);
          rows.push({
            code: record.hts8 + suffix.stat,
            desc: label,
            duty: record.general,
            col2: record.col2,
            unit: suffix.unit || record.unit
          });
        });
      } else {
        rows.push({
          code: record.hts8,
          desc: record.description,
          duty: record.general,
          col2: record.col2,
          unit: record.unit
        });
      }
    });
    return rows;
  }

  function ch1Subs(prefix) {
    var seen = {};
    var subs = [];
    CH1_US.forEach(function (record) {
      var code = record.hts8.slice(0, 6);
      if (record.hts8.indexOf(prefix) !== 0 || seen[code]) return;
      seen[code] = true;
      var eu = CH1_EU.filter(function (row) { return row.code6 === code; })[0];
      subs.push({ code: code, title: eu ? eu.desc : record.description });
    });
    return subs;
  }

  function localRows(code, countryId) {
    var rows = [];
    var note = '';
    var source = '';
    var real = false;

    if (countryId === 'US') {
      source = 'HTSUS 2026 Rev.23';
      if (code.indexOf('01') === 0) {
        rows = ch1Rows(code).map(function (row) {
          return { code: row.code, desc: row.desc, duty: row.duty, col2: row.col2, unit: row.unit };
        });
        if (rows.length) {
          real = true;
          note = 'Chapter 01 uses real HTSUS lines. Duty is the General rate; Column 2 is shown where it differs.';
        }
      }
      if (!rows.length && US_HTS[code]) {
        rows = US_HTS[code].map(function (row) {
          return { code: row.code, desc: row.desc, detail: row.detail, checks: row.checks, placeholder: true };
        });
        source = 'Demo dataset';
        note = 'Placeholder rows: the six-digit code plus four X digits. Written to show the interaction, not for filing.';
      }
    } else if (countryId === 'EU') {
      source = 'EU CN 2022';
      CH1_EU.forEach(function (row) {
        if (row.code6 !== code) return;
        rows.push({ code: row.code6, desc: row.desc, six: true });
      });
      if (rows.length) {
        real = true;
        note = 'Six-digit CN level. TARIC ten-digit lines are not part of this demo.';
      } else if (EU_TARIFF[code]) {
        rows = EU_TARIFF[code].map(function (row) {
          return { code: row.code, desc: row.desc, detail: row.detail, checks: row.checks, placeholder: true };
        });
        source = 'Demo dataset';
        note = 'Placeholder rows for this destination. The EU schedule can run beyond ten digits.';
      } else {
        note = 'The demo dataset has no EU rows for this code yet.';
      }
    } else {
      source = 'China tariff (demo)';
      if (CN_TARIFF[code]) {
        rows = CN_TARIFF[code].map(function (row) {
          return { code: row.code, desc: row.desc, detail: row.detail, checks: row.checks, placeholder: true };
        });
        note = 'Placeholder rows for this destination, kept simple for the demo.';
      } else {
        note = 'China lines are not loaded for this code in the demo.';
      }
    }

    return { rows: rows, note: note, source: source, real: real };
  }

  function localTableHTML(code, countryId) {
    var country = COUNTRIES[countryId];
    var data = localRows(code, countryId);

    var tabs = DESTINATIONS.map(function (id) {
      var on = id === countryId;
      return '<button class="hs-tab" type="button" role="tab" data-local-country="' + id + '" aria-selected="' + on + '">' +
        esc(COUNTRIES[id].name) + '</button>';
    }).join('');

    var head = '<div class="hs-local-head">' +
      '<h3>' + (countryId === 'US' ? 'US' : esc(country.name)) +
        (state.movement === 'export' ? ' destination lines' : ' import classifications') + '</h3>' +
      (DESTINATIONS.length > 1
        ? '<div class="hs-tabs" role="tablist" aria-label="Destination">' + tabs + '</div>'
        : '<span class="hs-local-system">' + ICON.info + esc(country.system) + ' · ' + country.digits + ' digits</span>') +
      '</div>';

    if (!data.rows.length) {
      return '<div class="hs-local" id="destination">' + head +
        '<p class="hs-local-note">' + ICON.info +
          '<span>The demo dataset has no ' + esc(country.name) + ' rows for ' + esc(code) +
          ' yet. The six-digit explanation still applies, and another destination may be populated.</span>' +
        '</p>' +
        '<p class="hs-local-verify">' + ICON.shield +
          '<span>Try another destination, or read the six-digit explanation above.</span>' +
        '</p>' +
        '</div>';
    }

    var note = '<p class="hs-local-note">' + ICON.info +
      '<span>' + (data.real
        ? 'Lines from the published schedule as captured in this demo. Rates change; confirm before filing.'
        : 'Rows use placeholder codes (' + esc(code) + ' plus four X digits) so the interaction can be tested. They are not valid for customs filing.') +
      '</span></p>';

    var headRow = '<div class="hs-local-row-head" aria-hidden="true">' +
      '<span>Code</span><span>Description</span><span>Action</span>' +
      '</div>';

    var items = data.rows.map(function (row, index) {
      var key = countryId + '|' + code + '|' + index;
      var open = !!state.localDetail[key];
      var expandable = !!(row.detail || (row.checks && row.checks.length));
      var detailId = 'ld-' + key.replace(/[^a-z0-9]/gi, '-');

      var action = '';
      if (countryId === 'US' && row.duty) {
        action = '<span class="hs-duty">' + esc(row.duty) + '</span>' +
          (row.col2 && row.col2 !== row.duty ? '<span class="hs-duty-alt">Col. 2 ' + esc(row.col2) + '</span>' : '');
      } else if (row.placeholder) {
        action = '<span class="hs-ph">Placeholder local code</span>';
      } else if (row.six) {
        action = '<span class="hs-duty-alt">Six-digit line</span>';
      }

      return '<div class="hs-local-item">' +
        '<div class="hs-local-main">' +
          '<div class="hs-local-code-row">' +
            '<span class="hs-local-code">' + esc(row.code) + '</span>' +
            (row.placeholder && countryId !== 'US' ? '' : '') +
          '</div>' +
          '<div class="hs-local-desc-cell">' +
            '<p class="hs-local-desc">' + esc(row.desc) + '</p>' +
            (expandable
              ? '<button class="hs-toggle" type="button" data-local-toggle="' + esc(key) + '" aria-expanded="' + open + '" aria-controls="' + detailId + '">' +
                (open ? 'Hide details' : 'View details') + ICON.chevron + '</button>'
              : '') +
          '</div>' +
          '<div class="hs-local-action">' + action + '</div>' +
        '</div>' +
        (expandable && open
          ? '<div class="hs-local-detail" id="' + detailId + '">' +
              (row.detail ? '<div><h4>What this row covers</h4><p>' + esc(row.detail) + '</p></div>' : '') +
              verifyHTML(row.checks, 'Check before you choose') +
            '</div>'
          : '') +
        '</div>';
    }).join('');

    var pickNote = '<p class="hs-local-verify">' + ICON.shield +
      '<span>Does this description match your item? If not, add more detail and search again.</span>' +
      '<button class="hs-toggle" type="button" data-edit>Edit search</button>' +
      '</p>';

    return '<div class="hs-local" id="destination">' + head + note + headRow + items + pickNote + '</div>';
  }

  // Direction and market picker. DESTINATIONS only holds markets this demo
  // actually carries data for, which is the United States alone.
  function directionHTML(code) {
    var countries = DESTINATIONS.map(function (id) { return COUNTRIES[id]; });
    if (!countries.length) return '';

    var options = [];
    countries.forEach(function (country) {
      ['import', 'export'].forEach(function (move) {
        options.push({ move: move, country: country });
      });
    });

    var buttons = options.map(function (option) {
      var on = state.movement === option.move && state.destCountry === option.country.id;
      var system = option.country.id === 'US' ? 'HTSUS ten-digit' : option.country.system;
      return '<button class="hs-dw-btn' + (on ? ' is-on' : '') + '" type="button" ' +
        'data-move="' + option.move + '" data-market="' + option.country.id + '">' +
        '<b>' + (option.move === 'import' ? 'Import' : 'Export') + ' · ' + esc(option.country.name) + '</b>' +
        '<span>' + esc(system) + '</span>' +
        '</button>';
    }).join('');

    var title = options.length > 2 ? 'Six destinations for this code'
      : options.length === 2 ? 'Two directions for this code'
      : 'One direction for this code';

    return '<div class="hs-dw">' +
      '<p class="hs-dw-title">' + title + '</p>' +
      '<p class="hs-dw-sub">Pick a direction and market to see the local line and duty. Import and export rates differ.</p>' +
      '<div class="hs-dw-grid">' + buttons + '</div>' +
      '</div>';
  }

  /* --------------------------------------------------------------- body kinds */
  function productHTML(result) {
    var shown = visibleCandidates(result);
    var multiple = shown.length > 1;
    var refine = result.family ? refineHTML(result, shown.length) : '';
    var cards = shown.map(function (entry, index) {
      return candidateHTML(entry, multiple && index === 0);
    }).join('');

    var code = state.destCode && shown.some(function (item) { return item.code === state.destCode; })
      ? state.destCode
      : (shown[0] ? shown[0].code : null);
    var country = state.localCountry || state.destCountry || 'US';

    return stepHead(1, 'Six-digit candidates', shown.length + ' shown') +
      refine +
      '<div class="hs-cands' + (shown.length === 1 ? ' is-one' : '') + '">' + cards + '</div>' +
      '<p class="hs-note">' + ICON.info +
        '<span>Candidate classifications are starting points. Confirm the material, construction and final use before you use a code.</span>' +
      '</p>' +
      (code
        ? '<div class="hs-step-block" id="step-local">' +
            stepHead(2, state.movement === 'import' ? 'Full import code' : 'Code at the destination',
              COUNTRIES[country].name + ' · ' + COUNTRIES[country].system) +
            classPickerHTML(shown, code) +
            localTableHTML(code, country) +
          '</div>'
        : '');
  }

  function codeHTML(result) {
    var entry = result.entry;
    var open = !!state.expanded[entry.code];
    var detailId = 'detail-code-' + entry.code;
    var country = state.localCountry || state.destCountry || 'US';

    // The classification path already sits above the actions, so only the
    // expandable detail block is added here.
    var details = entry.detail && (entry.detail.build || entry.detail.mixup || entry.detail.note)
      ? '<div class="hs-detail" id="' + detailId + '"' + (open ? '' : ' hidden') + '>' +
          (entry.plain ? '<p>' + esc(entry.plain) + '</p>' : '') +
          verifyHTML(entry.verify, 'Check before you choose') +
        '</div>'
      : '';

    return '<div class="hs-cands is-single">' +
        '<article class="hs-cand is-primary">' +
          '<div class="hs-cand-top">' +
            '<div><span class="hs-code">' + esc(entry.code) + '</span>' +
              '<span class="hs-code-meta">HS · Chapter ' + esc(entry.chapter.num) + '</span></div>' +
            '<span class="tag">Six-digit code</span>' +
          '</div>' +
          '<h3>' + esc(entry.short) + '</h3>' +
          pathHTML(entry) +
          '<div class="hs-cand-actions">' +
            '<button class="btn btn-outline btn-sm" type="button" data-copy="' + esc(entry.code) + '">' + ICON.copy + '<span>Copy code</span></button>' +
            (entry.detail && (entry.detail.build || entry.detail.mixup || entry.detail.note)
              ? '<button class="hs-toggle" type="button" data-toggle="' + esc(entry.code) + '" aria-expanded="' + open + '" aria-controls="' + detailId + '">' +
                (open ? 'Hide classification details' : 'View classification details') + ICON.chevron + '</button>'
              : '') +
          '</div>' +
          details +
        '</article>' +
      '</div>' +
      directionHTML(entry.code) +
      '<div class="hs-step-block" id="step-local">' +
        stepHead(2, state.movement === 'import' ? 'Full import code' : 'Code at the destination',
          COUNTRIES[country].name + ' · ' + COUNTRIES[country].system) +
        localTableHTML(entry.code, country) +
      '</div>';
  }

  function localcodeHTML(result) {
    var entry = result.entry;
    var country = state.localCountry || state.destCountry || 'US';
    var explain = entry
      ? '<article class="hs-cand">' +
          '<div class="hs-cand-top"><div><span class="hs-code">' + esc(result.code) + '</span>' +
            '<span class="hs-code-meta">HS · Chapter ' + esc(entry.chapter.num) + '</span></div>' +
            '<span class="tag">Local code lookup</span></div>' +
          '<h3>' + esc(entry.short) + '</h3>' +
          (entry.plain ? '<p>' + esc(entry.plain) + '</p>' : '') +
          pathHTML(entry) +
        '</article>'
      : '<div class="hs-empty">The demo dataset has no six-digit entry for ' + esc(result.code) +
        ', so only the destination rows are shown.</div>';

    return '<div class="hs-cands is-single">' + explain + '</div>' +
      directionHTML(result.code) +
      '<div class="hs-step-block" id="step-local">' +
        stepHead(2, state.movement === 'import' ? 'Full import code' : 'Code at the destination',
          COUNTRIES[country].name + ' · ' + COUNTRIES[country].system) +
        localTableHTML(result.code, country) +
      '</div>';
  }

  function noneHTML(result) {
    var reason = result.reason === 'code'
      ? 'The demo dataset has no entry for “' + esc(result.digits) + '”.'
      : 'Nothing in the demo dataset matches “' + esc(result.query) + '”.';

    return '<div class="hs-empty">' +
      '<p>' + reason + '</p>' +
      '<ul class="hs-empty-tips">' +
        '<li>' + ICON.arrow + '<span>Try a more specific product name.</span></li>' +
        '<li>' + ICON.arrow + '<span>Add the material or intended use.</span></li>' +
        '<li>' + ICON.arrow + '<span>Check the digits, or change the destination at the top of the page.</span></li>' +
      '</ul>' +
      '<div class="hs-results-actions" style="justify-content:center">' +
        '<button class="btn btn-outline btn-sm" type="button" data-edit>Edit search</button>' +
        '<button class="btn btn-ghost btn-sm" type="button" data-browse>Browse chapters</button>' +
      '</div>' +
      '</div>';
  }

  function treeHTML(result) {
    var tree = result.tree;
    var intro = '<p class="hs-results-lede">' +
      (tree.level === 'chapter'
        ? 'Chapter ' + esc(tree.chapterNum) + ' · ' + esc(tree.chapterTitle) + '. Open a heading to see its six-digit subheadings.'
        : 'Heading ' + esc(tree.digits) + '. Pick a six-digit subheading to get the answer, then a destination for the local line.') +
      '</p>';

    if (!tree.heads.length) {
      return intro + '<div class="hs-empty">Chapter ' + esc(tree.chapterNum) +
        ' is not loaded in this demo. Chapter 01 carries the full six-digit dataset; other chapters are sample entries.</div>';
    }

    var rows = tree.heads.map(function (head) {
      var open = state.treeOpen === head.code;
      var list = head.subs.length
        ? head.subs.map(function (sub) {
            return '<button class="tree-opt" type="button" data-pick="' + esc(sub.code) + '">' +
              '<code>' + esc(sub.code) + '</code><span>' + esc(sub.title) + '</span></button>';
          }).join('')
        : '<p class="cp-empty">No six-digit rows in this demo for ' + esc(head.code) + '.</p>';

      return '<div class="tree-row">' +
        '<span class="tree-k">Heading ' + esc(head.code) + '</span>' +
        // Same field-with-floating-menu pattern as the chapter panel: the
        // subheading list drops over the content instead of pushing the rows
        // below it down.
        '<div class="tree-field">' +
          '<button class="tree-select" type="button" data-tree-open="' + esc(head.code) + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
            '<code>' + esc(head.code) + '</code>' +
            '<span class="tree-name">' + esc(head.title || 'Heading') + '</span>' +
            ICON.chevron +
          '</button>' +
          (open ? '<div class="tree-menu">' + list + '</div>' : '') +
        '</div>' +
        '</div>';
    }).join('');

    return intro + '<div class="cp-tree hs-tree" style="margin-top:18px">' + rows + '</div>';
  }

  function chaptersHTML(result) {
    var rows = result.chapters.map(function (chapter) {
      var digits = chapter.from === chapter.to ? pad2(chapter.from) : pad2(chapter.from) + '–' + pad2(chapter.to);
      var meta = chapter.count
        ? chapter.count + ' six-digit line' + (chapter.count === 1 ? '' : 's') + ' in this demo'
        : 'No six-digit lines yet';
      return '<button class="hs-chap" type="button" data-open-chapter="' + chapter.from + '-' + chapter.to + '">' +
        '<span class="hs-chap-mark">' + esc(digits) + '</span>' +
        '<span class="hs-chap-copy">' +
          '<span class="hs-chap-name">' + esc(chapter.label) + '</span>' +
          '<span class="hs-chap-meta">' + meta + '</span>' +
        '</span>' +
        '</button>';
    }).join('');

    var single = result.chapters.length === 1;
    return '<p class="hs-results-lede">' +
      (single
        ? 'The description points at one chapter in this demo. Open it to pick a heading, then a six-digit code.'
        : 'The description can sit across several chapters. Open a chapter to pick a heading, then a six-digit code.') +
      '</p>' +
      '<div class="hs-chap-list' + (single ? ' is-one' : '') + '">' + rows + '</div>';
  }

  function bodyHTML(result) {
    if (result.kind === 'tree') return treeHTML(result);
    if (result.kind === 'chapters') return chaptersHTML(result);
    if (result.kind === 'product' || result.kind === 'prefix') return productHTML(result);
    if (result.kind === 'code') return codeHTML(result);
    if (result.kind === 'localcode') return localcodeHTML(result);
    return noneHTML(result);
  }

  function render() {
    var result = state.result;
    if (!result) {
      el.results.hidden = true;
      return;
    }

    el.results.hidden = false;
    el.body.innerHTML = bodyHTML(result);
    el.title.textContent = 'Results';
    el.count.hidden = true;
    el.meta.textContent = '';
    if (el.kicker) el.kicker.textContent = 'Results';

    if (result.kind === 'product' || result.kind === 'prefix') {
      var shown = visibleCandidates(result).length;
      var total = result.candidates.length;
      el.title.textContent = result.kind === 'product'
        ? 'Candidate classifications for “' + result.query + '”'
        : 'Codes starting with ' + result.digits;
      el.count.hidden = false;
      el.count.textContent = shown < total ? shown + ' of ' + total : String(total);
      el.meta.textContent = (result.kind === 'product'
        ? 'For “' + result.query + '”. '
        : '') + contextLabel() +
        (state.movement && state.destCountry
          ? ' adds ' + COUNTRIES[state.destCountry].digits + ' digits after the six-digit code.'
          : '. Pick a destination to see the local line.');
      return;
    }

    if (result.kind === 'code') {
      el.title.textContent = 'Code lookup result';
      el.meta.textContent = result.code + ' · ' + contextLabel() + ' · ' + result.entry.short;
      return;
    }

    if (result.kind === 'localcode') {
      if (el.kicker) el.kicker.textContent = 'Local code';
      el.title.textContent = 'Local code lookup';
      el.count.hidden = false;
      el.count.textContent = result.digits;
      el.meta.textContent = 'The first six digits identify the international line: ' + result.code + '.';
      return;
    }

    if (result.kind === 'tree') {
      el.title.textContent = 'Chapter ' + result.tree.chapterNum;
      el.meta.textContent = result.tree.chapterTitle;
      return;
    }

    if (result.kind === 'chapters') {
      el.title.textContent = 'Matching chapters';
      el.count.hidden = false;
      el.count.textContent = String(result.chapters.length);
      el.meta.textContent = 'For “' + result.query + '”.';
      return;
    }

    if (el.kicker) el.kicker.textContent = 'No results';
    el.title.textContent = 'No matching classifications found.';
    el.meta.textContent = 'Nothing in the demo dataset matches this search yet.';
  }

  function scrollToResults() {
    if (el.results.hidden) return;
    var top = el.results.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: top, behavior: motionOK() ? 'smooth' : 'auto' });
  }

  /* ------------------------------------------------------------------ search */
  function runSearch(raw) {
    var query = String(raw).trim();
    if (!query) {
      showError('Enter a product description or HS code.');
      return;
    }
    clearError();

    state.query = query;
    state.result = null;
    state.refine = null;
    state.expanded = {};
    state.destCode = null;
    state.localCountry = null;
    state.localDetail = {};
    state.treeOpen = null;

    setLoading(true);
    var token = ++searchToken;
    el.live.textContent = 'Searching the demo dataset for ' + query + '.';

    window.setTimeout(function () {
      if (token !== searchToken) return;
      state.result = compute(query);
      setLoading(false);
      render();
      scrollToResults();
      var count = state.result && (state.result.candidates ? visibleCandidates(state.result).length : 0);
      el.live.textContent = count
        ? count + ' candidate classification' + (count === 1 ? '' : 's') + ' found.'
        : 'Search finished.';
    }, 420);
  }

  function focusSearch() {
    el.input.focus();
    el.input.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'center' });
  }

  /* --------------------------------------------------------------- clipboard */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      throw new Error('Clipboard API unavailable');
    } catch (error) {
      try {
        var helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.top = '-1000px';
        document.body.appendChild(helper);
        helper.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(helper);
        return ok;
      } catch (fallbackError) {
        return false;
      }
    }
  }

  async function handleCopy(button, code) {
    var ok = await copyText(code);
    if (!ok) {
      toast('Copy failed. Select the code and copy it manually.', true);
      return;
    }
    var previous = button.innerHTML;
    button.innerHTML = ICON.check + '<span>Copied</span>';
    toast(code + ' copied to clipboard');
    window.setTimeout(function () {
      if (!button.isConnected) return;
      button.innerHTML = previous;
    }, 1800);
  }

  /* --------------------------------------------------------------- chapters */
  function chapterEntries(chapter) {
    return HS_ENTRIES.filter(function (entry) {
      var num = parseInt(entry.chapter.num, 10);
      return num >= chapter.from && num <= chapter.to;
    }).sort(function (a, b) { return a.code.localeCompare(b.code); });
  }

  function chapterNums(chapter) {
    var seen = {};
    chapterEntries(chapter).forEach(function (entry) { seen[entry.chapter.num] = true; });
    return Object.keys(seen).sort();
  }

  function chapterTitle(num) {
    var hit = HS_ENTRIES.filter(function (entry) { return entry.chapter.num === num; })[0];
    return hit ? hit.chapter.title : 'Chapter ' + num;
  }

  function headingsOf(num) {
    var seen = {};
    var out = [];
    HS_ENTRIES.forEach(function (entry) {
      if (entry.chapter.num !== num || seen[entry.heading.num]) return;
      seen[entry.heading.num] = true;
      out.push({ code: entry.heading.num, name: entry.heading.title });
    });
    return out.sort(function (a, b) { return a.code.localeCompare(b.code); });
  }

  function codesOf(num) {
    return HS_ENTRIES.filter(function (entry) { return entry.heading.num === num; })
      .sort(function (a, b) { return a.code.localeCompare(b.code); })
      .map(function (entry) { return { code: entry.code, name: entry.short }; });
  }

  function treeRowHTML(o) {
    var options = o.open ? o.options.map(function (opt) {
      return '<button class="tree-opt" type="button" data-' + o.attr + '="' + esc(opt.code) + '">' +
        '<code>' + esc(opt.code) + '</code><span>' + esc(opt.name) + '</span></button>';
    }).join('') : '';

    return '<div class="tree-row">' +
      '<span class="tree-k">' + esc(o.label) + '</span>' +
      // The select and its list share a wrapper so the floating panel is
      // positioned against the select box, not against the row's grid cell.
      '<div class="tree-field">' +
        '<button class="tree-select' + (o.value ? '' : ' is-empty') + '" type="button" data-level="' + esc(o.level) + '" aria-expanded="' + (o.open ? 'true' : 'false') + '">' +
          (o.value ? '<code>' + esc(o.value) + '</code>' : '') +
          '<span class="tree-name">' + esc(o.value ? (o.name || o.placeholder) : o.placeholder) + '</span>' +
          ICON.chevron +
        '</button>' +
        (o.open ? '<div class="tree-menu">' + options + '</div>' : '') +
      '</div>' +
      '</div>';
  }

  function chapterPanelHTML() {
    var w = state.wizard;
    var nums = chapterNums(w.chapter);

    if (!nums.length) {
      return '<p class="cp-empty">' + (w.chapter.from === 99
        ? 'Chapter 99 holds country-specific provisions rather than HS lines. Use the search above for those codes. '
        : 'The demo dataset has no six-digit lines for this range yet. ') +
        '<button class="hs-toggle" type="button" data-edit>Search by description</button></p>';
    }

    var rows = treeRowHTML({
      level: 'chapter', label: 'Chapter', attr: 'chapter-num',
      value: w.chapterNum, name: w.chapterNum ? chapterTitle(w.chapterNum) : '',
      placeholder: 'Select a chapter',
      options: nums.map(function (num) { return { code: num, name: chapterTitle(num) }; }),
      open: w.open === 'chapter'
    });

    if (w.chapterNum) {
      var heads = headingsOf(w.chapterNum);
      rows += treeRowHTML({
        level: 'heading', label: 'Heading', attr: 'heading-num',
        value: w.heading,
        name: w.heading ? (heads.filter(function (h) { return h.code === w.heading; })[0] || {}).name : '',
        placeholder: 'Select a four-digit heading',
        options: heads,
        open: w.open === 'heading'
      });
    }

    if (w.heading) {
      rows += treeRowHTML({
        level: 'code', label: 'Subheading', attr: 'tree-code',
        value: w.code,
        name: w.code ? (codesOf(w.heading).filter(function (c) { return c.code === w.code; })[0] || {}).name : '',
        placeholder: 'Select a six-digit code',
        options: codesOf(w.heading),
        open: w.open === 'code'
      });
    }

    var entry = w.code ? HS_ENTRIES.filter(function (item) { return item.code === w.code; })[0] : null;
    var answer = '';
    if (entry) {
      var countryId = state.localCountry || state.destCountry || 'US';
      var country = COUNTRIES[countryId];
      var local = localRows(entry.code, countryId);
      var dirPill = (state.movement === 'export' ? 'Export' : 'Import') + ' · ' + country.name + ' · ' + country.system;
      var rowCopy = local.rows.length
        ? '<div class="cp-local-line"><code>' + esc(local.rows[0].code) + '</code>' +
            (local.rows[0].placeholder ? '<span class="hs-ph">Placeholder local code</span>' : '') +
          '</div>' +
          '<p style="margin:8px 0 0;font-size:13.5px;color:var(--ink)">' + esc(local.rows[0].desc) + '</p>' +
          (local.rows[0].detail ? '<p class="hs-fine" style="margin-top:6px">' + esc(local.rows[0].detail) + '</p>' : '') +
          (local.rows.length > 1 ? '<p class="hs-fine" style="margin-top:8px">' + (local.rows.length - 1) +
            ' more local line' + (local.rows.length > 2 ? 's' : '') + ' for this code — open the full lookup to compare.</p>' : '')
        : '<p style="margin:0;font-size:13.5px;color:var(--muted)">The demo dataset has no ' + esc(country.name) +
          ' rows for ' + esc(entry.code) + ' yet. The six-digit code still applies.</p>';

      answer = '<div class="cp-answer">' +
        '<div class="cp-answer-head"><code>' + esc(entry.code) + '</code>' +
          '<span class="tag">' + esc(dirPill) + '</span></div>' +
        '<h4>' + esc(entry.short) + '</h4>' +
        (entry.plain ? '<p>' + esc(entry.plain) + '</p>' : '') +
        '<p class="hs-fine">Direction and destination come from the top of the page — change them there and this answer follows.</p>' +
        '<div class="cp-local">' + rowCopy + '</div>' +
        (entry.verify && entry.verify.length ? verifyHTML(entry.verify, 'Check before you ship') : '') +
        '<div class="hs-cand-actions">' +
          '<button class="btn btn-primary btn-sm" type="button" data-open-code="' + esc(entry.code) + '">Open full lookup</button>' +
          '<button class="btn btn-ghost btn-sm" type="button" data-chapter-reset>Start over</button>' +
        '</div>' +
        '</div>';
    }

    var span = w.chapter.to - w.chapter.from + 1;
    var note = span > nums.length
      ? '<p class="hs-note" style="margin-top:14px">' + ICON.info +
        '<span>This demo holds lines for ' + (nums.length === 1 ? 'chapter ' : 'chapters ') + nums.join(', ') +
        ' in this range. Chapters without lines are left out.</span></p>'
      : '';

    return note + '<div class="cp-tree">' + rows + '</div>' + answer;
  }

  function placeChapterPanel(chapter) {
    var grid = document.getElementById('chapter-grid');
    var panel = document.getElementById('chapter-panel');
    if (!grid || !panel) return;
    var card = grid.querySelector('[data-chapter="' + chapter.from + '-' + chapter.to + '"]');
    if (!card) return;
    var top = card.getBoundingClientRect().top;
    var nodes = Array.prototype.slice.call(grid.querySelectorAll('.chapter-card'));
    var last = card;
    nodes.forEach(function (node) {
      if (Math.abs(node.getBoundingClientRect().top - top) < 2) last = node;
    });
    if (panel.previousElementSibling !== last) {
      grid.insertBefore(panel, last.nextSibling);
    }
  }

  var treeLeaveTimer = null;

  function renderChapterPanel(scroll, instant) {
    var panel = document.getElementById('chapter-panel');
    var body = document.getElementById('cp-body');
    var title = document.getElementById('cp-title');
    if (!panel || !body || !title) return;

    // The panel is rebuilt from HTML each pass, so a dropdown that is about to
    // disappear would simply vanish. Fade it out first, then rebuild. Only a
    // real close fades: moving to the next step swaps immediately so the drill
    // down stays snappy.
    var leaving = instant || !motionOK() ? null : body.querySelector('.tree-menu:not(.is-leaving)');
    if (leaving && !(state.wizard && state.wizard.open)) {
      leaving.classList.add('is-leaving');
      clearTimeout(treeLeaveTimer);
      treeLeaveTimer = setTimeout(function () {
        treeLeaveTimer = null;
        renderChapterPanel(scroll, true);
      }, 130);
      return;
    }
    // A pending fade-out is moot once we are rebuilding for real.
    if (treeLeaveTimer) { clearTimeout(treeLeaveTimer); treeLeaveTimer = null; }

    if (!state.wizard) {
      panel.hidden = true;
      // Drop the last markup so a stale menu cannot look like an exiting one
      // the next time the panel opens.
      body.innerHTML = '';
      document.querySelectorAll('.chapter-card').forEach(function (card) {
        card.setAttribute('aria-expanded', 'false');
      });
      return;
    }

    panel.hidden = false;
    title.textContent = (state.wizard.chapter.from === state.wizard.chapter.to ? 'Chapter ' : 'Chapters ') +
      state.wizard.chapter.range + ' · ' + state.wizard.chapter.label;
    body.innerHTML = chapterPanelHTML();

    document.querySelectorAll('.chapter-card').forEach(function (card) {
      var on = card.getAttribute('data-chapter') === state.wizard.key;
      card.setAttribute('aria-expanded', on ? 'true' : 'false');
    });

    if (scroll) {
      var target = panel.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: target, behavior: motionOK() ? 'smooth' : 'auto' });
    }
  }

  function openChapter(chapter) {
    var nums = chapterNums(chapter);
    placeChapterPanel(chapter);
    var single = nums.length === 1;
    state.wizard = {
      key: chapter.from + '-' + chapter.to,
      chapter: chapter,
      chapterNum: single ? nums[0] : null,
      heading: null,
      code: null,
      open: single ? 'heading' : 'chapter'
    };
    renderChapterPanel(false);
    el.live.textContent = single
      ? 'Chapter ' + chapter.range + ' opened at two digits. Pick a four-digit heading.'
      : 'Chapters ' + chapter.range + ' opened. Pick a chapter.';
  }

  /* ------------------------------------------------------------------ events */
  el.form.addEventListener('submit', function (event) {
    event.preventDefault();
    runSearch(el.input.value);
  });

  el.input.addEventListener('input', function () {
    if (!el.error.hidden) clearError();
  });

  el.input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (typeof el.form.requestSubmit === 'function') el.form.requestSubmit();
      else el.form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  document.getElementById('edit-search').addEventListener('click', focusSearch);

  var guideLookup = document.getElementById('guide-lookup');
  if (guideLookup) guideLookup.addEventListener('click', focusSearch);

  document.querySelectorAll('[data-example]').forEach(function (button) {
    button.addEventListener('click', function () {
      el.input.value = button.getAttribute('data-example');
      clearError();
      el.input.focus();
    });
  });

  function applyContext() {
    document.querySelectorAll('[data-move]').forEach(function (button) {
      var on = button.getAttribute('data-move') === state.movement;
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-market]').forEach(function (button) {
      var on = button.getAttribute('data-market') === state.destCountry;
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var hint = document.getElementById('dest-hint-text');
    if (hint) {
      if (!state.movement && !state.destCountry) {
        hint.textContent = 'Six digits are shared internationally. Pick a destination after the six-digit code to see the local line.';
      } else if (state.destCountry && !state.movement) {
        hint.textContent = 'Destination set to ' + countryName(state.destCountry) +
          '. Choose Import or Export to position the rate, or leave it blank to compare both.';
      } else if (!state.destCountry) {
        hint.textContent = 'Goods marked as ' + state.movement + '. Choose a destination to narrow the tariff schedule; otherwise every market stays listed.';
      } else {
        var country = COUNTRIES[state.destCountry];
        hint.textContent = state.movement === 'import'
          ? 'Import into ' + country.name + ' follows the ' + country.system + ' schedule for the digits after the six-digit code.'
          : 'Exports carry the six-digit code; ' + country.name + ' (' + country.system + ') adds its own digits on arrival.';
      }
    }

    if (state.result) render();
    if (state.wizard) renderChapterPanel(false);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('button, a');
    // Close an open wizard dropdown when the click lands outside it.
    if (state.wizard && state.wizard.open && !event.target.closest('.tree-row')) {
      state.wizard.open = null;
      renderChapterPanel(false);
    }
    // Same for the heading dropdown in the results list.
    if (state.treeOpen && !event.target.closest('.hs-tree .tree-field')) {
      state.treeOpen = null;
      render();
    }
    if (!button) return;
    var data = button.dataset;

    if (data.move !== undefined) {
      // The direction picker carries both values, so it sets them together
      // instead of relying on a separate destination click.
      if (data.market !== undefined) {
        state.movement = data.move;
        state.destCountry = data.market;
        state.localCountry = data.market;
      } else {
        state.movement = state.movement === data.move ? null : data.move;
        if (state.destCountry) state.localCountry = state.destCountry;
      }
      applyContext();
      return;
    }

    if (data.market !== undefined) {
      state.destCountry = state.destCountry === data.market ? null : data.market;
      state.localCountry = state.destCountry;
      applyContext();
      return;
    }

    if (data.copy) {
      handleCopy(button, data.copy);
      return;
    }

    if (data.edit !== undefined) {
      focusSearch();
      return;
    }

    if (data.browse !== undefined) {
      // The link also works without JS; when JS runs, keep the smooth scroll
      // instead of letting the browser jump the anchor into place.
      event.preventDefault();
      var chapters = document.getElementById('chapters');
      if (chapters) chapters.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'start' });
      return;
    }

    if (data.openChapter !== undefined) {
      var picked = CHAPTERS.filter(function (item) { return item.from + '-' + item.to === data.openChapter; })[0];
      if (!picked) return;
      openChapter(picked);
      var section = document.getElementById('chapters');
      if (section) section.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'start' });
      return;
    }

    if (data.chapter !== undefined) {
      var chapter = CHAPTERS.filter(function (item) { return item.from + '-' + item.to === data.chapter; })[0];
      if (!chapter) return;
      if (state.wizard && state.wizard.key === data.chapter) {
        state.wizard = null;
        renderChapterPanel(false);
        return;
      }
      openChapter(chapter);
      return;
    }

    if (data.chapterClose !== undefined) {
      state.wizard = null;
      renderChapterPanel(false);
      return;
    }

    if (data.treeOpen !== undefined) {
      state.treeOpen = state.treeOpen === data.treeOpen ? null : data.treeOpen;
      render();
      var opened = document.querySelector('[data-tree-open="' + data.treeOpen + '"]');
      if (opened && state.treeOpen) opened.focus({ preventScroll: true });
      return;
    }

    if (data.level) {
      if (!state.wizard) return;
      state.wizard.open = state.wizard.open === data.level ? null : data.level;
      renderChapterPanel(false);
      return;
    }

    if (data.chapterNum) {
      if (!state.wizard) return;
      state.wizard.chapterNum = data.chapterNum;
      state.wizard.heading = null;
      state.wizard.code = null;
      state.wizard.open = 'heading';
      renderChapterPanel(false);
      el.live.textContent = 'Chapter ' + data.chapterNum + ' selected. Pick a four-digit heading.';
      return;
    }

    if (data.headingNum) {
      if (!state.wizard) return;
      state.wizard.heading = data.headingNum;
      state.wizard.code = null;
      state.wizard.open = 'code';
      renderChapterPanel(false);
      el.live.textContent = 'Heading ' + data.headingNum + ' selected. Pick a six-digit code.';
      return;
    }

    if (data.treeCode) {
      if (!state.wizard) return;
      state.wizard.code = data.treeCode;
      state.wizard.open = null;
      renderChapterPanel(false);
      return;
    }

    if (data.chapterReset !== undefined) {
      if (!state.wizard) return;
      var nums = chapterNums(state.wizard.chapter);
      state.wizard.chapterNum = nums.length === 1 ? nums[0] : null;
      state.wizard.heading = null;
      state.wizard.code = null;
      state.wizard.open = nums.length === 1 ? 'heading' : 'chapter';
      renderChapterPanel(false);
      return;
    }

    if (data.openCode) {
      el.input.value = data.openCode;
      runSearch(data.openCode);
      return;
    }

    if (data.refine !== undefined) {
      if (data.refine === 'clear') {
        state.refine = null;
        state.destCode = null;
        render();
        return;
      }
      state.refine = data.refine;
      state.destCode = null;
      render();
      return;
    }

    if (data.toggle !== undefined) {
      var code = data.toggle;
      state.expanded[code] = !state.expanded[code];
      render();
      var toggle = document.querySelector('[data-toggle="' + code + '"]');
      if (toggle) toggle.focus({ preventScroll: true });
      return;
    }

    if (data.pick !== undefined) {
      el.input.value = data.pick;
      runSearch(data.pick);
      return;
    }

    if (data.cand !== undefined) {
      state.destCode = data.cand;
      state.localDetail = {};
      render();
      return;
    }

    if (data.dest !== undefined) {
      state.destCode = data.dest;
      render();
      var block = document.getElementById('destination');
      if (block) {
        var top = block.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: top, behavior: motionOK() ? 'smooth' : 'auto' });
      }
      return;
    }

    if (data.localCountry !== undefined) {
      state.localCountry = data.localCountry;
      state.destCountry = data.localCountry;
      state.localDetail = {};
      render();
      if (state.wizard) renderChapterPanel(false);
      return;
    }

    if (data.localToggle !== undefined) {
      var key = data.localToggle;
      state.localDetail[key] = !state.localDetail[key];
      render();
      var next = document.querySelector('[data-local-toggle="' + key + '"]');
      if (next) next.focus({ preventScroll: true });
      return;
    }

    if (data.toggleRow !== undefined) {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      button.innerHTML = (expanded ? 'Show all rows' : 'Show fewer rows') + ICON.chevron;
      var tableBlock = button.closest('.table-block');
      if (tableBlock) tableBlock.classList.toggle('is-expanded', !expanded);
      return;
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    // An open dropdown closes first; a second Escape closes the whole panel.
    if (state.wizard && state.wizard.open) {
      state.wizard.open = null;
      renderChapterPanel(false);
      return;
    }
    var panel = document.getElementById('chapter-panel');
    if (panel && !panel.hidden) {
      state.wizard = null;
      renderChapterPanel(false);
    }
  });

  /* -------------------------------------------------------------------- init */
  (function buildChapterGrid() {
    var grid = document.getElementById('chapter-grid');
    if (!grid) return;
    var cards = CHAPTERS.map(function (chapter) {
      var nums = chapterNums(chapter);
      var meta = nums.length
        ? nums.length + (nums.length === 1 ? ' chapter' : ' chapters') + ' · ' + chapterEntries(chapter).length + ' six-digit line' + (chapterEntries(chapter).length === 1 ? '' : 's')
        : 'No six-digit lines yet';
      return '<button class="chapter-card" type="button" data-chapter="' + chapter.from + '-' + chapter.to + '" aria-expanded="false" aria-controls="chapter-panel">' +
        '<span class="chapter-mark" aria-hidden="true">' + esc(chapter.range) + '</span>' +
        '<span class="chapter-copy">' +
          '<span class="chapter-name">' + esc(chapter.label) + '</span>' +
          '<span class="chapter-meta">' + meta + '</span>' +
        '</span>' +
        '</button>';
    }).join('');

    grid.innerHTML = cards + '<div class="chapter-panel" id="chapter-panel" hidden>' +
      '<div class="cp-head"><div><h3 id="cp-title"></h3><p>Drill down: chapter, heading, then six-digit subheading.</p></div>' +
      '<button class="btn btn-outline btn-sm" type="button" data-chapter-close>Close</button></div>' +
      '<div id="cp-body"></div>' +
      '</div>';
  })();

  if (state.destCountry) {
    state.localCountry = state.destCountry;
  }
})();
