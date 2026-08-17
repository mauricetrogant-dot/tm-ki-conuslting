/*!
 * orb.js — Vanilla-Einbindung für thinking-orbs (TM KI Consulting UG (haftungsbeschränkt))
 *
 * Die Bibliothek von Jakub Antalik (MIT) liefert ihre Zeichenfunktionen als
 * reine Canvas-Maler aus: MODE_DRAWS[mode](ctx, size, t, dark, opts). Nur die
 * Hülle drumherum ist React. Diese Datei ersetzt genau diese Hülle — damit
 * laufen die Orbs auf unseren statischen Seiten ohne React, ohne Bundler und
 * ohne einen einzigen externen Request.
 *
 * Das Verhalten des Originals ist bewusst nachgebildet:
 *  - Pixeldichte auf 2 gedeckelt (sonst rechnet ein 4K-Display sinnlos mit)
 *  - Animation pausiert außerhalb des Sichtfelds und bei verstecktem Tab
 *  - prefers-reduced-motion: ein einziges Standbild, keine Animation
 */

import { MODE_DRAWS, resolvePreset } from "./thinking-orbs.mjs";

/** Die neun ausgelieferten Zustände. */
export const ORB_STATES = [
  "working", "searching", "solving", "listening", "connecting",
  "weaving", "composing", "breathing", "shaping"
];

/** Nur diese beiden Größen sind vom Autor abgestimmt — keine Zwischenwerte. */
const GROESSEN = [20, 64];

function reduzierteBewegung() {
  return typeof matchMedia === "function" &&
         matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hängt einen Orb in ein Element.
 *
 * @param {HTMLElement} ziel      Container; der Canvas wird hineingehängt.
 * @param {Object}      opt
 * @param {string}      opt.state   einer aus ORB_STATES, Standard "working"
 * @param {20|64}       opt.size    Standard 64
 * @param {boolean}     opt.dark    helle Punkte auf dunklem Grund, Standard true
 * @param {number}      opt.speed   Multiplikator, Standard 1
 * @param {string}      opt.label   Text für Screenreader
 * @returns {{setState:Function, pause:Function, resume:Function, destroy:Function}}
 */
export function mountOrb(ziel, opt) {
  if (!ziel) throw new Error("mountOrb: kein Zielelement übergeben.");
  const o = opt || {};
  let state = ORB_STATES.indexOf(o.state) >= 0 ? o.state : "working";
  const size  = GROESSEN.indexOf(o.size) >= 0 ? o.size : 64;
  const dark  = o.dark !== false;
  const tempo = typeof o.speed === "number" && isFinite(o.speed) ? o.speed : 1;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", o.label || ("KI-Agent: " + state));
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.style.display = "block";

  const dpr = Math.min(2, (typeof devicePixelRatio !== "undefined" && devicePixelRatio) || 1);
  canvas.width  = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  ziel.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return { setState(){}, pause(){}, resume(){}, destroy(){ canvas.remove(); } };

  let preset = resolvePreset(state, size);
  let raf = 0, laeuft = false, sichtbar = true, zerstoert = false;

  function zeichne(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    MODE_DRAWS[preset.mode](ctx, size, t, dark, preset.opts);
  }
  function schleife() {
    if (!laeuft) return;
    zeichne(performance.now() / 1000 * preset.speed * tempo);
    raf = requestAnimationFrame(schleife);
  }
  function start() {
    if (laeuft || zerstoert || reduzierteBewegung()) return;
    laeuft = true;
    raf = requestAnimationFrame(schleife);
  }
  function stopp() {
    laeuft = false;
    cancelAnimationFrame(raf);
  }

  /* Bei reduzierter Bewegung genau ein Standbild — derselbe Zeitpunkt wie im
     Original, damit das Bild nicht zufällig in einer hässlichen Phase steht. */
  if (reduzierteBewegung()) {
    zeichne(0.6);
  } else {
    zeichne(performance.now() / 1000 * preset.speed * tempo);
  }

  const io = typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(function (e) {
        sichtbar = e[0].isIntersecting;
        if (sichtbar && document.visibilityState !== "hidden") start(); else stopp();
      })
    : null;
  if (io) io.observe(canvas); else start();

  function beiSichtbarkeit() {
    if (document.visibilityState === "hidden") stopp();
    else if (sichtbar) start();
  }
  document.addEventListener("visibilitychange", beiSichtbarkeit);

  return {
    /** Wechselt den Zustand im laufenden Betrieb, z. B. suchend → antwortend. */
    setState(neu) {
      if (ORB_STATES.indexOf(neu) < 0 || neu === state) return;
      state = neu;
      preset = resolvePreset(state, size);
      canvas.setAttribute("aria-label", o.label || ("KI-Agent: " + state));
      if (reduzierteBewegung()) zeichne(0.6);
    },
    pause: stopp,
    resume: start,
    destroy() {
      zerstoert = true;
      stopp();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", beiSichtbarkeit);
      canvas.remove();
    }
  };
}

/**
 * Bequemer Weg für statische Seiten: alle Elemente mit data-orb im Dokument
 * bestücken. Beispiel:
 *   <span data-orb="searching" data-orb-size="20" data-orb-theme="dark"></span>
 */
export function autoMount(wurzel) {
  const r = wurzel || document;
  const liste = [];
  r.querySelectorAll("[data-orb]").forEach(function (el) {
    if (el.dataset.orbGesetzt === "1") return;
    el.dataset.orbGesetzt = "1";
    liste.push(mountOrb(el, {
      state: el.dataset.orb,
      size:  Number(el.dataset.orbSize) === 20 ? 20 : 64,
      dark:  el.dataset.orbTheme !== "light",
      speed: Number(el.dataset.orbSpeed) || 1,
      label: el.dataset.orbLabel
    }));
  });
  return liste;
}
