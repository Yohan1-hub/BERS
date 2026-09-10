/* BERS Institute - RBT prep app */
(function () {
  "use strict";

  var EXAMS = window.RBT_EXAMS || [];
  var CARDS = window.RBT_CARDS || [];
  var SIGLAS = window.RBT_SIGLAS || [];
  var TRANS = window.RBT_TRANS || {};
  var GUIDE = window.RBT_GUIDE || "";
  var PASS = 80;
  var LETTERS = ["A", "B", "C", "D"];
  var STORE_KEY = "rbt_progress_v1";

  var view = document.getElementById("view");
  var side = document.getElementById("side");

  /* Examen RBT oficial: 85 preguntas en 120 minutos (~71s por pregunta).
     Cada simulacro usa tiempo proporcional para mantener el ritmo real. */
  var SECS_PER_Q = 120 * 60 / 85;

  function examTimeMillis(count) { return Math.round(count * SECS_PER_Q * 1000); }

  function fmtTime(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(s / 60);
    s = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  var store = {
    get: function () {
      try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
      catch (e) { return {}; }
    },
    set: function (v) { localStorage.setItem(STORE_KEY, JSON.stringify(v)); },
    exam: function (id) { return this.get()[id] || null; },
    record: function (id, pct) {
      var s = this.get();
      var cur = s[id] || { best: -1, last: -1, tries: 0 };
      cur.tries += 1;
      cur.last = pct;
      if (pct > cur.best) cur.best = pct;
      s[id] = cur;
      this.set(s);
    }
  };

  var quiz = {
    exam: null,
    i: 0,
    picked: -1,
    lock: false,
    picks: [],
    t0: 0,
    totalMs: 0,
    timerId: null,
    timeUp: false,
    paused: false
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function getTrans(ex, i) {
    if (!TRANS[ex.id]) return null;
    var t = TRANS[ex.id][i];
    return t || null;
  }

  var SIGLA_MAP = null;
  function siglaMap() {
    if (!SIGLA_MAP) {
      SIGLA_MAP = {};
      for (var k = 0; k < SIGLAS.length; k++) {
        if (SIGLAS[k].sigla) SIGLA_MAP[SIGLAS[k].sigla.toLowerCase()] = SIGLAS[k];
      }
    }
    return SIGLA_MAP;
  }

  function annotate(txt) {
    var s = esc(txt);
    var order = SIGLAS.filter(function (x) { return x.sigla; })
      .sort(function (a, b) { return b.sigla.length - a.sigla.length; });
    if (!order.length) return s;
    var map = siglaMap();
    var parts = [];
    var seen = {};
    for (var k = 0; k < order.length; k++) {
      if (seen[order[k].sigla.toLowerCase()]) continue;
      seen[order[k].sigla.toLowerCase()] = 1;
      parts.push(order[k].sigla.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    }
    var re = new RegExp("(^|[^A-Za-z0-9])(" + parts.join("|") + ")(?=$|[^A-Za-z0-9])", "gi");
    return s.replace(re, function (m, p1, p2) {
      var item = map[p2.toLowerCase()];
      if (!item) return m;
      var tip = esc(item.en + (item.es && item.es !== item.en ? " — " + item.es : ""));
      return p1 + "<span class='sigla-hl' title='" + tip + "'>" + p2 + "</span>";
    });
  }

  function siglaLegend(txt) {
    if (!txt) return "";
    var map = siglaMap();
    var found = [];
    var seen = {};
    var matches = txt.match(/[A-Za-z0-9]+[^ ]{0,2}/g) || [];
    for (var i = 0; i < matches.length; i++) {
      if (!map) continue;
      var key = matches[i].toLowerCase().replace(/[^a-z0-9]/g, "");
      if (map[key]) {
        if (!seen[key]) { seen[key] = 1; found.push(map[key]); }
        continue;
      }
      var base = key.replace(/[0-9]+$/, "");
      if (map[base]) {
        if (!seen[base]) { seen[base] = 1; found.push(map[base]); }
      }
    }
    if (!found.length) return "";
    var html = "<div class='sigla-legend'><span class='sigla-legend-t'>Siglas:</span>";
    for (var k = 0; k < found.length; k++) {
      html += "<span class='sigla-chip'><b>" + esc(found[k].sigla) + "</b> " +
        esc(found[k].en) + (found[k].es && found[k].es !== found[k].en ? " · " + esc(found[k].es) : "") + "</span>";
    }
    return html + "</div>";
  }

  function findExam(id) {
    for (var k = 0; k < EXAMS.length; k++) if (EXAMS[k].id === id) return EXAMS[k];
    return null;
  }

  /* ---------------- side panel + timer ---------------- */
  function renderSideHome() {
    var html =
      "<div class='side-block'>" +
      "<div class='side-title'>¿Cómo funciona?</div>" +
      "<p>Elige un simulacro y responde dentro del tiempo como en el examen real (85 preguntas / 2 horas).</p>" +
      "</div>" +
      "<div class='side-block'>" +
      "<div class='side-title'>Aprobación</div>" +
      "<div class='big-num'>80%</div>" +
      "<p>El examen RBT se aprueba con un 80%.</p>" +
      "</div>";
    side.innerHTML = html;
  }

  function scoreSoFar() {
    var n = Math.min(quiz.i, quiz.exam.questions.length);
    var correct = 0;
    for (var i = 0; i < n; i++) if (quiz.picks[i] === quiz.exam.questions[i].ans) correct++;
    return { done: n, correct: correct, wrong: n - correct };
  }

  function renderSideQuiz() {
    var sc = scoreSoFar();
    var total = quiz.exam.questions.length;
    var projected = total ? Math.round((sc.correct / total) * 100) : 0;
    var remaining = remainingMs();
    var pctW = Math.round((sc.done / total) * 100);

    var html =
      "<div class='side-block'>" +
      "<div class='side-title'>Tiempo restante</div>" +
      "<div class='timer" + (quiz.paused ? " paused" : "") + "' id='timer'>" + fmtTime(remaining) + "</div>" +
      (quiz.paused ? "<div class='pause-badge'>⏸ EN PAUSA</div>" : "") +
      "<div class='side-sub'>" + fmtTime(quiz.totalMs) + " en total al ritmo real</div>" +
      "</div>" +
      "<div class='side-block'>" +
      "<div class='side-title'>Marcador</div>" +
      "<ul class='score-list'>" +
      "<li>Aciertos <strong class='g'>" + sc.correct + "</strong></li>" +
      "<li>Errores <strong class='r'>" + sc.wrong + "</strong></li>" +
      "<li>Respondidas <strong>" + sc.done + "/" + total + "</strong></li>" +
      "</ul>" +
      "<div class='mini-track'><span style='width:" + pctW + "%'></span></div>" +
      "</div>" +
      "<div class='side-block'>" +
      "<div class='side-title'>Proyección de puntaje</div>" +
      "<div class='big-num " + (projected >= PASS ? "g" : "r") + "'>" + projected + "%</div>" +
      (projected >= PASS
        ? "<p class='side-sub'>En ritmo para aprobar ✓</p>"
        : "<p class='side-sub'>Necesitas superar el 80%</p>") +
      "</div>" +
      "<div class='side-block'>" +
      "<div class='side-title'>Preguntas</div>" +
      "<div class='qmap' id='qmap'></div>" +
      "</div>";
    side.innerHTML = html;
    renderQMap();
  }

  function renderQMap() {
    var el = document.getElementById("qmap");
    if (!el) return;
    var html = "";
    for (var i = 0; i < quiz.exam.questions.length; i++) {
      var cls = "qm";
      if (i === quiz.i) cls += " cur";
      else if (quiz.picks[i] === quiz.exam.questions[i].ans) cls += " ok";
      else if (quiz.picks[i] !== -1) cls += " bad";
      html += "<span class='" + cls + "'>" + (i + 1) + "</span>";
    }
    el.innerHTML = html;
  }

  function startTimer(totalMs) {
    quiz.totalMs = totalMs;
    quiz.timeUp = false;
    quiz.paused = false;
    quiz.elapsed = 0;
    quiz._lastTick = Date.now();
    if (quiz.timerId) clearInterval(quiz.timerId);
    quiz.timerId = setInterval(tick, 500);
  }

  function stopTimer() {
    if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
  }

  function remainingMs() {
    if (quiz.paused) return quiz.totalMs - quiz.elapsed;
    var now = Date.now();
    if (quiz._lastTick) quiz.elapsed += now - quiz._lastTick;
    quiz._lastTick = now;
    return quiz.totalMs - quiz.elapsed;
  }

  function togglePause() {
    remainingMs();
    quiz.paused = !quiz.paused;
    var btn = document.getElementById("pauseBtn");
    if (btn) btn.textContent = quiz.paused ? "▶ Reanudar" : "⏸ Pausa";
    var overlay = document.getElementById("pauseOverlay");
    if (overlay) overlay.classList.toggle("hidden", !quiz.paused);
    renderSideQuiz();
  }

  function tick() {
    var remaining = remainingMs();
    var tEl = document.getElementById("timer");
    if (tEl) tEl.textContent = fmtTime(remaining);
    if (remaining <= 0 && !quiz.timeUp) {
      quiz.timeUp = true;
      stopTimer();
      finishQuiz();
      return;
    }
  }

  /* ---------------- home ---------------- */
  function renderHome() {
    var html = [];
    html.push("<div class='hero'>" +
      "<p class='eyebrow'>Bienvenidos</p>" +
      "<h2 class='page-title'>Practica para el examen RBT</h2>" +
      "<p>El examen RBT original se aprueba con un 80%. Resuelve cada simulacro, revisa tus errores y lleva un registro de tus puntuaciones.</p>" +
      "</div>");

    html.push("<div class='exam-grid'>");
    for (var k = 0; k < EXAMS.length; k++) {
      var ex = EXAMS[k];
      var rec = store.exam(ex.id);
      var best = rec && rec.best >= 0 ? rec.best + "%" : "—";
      var tries = rec ? rec.tries : 0;
      html.push(
        "<div class='exam-card'>" +
        "<h3>" + esc(ex.title) + "</h3>" +
        "<p class='meta'>" + ex.count + " preguntas · Aprobación 80%</p>" +
        "<p class='score-line'>Mejor puntuación: <strong>" + best + "</strong> · Intentos: " + tries + "</p>" +
        "<div class='btn-row'>" +
        "<button class='btn btn-primary' data-action='quiz' data-id='" + ex.id + "'>Practicar</button>" +
        "<button class='btn btn-secondary' data-action='study' data-id='" + ex.id + "'>Estudiar</button>" +
        "</div>" +
        "</div>"
      );
    }
    html.push("</div>");

    html.push(
      "<div class='card'>" +
      "<p class='eyebrow'>Recursos</p>" +
      "<h3>Siglas y abreviaturas</h3>" +
      "<p class='page-sub'>El significado de las "+SIGLAS.length+" siglas del examen RBT, como RBT, DTT, SD, DRO, FR, etc.</p>" +
      "<button class='btn btn-ghost' data-action='siglas'>Ver las siglas</button>" +
      "</div>"
    );

    html.push(
      "<div class='card'>" +
      "<p class='eyebrow'>Recursos</p>" +
      "<h3>Tarjetas de repaso</h3>" +
      "<p class='page-sub'>Conceptos clave de ABA en formato de flashcards (término → definición, en inglés). "+CARDS.length+" tarjetas para repasar a tu ritmo.</p>" +
      "<button class='btn btn-ghost' data-action='cards'>Repasar tarjetas</button>" +
      "</div>"
    );

    html.push(
      "<div class='card'>" +
      "<p class='eyebrow'>Recursos</p>" +
      "<h3>Guía de estudio</h3>" +
      "<p class='page-sub'>Repaso de los conceptos clave del examen RBT (en inglés, como el examen real) junto con los videos de práctica.</p>" +
      "<button class='btn btn-ghost' data-action='guide'>Abrir la guía</button>" +
      "</div>"
    );

    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- quiz ---------------- */
  function startQuiz(id) {
    var ex = findExam(id);
    if (!ex) { renderHome(); return; }
    stopTimer();
    quiz.exam = ex;
    quiz.i = 0;
    quiz.lock = false;
    quiz.picked = -1;
    quiz.picks = new Array(ex.questions.length).fill(-1);
    startTimer(examTimeMillis(ex.questions.length));
    renderQuiz();
    renderSideQuiz();
  }

  function quizHTML(ex, q, i, total) {
    var html = [];
    html.push("<div class='quiz-top'>" +
      "<div class='quiz-top-left'>" +
      "<button class='btn btn-ghost' data-action='quit'>Salir</button>" +
      "<button class='btn btn-secondary' id='pauseBtn' data-action='pause'>⏸ Pausa</button>" +
      "</div>" +
      "<span class='count'>Pregunta " + (i + 1) + " de " + total + "</span>" +
      "</div>");

    var pct = Math.round(((i) / total) * 100);
    html.push("<div class='progress-track'><div class='progress-fill' style='width:" + pct + "%'></div></div>");

    html.push("<div class='card'>");
    html.push("<p class='question-text'>" + (i + 1) + ". " + esc(q.q) + "</p>");

    for (var j = 0; j < q.opts.length; j++) {
      var cls = "option";
      var disabled = "";
      if (quiz.lock) {
        disabled = "disabled";
        if (j === q.ans) cls += " correct";
        else if (j === quiz.picked) cls += " wrong";
        else cls += " dim";
      }
      html.push(
        "<button class='" + cls + "' data-opt='" + j + "' " + disabled + ">" +
        "<span class='letter'>" + LETTERS[j] + "</span>" +
        "<span class='opt-text'>" + esc(q.opts[j]) + "</span>" +
        "</button>"
      );
    }

    if (quiz.lock) {
      var ok = quiz.picked === q.ans;
      var expl = q.ex ? "<span class='ex'>" + esc(q.ex) + "</span>" : "";
      html.push(
        "<div class='feedback-box " + (ok ? "ok" : "no") + " show'>" +
        (ok
          ? "<b>¡Correcto!</b> " + expl
          : "<b>Incorrecto.</b> La respuesta correcta es: " + LETTERS[q.ans] + ") " + esc(q.opts[q.ans]) + expl) +
        "</div>"
      );
      var isLast = i === total - 1;
      html.push(
        "<div class='quiz-actions'>" +
        "<span style='color:var(--muted);font-size:13px'>" + esc(ex.title) + "</span>" +
        "<button class='btn btn-primary' data-action='" + (isLast ? "finish" : "next") + "'>" +
        (isLast ? "Ver resultados" : "Siguiente →") + "</button>" +
        "</div>"
      );
    }

    html.push("</div>");
    html.push("<div class='pause-overlay hidden' id='pauseOverlay'>" +
      "<div class='pause-card'>" +
      "<div class='pause-title'>⏸ Examen en pausa</div>" +
      "<p>El reloj está detenido. Tómate tu momento y reanuda cuando estés listo.</p>" +
      "<button class='btn btn-primary' data-action='resume'>▶ Reanudar examen</button>" +
      "</div></div>");
    return html.join("");
  }

  function renderQuiz() {
    var ex = quiz.exam;
    var total = ex.questions.length;
    if (quiz.i >= total) { finishQuiz(); return; }
    var q = ex.questions[quiz.i];
    view.innerHTML = quizHTML(ex, q, quiz.i, total);
    if (quiz.timerId) renderSideQuiz();
  }

  function pickOption(j) {
    if (quiz.lock || quiz.paused) return;
    quiz.picked = j;
    quiz.lock = true;
    quiz.picks[quiz.i] = j;
    renderQuiz();
  }

  function nextQuestion() {
    if (quiz.paused) return;
    quiz.i += 1;
    quiz.lock = false;
    quiz.picked = -1;
    renderQuiz();
    if (quiz.timerId) renderSideQuiz();
  }

  function finishQuiz() {
    stopTimer();
    var ex = quiz.exam;
    var total = ex.questions.length;
    var correct = 0;
    var wrong = [];
    for (var i = 0; i < total; i++) {
      var q = ex.questions[i];
      if (quiz.picks[i] === q.ans) correct++;
      else wrong.push({ q: q, picked: quiz.picks[i], n: i + 1 });
    }
    var pct = Math.round((correct / total) * 100);
    store.record(ex.id, pct);
    renderResults(ex, correct, total, pct, wrong);
  }

  /* ---------------- results ---------------- */
  function renderResults(ex, correct, total, pct, wrong) {
    var pass = pct >= PASS;
    var html = [];
    html.push(
      "<div class='result-banner " + (pass ? "pass" : "fail") + "'>" +
      "<p class='eyebrow'>" + esc(ex.title) + "</p>" +
      "<div class='big'>" + pct + "%</div>" +
      "<div class='verdict'>" + (pass ? "¡Aprobado!" : "Sigue practicando") + "</div>" +
      "<p class='sub'>" + correct + " de " + total + " preguntas correctas" +
      (pass ? "" : " · Necesitas al menos " + PASS + "%") + "</p>" +
      "<div class='pass-bar'><span></span></div>" +
      "<p class='pass-note'>Línea de aprobación: " + PASS + "%</p>" +
      "</div>"
    );

    html.push(
      "<div class='card'>" +
      "<ul class='summary-list'>" +
      "<li><span>Aciertos</span><span class='num good'>" + correct + "</span></li>" +
      "<li><span>Errores</span><span class='num bad'>" + (total - correct) + "</span></li>" +
      "<li><span>Total preguntas</span><span class='num'>" + total + "</span></li>" +
      "</ul>" +
      "</div>"
    );

    html.push("<div class='btn-row'>");
    if (wrong.length) {
      html.push("<button class='btn btn-secondary' data-action='review' data-id='" + ex.id + "'>Revisar errores (" + wrong.length + ")</button>");
    }
    html.push("<button class='btn btn-primary' data-action='quiz' data-id='" + ex.id + "'>Intentar de nuevo</button>");
    html.push("<button class='btn btn-ghost' data-action='home'>Inicio</button>");
    html.push("</div>");

    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- review ---------------- */
  function renderReview(ex) {
    var html = ["<div class='quiz-top'>",
      "<button class='btn btn-ghost' data-action='home'>Inicio</button>",
      "<span class='count'>Errores de " + esc(ex.title) + "</span></div>"];
    html.push("<h2 class='page-title'>Revisión de errores</h2>");
    html.push("<p class='page-sub'>Preguntas que fallaste en tu último intento.</p>");

    var items = 0;
    for (var i = 0; i < ex.questions.length; i++) {
      var q = ex.questions[i];
      if (quiz.picks[i] === q.ans) continue;
      items++;
      html.push("<div class='review-item'>" +
        "<p class='rq'>" + (i + 1) + ". " + esc(q.q) + "</p>");
      for (var j = 0; j < q.opts.length; j++) {
        var cls = "opt";
        var tag = "";
        if (j === q.ans) { cls += " correct"; tag = "<span class='tag ok'>respuesta correcta</span>"; }
        else if (j === quiz.picks[i]) { cls += " wrongpick"; tag = "<span class='tag no'>tu respuesta</span>"; }
        html.push("<div class='" + cls + "'>" + LETTERS[j] + ") " + esc(q.opts[j]) + tag + "</div>");
      }
      if (q.ex) html.push("<div class='opt-explain'>💡 " + esc(q.ex) + "</div>");
      html.push("</div>");
    }
    if (!items) html.push("<p class='page-sub'>No tienes errores que revisar. ¡Excelente trabajo!</p>");
    html.push("<div class='btn-row'><button class='btn btn-primary' data-action='quiz' data-id='" + ex.id + "'>Intentar de nuevo</button></div>");

    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- study ---------------- */
  var study = { exam: null, i: 0, revealed: false };

  function startStudy(id) {
    var ex = findExam(id);
    if (!ex) { renderHome(); return; }
    study.exam = ex;
    study.i = 0;
    study.revealed = false;
    renderStudy();
  }

  function renderStudy() {
    var ex = study.exam;
    var total = ex.questions.length;
    var q = ex.questions[study.i];
    var tr = getTrans(ex, study.i);
    var html = [];
    html.push("<div class='quiz-top'>" +
      "<button class='btn btn-ghost' data-action='home'>Inicio</button>" +
      "<span class='count'>Estudio · Pregunta " + (study.i + 1) + " de " + total + "</span></div>");
    html.push("<div class='progress-track'><div class='progress-fill' style='width:" + Math.round((study.i / total) * 100) + "%'></div></div>");

    html.push("<div class='study-split'>");

    /* columna izquierda: pregunta oficial en ingles */
    html.push("<div class='study-col study-col-en'>");
    html.push("<div class='col-head'>Pregunta oficial (inglés, como el examen)</div>");
    html.push("<p class='question-text'>" + (study.i + 1) + ". " + annotate(q.q) + "</p>");
    for (var j = 0; j < q.opts.length; j++) {
      var cls = "option" + (study.revealed && j === q.ans ? " correct" : "") + (study.revealed ? " dim" : "");
      if (study.revealed && j === q.ans) cls = cls.replace(" dim", "");
      html.push("<div class='" + cls + "'><span class='letter'>" + LETTERS[j] + "</span>" +
        "<span class='opt-text'>" + annotate(q.opts[j]) + "</span></div>");
    }
    html.push(siglaLegend(q.q));
    html.push("</div>");

    /* columna derecha: traduccion al espanol */
    html.push("<div class='study-col study-col-es'>");
    html.push("<div class='col-head'>Traducción al español</div>");
    if (tr) {
      html.push("<div class='translation'>");
      html.push("<p class='question-text'>" + (study.i + 1) + ". " + annotate(tr.q) + "</p>");
      html.push("<ul class='trans-opts'>");
      for (var tj = 0; tj < tr.opts.length && tj < q.opts.length; tj++) {
        html.push("<li><span class='letter'>" + LETTERS[tj] + "</span>" + annotate(tr.opts[tj]) + "</li>");
      }
      html.push("</ul>");
      html.push(siglaLegend(tr.q));
      html.push("</div>");
    } else {
      html.push("<div class='translation'><b>Traducción no disponible para esta pregunta.</b></div>");
    }
    html.push("</div>");

    html.push("</div>"); /* cierra study-split */

    if (study.revealed) {
      var sexp = q.ex ? "<span class='ex'>" + esc(q.ex) + "</span>" : "";
      html.push("<div class='feedback-box ok show'><b>Respuesta correcta:</b> " + LETTERS[q.ans] + ") " + esc(q.opts[q.ans]) + sexp + "</div>");
    }
    html.push("<div class='study-nav'>" +
      "<button class='btn btn-ghost' data-action='sprev' " + (study.i === 0 ? "disabled" : "") + ">← Anterior</button>" +
      (study.revealed
        ? "<button class='btn btn-secondary' data-action='snext'>Siguiente →</button>"
        : "<button class='btn btn-primary' data-action='sreveal'>Revelar respuesta</button>") +
      "</div>");

    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- cards ---------------- */
  var cards = { i: 0, flipped: false, order: [] };

  function shuffle(arr) {
    var a = arr.slice();
    for (var k = a.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1));
      var tmp = a[k]; a[k] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startCards() {
    cards.order = shuffle(CARDS.map(function (_, idx) { return idx; }));
    cards.i = 0;
    cards.flipped = false;
    renderCards();
  }

  function renderCards() {
    if (!CARDS.length) { renderHome(); return; }
    var total = cards.order.length;
    var idx = cards.order[cards.i];
    var c = CARDS[idx];
    var html = [];
    html.push("<div class='quiz-top'>" +
      "<button class='btn btn-ghost' data-action='home'>Inicio</button>" +
      "<span class='count'>Tarjetas · " + (cards.i + 1) + " de " + total + "</span></div>");
    html.push("<div class='progress-track'><div class='progress-fill' style='width:" + Math.round((cards.i / total) * 100) + "%'></div></div>");

    html.push("<div class='card cards-zone'>");
    html.push("<p class='card-badge'>Término (toca para voltear)</p>");
    html.push("<div class='flashcard" + (cards.flipped ? " flipped" : "") + "' id='flashcard' data-action='flip'>" +
      "<div class='flash-inner'>" +
      "<div class='flash-face flash-front'>" +
      "<span class='flash-label'>Término</span>" +
      "<span class='flash-main'>" + esc(c.concept) + "</span>" +
      "</div>" +
      "<div class='flash-face flash-back'>" +
      "<span class='flash-label'>Definición / Respuesta</span>" +
      "<span class='flash-main'>" + esc(c.definition) + "</span>" +
      "</div>" +
      "</div></div>");

    html.push("<div class='flash-nav'>" +
      "<button class='btn btn-ghost' data-action='cprev' " + (cards.i === 0 ? "disabled" : "") + ">← Anterior</button>" +
      "<span class='flash-hint'>" + (cards.flipped ? "Definición visible" : "Toca la tarjeta para voltear") + "</span>" +
      "<button class='btn btn-primary' data-action='cnext'>Siguiente →</button>" +
      "</div></div>");
    view.innerHTML = html.join("");
    renderSideCards(total);
  }

  function renderSideCards(total) {
    side.innerHTML =
      "<div class='side-block'>" +
      "<div class='side-title'>Modo repaso</div>" +
      "<p>Tarjetas de conceptos <b>ABA / RBT</b> en inglés, como el examen. Voltea cada tarjeta para ver la definición y repasa a tu ritmo.</p>" +
      "</div>" +
      "<div class='side-block'>" +
      "<div class='side-title'>Progreso</div>" +
      "<div class='big-num'>" + cards.i + "/" + total + "</div>" +
      "<p class='side-sub'>" + "Faltan " + (total - cards.i) + " tarjetas por repasar.</p>" +
      "</div>";
  }

  /* ---------------- siglas ---------------- */
  function renderSiglas() {
    var html = [];
    html.push("<h2 class='page-title'>Siglas y abreviaturas</h2>");
    html.push("<p class='page-sub'>El significado de las siglas usadas en el examen, con su nombre en español (e inglés).</p>");
    html.push("<div class='siglas-list'>");
    for (var k = 0; k < SIGLAS.length; k++) {
      var s = SIGLAS[k];
      html.push(
        "<div class='sigla-item'>" +
        "<div class='sigla-code'>" + esc(s.sigla) + "</div>" +
        "<div class='sigla-text'>" +
        "<div class='sigla-es'>" + esc(s.es) + "</div>" +
        "<div class='sigla-en'>" + esc(s.en || "") + "</div>" +
        "</div></div>"
      );
    }
    html.push("</div>");
    html.push(
      "<div class='card'>" +
      "<p class='eyebrow'>Recursos</p>" +
      "<h3>¿Te sirve este glosario?</h3>" +
      "<p class='page-sub'>Usa esta sección junto con el modo Tarjetas y la Guía para dominar los términos del examen.</p>" +
      "<button class='btn btn-ghost' data-action='cards'>Repasar tarjetas</button>" +
      "</div>"
    );
    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- guide ---------------- */
  function renderGuide() {
    var html = [];
    html.push("<h2 class='page-title'>Guía de estudio RBT</h2>");
    html.push("<p class='page-sub'>Resumen de los temas del examen (contenido original en inglés, como el examen oficial).</p>");
    html.push("<div class='guide-note'>Tip: usa esta guía junto con los videos de práctica de la fuente original para repasar cada área de la Task List del RBT.</div>");
    html.push("<div class='guide-box'>" + esc(GUIDE) + "</div>");
    view.innerHTML = html.join("");
    renderSideHome();
  }

  /* ---------------- events ---------------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var actionEl = t.closest ? t.closest("[data-action]") : null;
    if (!actionEl) return;
    var action = actionEl.getAttribute("data-action");
    var id = actionEl.getAttribute("data-id");

    if (action === "home") renderHome();
    else if (action === "cards") startCards();
    else if (action === "siglas") renderSiglas();
    else if (action === "flip") { cards.flipped = !cards.flipped; renderCards(); }
    else if (action === "cprev" && cards.i > 0) { cards.i--; cards.flipped = false; renderCards(); }
    else if (action === "cnext") { if (cards.i < cards.order.length - 1) cards.i++; else { cards.flipped = true; } cards.flipped = false; renderCards(); }
    else if (action === "guide") renderGuide();
    else if (action === "pause") togglePause();
    else if (action === "resume") togglePause();
    else if (action === "quiz") startQuiz(id);
    else if (action === "study") startStudy(id);
    else if (action === "quit") renderHome();
    else if (action === "next") nextQuestion();
    else if (action === "finish") finishQuiz();
    else if (action === "review") renderReview(quiz.exam);
    else if (action === "sprev" && study.i > 0) { study.i--; study.revealed = false; renderStudy(); }
    else if (action === "snext") { study.i++; study.revealed = false; renderStudy(); }
    else if (action === "sreveal") { study.revealed = true; renderStudy(); }
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-opt]") : null;
    if (!t || quiz.lock) return;
    pickOption(parseInt(t.getAttribute("data-opt"), 10));
  });

  var navBtns = document.querySelectorAll(".nav-btn");
  for (var n = 0; n < navBtns.length; n++) {
    navBtns[n].addEventListener("click", function () {
      var target = this.getAttribute("data-nav");
      setNav(target);
      if (target === "home") renderHome();
      else if (target === "cards") startCards();
      else if (target === "siglas") renderSiglas();
      else if (target === "guide") renderGuide();
    });
  }

  function setNav(target) {
    for (var n = 0; n < navBtns.length; n++) {
      navBtns[n].classList.toggle("is-active", navBtns[n].getAttribute("data-nav") === target);
    }
  }

  renderHome();
})();