"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { hero } from "@/content/site";

/**
 * The hero's field: a heads-up display the size of the window.
 *
 * There is no photograph and no card. An earlier version put a 4:5 plate in the
 * middle of the screen with a diagram inside it; it read as an image
 * placeholder and left the rest of the viewport doing nothing. Here the window
 * itself is the instrument — a ring assembly turning behind the name, a radar
 * sweep, scan lines, and a reticle that locks to the pointer.
 *
 * Four things are drawn, all of them edge to edge:
 *
 * - The grid. Two CSS gradient pairs — a 40px minor and a 200px major — masked
 *   to an ellipse so it never meets the window edge. CSS rather than SVG
 *   because a gradient grid is resolution-independent and costs no nodes.
 * - The reactor: concentric rings on a 400×400 field, counter-rotating, with a
 *   tick scale, four arc segments and a radar wedge. It is sized in
 *   `min(94vw, 88svh)` so it fills a wide window by width and a short one by
 *   height rather than overflowing either.
 * - Scan lines, drifting slowly downward. Two pixels of period at 3% opacity —
 *   enough to read as a screen, not enough to fight the type.
 * - The reticle: hairlines the width and height of the window, a lock ring, and
 *   the live coordinate in mono.
 *
 * The reticle reads raw `clientX/Y`, so this component must not sit inside a
 * transformed ancestor — a scaled parent would slide the lines off the real
 * cursor by a few percent at the edges, which is exactly the kind of miss the
 * eye catches. Hero keeps it in its own untransformed layer for that reason.
 *
 * Pointer state lives in motion values, never in React state: a `pointermove`
 * that re-rendered the hero on every frame would be the most expensive thing on
 * the page. Everything else animates `transform` or `opacity` only.
 *
 * Under `prefers-reduced-motion` the grid and rings stay and everything that
 * moves is dropped, including the pointer listener.
 *
 * The same switch is thrown once the hero scrolls away. Nothing here stops on
 * its own: the coils, the tick ring and the core all repeat forever, and
 * `strokeOpacity` on ten SVG paths is a repaint of the whole instrument on
 * every frame. Fading the layer out does not stop any of it — an element at
 * `opacity: 0` still animates — so a visitor reading the contact section at the
 * bottom of the page was paying for a reactor turning two screens above them.
 */
export default function Hud() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const onScreen = useInView(root);
  const still = Boolean(reduced) || !onScreen;

  /** Raw pointer position, in viewport pixels. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  /** 0 until the pointer has been seen, so nothing sits at 0,0 on load. */
  const seen = useMotionValue(0);
  /** Field parallax, in pixels, driven by pointer position across the window. */
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  const lock = { stiffness: 380, damping: 38, mass: 0.35 };
  const x = useSpring(px, lock);
  const y = useSpring(py, lock);
  const gx = useSpring(driftX, { stiffness: 55, damping: 20, mass: 0.9 });
  const gy = useSpring(driftY, { stiffness: 55, damping: 20, mass: 0.9 });
  const shown = useSpring(seen, { stiffness: 140, damping: 26 });

  const readX = useTransform(x, coordinate);
  const readY = useTransform(y, coordinate);

  useEffect(() => {
    if (still) return;

    function onMove(event: PointerEvent) {
      // Mouse only. On a phone the "pointer" is a scroll gesture, and a reticle
      // chasing a finger reads as the page fighting the scroll.
      if (event.pointerType !== "mouse") return;
      px.set(event.clientX);
      py.set(event.clientY);
      driftX.set((event.clientX / window.innerWidth - 0.5) * 26);
      driftY.set((event.clientY / window.innerHeight - 0.5) * 18);
      seen.set(1);
    }

    function onLeave() {
      seen.set(0);
      driftX.set(0);
      driftY.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [still, px, py, driftX, driftY, seen]);

  return (
    <div ref={root} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* ---------- Field ----------
          Oversized so the parallax never exposes an edge. */}
      <motion.div className="hud-grid absolute -inset-16" style={still ? undefined : { x: gx, y: gy }} />

      {/* ---------- Reactor ---------- */}
      <motion.div className="absolute inset-0" style={still ? undefined : { x: gx, y: gy }}>
        <div className="absolute left-1/2 top-1/2 size-[min(94vw,88svh)] -translate-x-1/2 -translate-y-1/2">
          <Reactor still={still} />
        </div>
      </motion.div>

      {/* ---------- Scan lines ---------- */}
      <motion.div
        className="hud-scan absolute -inset-y-8 inset-x-0"
        animate={still ? undefined : { y: [0, 8] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      {/* ---------- Reticle ---------- */}
      {!still && (
        <>
          <motion.div className="absolute inset-y-0 left-0 w-px bg-cyan/10" style={{ x, opacity: shown }} />
          <motion.div className="absolute inset-x-0 top-0 h-px bg-cyan/10" style={{ y, opacity: shown }} />
          <motion.div className="absolute left-0 top-0" style={{ x, y, opacity: shown }}>
            {/* One ring, not two. A lock ring turning inside a counter-turning
                bracket was two competing rotations under the cursor. */}
            <span className="absolute -translate-x-1/2 -translate-y-1/2">
              <motion.span
                className="hud-bracket block size-9"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </span>
            {/* Each readout is its own element with the motion value as its only
                child — the form framer-motion renders without a React
                re-render, which keeps the digits off the render path. */}
            <span className="mono absolute left-7 top-4 flex gap-1 whitespace-nowrap text-[10px] tracking-[0.18em] text-cyan/40">
              <motion.span>{readX}</motion.span>
              <span className="text-cyan/25">/</span>
              <motion.span>{readY}</motion.span>
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
}

/* -----------------------------------------------------------------------------
   REACTOR
   The chest-piece arc reactor, drawn on a 400×400 field: an outer housing with
   a tick scale, a ring of ten trapezoidal coils, an inner housing, and the
   triangular core inside it. That triangle is the whole point of the
   silhouette — Stark's Mark II reads as a triangle in a circle from across a
   room, and without it a ring assembly is just orbits.

   Sizes are chosen against the type, not for their own sake. The triangle's
   vertices sit at r=118, which puts its apex clear above the name while its
   base runs behind it, so the shape is legible without competing with the H1.

   Everything is centred on 200,200. The moving parts rotate and fade as HTML
   layers stacked over that field rather than as groups inside it — see the note
   on the Reactor component below.

   Motion is deliberately thin: the housing scale turns once every four minutes,
   the coils energise in sequence, the core breathes. Nothing else moves. An
   earlier pass had a radar sweep and three counter-rotating rings and the hero
   read as busy rather than powered.
   -------------------------------------------------------------------------- */

const CENTER = 200;
const CYAN = "#22D3EE";

/** Degrees, clockwise from twelve o'clock, to a point on a circle. */
function point(radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(radians), CENTER + radius * Math.sin(radians)] as const;
}

const TICKS = Array.from({ length: 72 }, (_, i) => i);

/** Ten coils, the count on the Mark II housing. */
const COILS = Array.from({ length: 10 }, (_, i) => i);
const COIL_INNER = 146;
const COIL_OUTER = 180;
/** 36° per coil, 8° of it spent on the gap between them. */
const COIL_SPAN = 28;

/**
 * One coil: out along a radius, around the outer arc, back down, and home
 * around the inner arc. Drawn at twelve o'clock and rotated into place.
 */
function coil(index: number) {
  const from = index * 36 - COIL_SPAN / 2;
  const to = index * 36 + COIL_SPAN / 2;
  const [ix1, iy1] = point(COIL_INNER, from);
  const [ox1, oy1] = point(COIL_OUTER, from);
  const [ox2, oy2] = point(COIL_OUTER, to);
  const [ix2, iy2] = point(COIL_INNER, to);
  return [
    `M ${ix1.toFixed(2)} ${iy1.toFixed(2)}`,
    `L ${ox1.toFixed(2)} ${oy1.toFixed(2)}`,
    `A ${COIL_OUTER} ${COIL_OUTER} 0 0 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)}`,
    `L ${ix2.toFixed(2)} ${iy2.toFixed(2)}`,
    `A ${COIL_INNER} ${COIL_INNER} 0 0 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/** The core triangle, point up. */
const TRIANGLE = [0, 120, 240]
  .map((deg) => point(118, deg))
  .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
  .join(" ");

/**
 * The core glow, as a CSS gradient rather than an SVG `<radialGradient>`. Same
 * three stops, same geometry — `closest-side` on a square box is the r="50%"
 * the SVG version used. It is kept well under the brightness it would have on
 * its own: it sits directly behind the H1, and a hot white centre here eats the
 * counters of the type in front of it.
 */
const CORE_GLOW = [
  "radial-gradient(circle closest-side",
  "rgb(255 255 255 / 0.26) 0%",
  `rgb(34 211 238 / 0.14) 35%`,
  `rgb(34 211 238 / 0) 100%)`,
].join(", ");

/**
 * The instrument, drawn as four stacked layers rather than one SVG.
 *
 * The split is entirely about paint. SVG transforms and SVG opacity are not
 * composited — animating either one repaints the whole `<svg>`, every node of
 * it, on every frame. As one element this meant a ~900px surface being
 * re-rasterised sixty times a second, permanently, to advance a tick ring by
 * 0.025° and breathe a glow. Both of those now live on HTML layers the
 * compositor can transform and fade for free, and the two static layers are
 * rasterised once and never touched again.
 *
 * The layer order reproduces the old paint order exactly: halo and housing,
 * then the tick scale, then the coils and the core triangle, then the glow.
 * The ticks and the coils overlap by four units, so that ordering matters.
 *
 * What is left in SVG is the coil pulse, which has to be there — it is
 * `stroke-opacity` on ten separate paths. It runs as one CSS keyframe with a
 * per-coil delay instead of ten JavaScript animations writing styles each
 * frame, and it stops entirely when `still`.
 */
function Reactor({ still }: { still: boolean }) {
  return (
    <div className="relative size-full">
      {/* ---------- 1. Halo and housing. Static. ---------- */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id="hud-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={CYAN} stopOpacity={0.1} />
            <stop offset="60%" stopColor={CYAN} stopOpacity={0.03} />
            <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Without the halo the assembly reads as a flat wireframe. */}
        <circle cx={CENTER} cy={CENTER} r={182} fill="url(#hud-halo)" />
        <circle cx={CENTER} cy={CENTER} r={192} fill="none" stroke="#fff" strokeOpacity={0.06} />
        <circle cx={CENTER} cy={CENTER} r={186} fill="none" stroke={CYAN} strokeOpacity={0.12} />
      </svg>

      {/* ---------- 2. Tick scale, turning once every four minutes ---------- */}
      <div className={`absolute inset-0 ${still ? "" : "animate-reactor-spin"}`}>
        <svg viewBox="0 0 400 400" className="size-full overflow-visible">
          {TICKS.map((i) => {
            const major = i % 6 === 0;
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER - 186}
                x2={CENTER}
                y2={CENTER - (major ? 176 : 181)}
                stroke="#fff"
                strokeOpacity={major ? 0.2 : 0.08}
                strokeWidth={major ? 1.1 : 0.7}
                transform={`rotate(${i * 5} ${CENTER} ${CENTER})`}
              />
            );
          })}
        </svg>
      </div>

      {/* ---------- 3. Coil ring, inner housing, core triangle ---------- */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
        {/* The coils energise one after another around the ring, which is the
            reactor's only real animation and the reason it reads as powered. */}
        {COILS.map((i) => (
          <path
            key={i}
            d={coil(i)}
            fill={CYAN}
            fillOpacity={0.05}
            stroke={CYAN}
            strokeWidth={1}
            strokeLinejoin="round"
            strokeOpacity={0.18}
            className={still ? undefined : "animate-reactor-coil"}
            style={still ? undefined : { animationDelay: `${(i * 0.18).toFixed(2)}s` }}
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={138} fill="none" stroke={CYAN} strokeOpacity={0.22} />
        <circle cx={CENTER} cy={CENTER} r={132} fill="none" stroke="#fff" strokeOpacity={0.06} />

        <polygon
          points={TRIANGLE}
          fill="none"
          stroke={CYAN}
          strokeOpacity={0.5}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <polygon points={TRIANGLE} fill={CYAN} fillOpacity={0.03} />
      </svg>

      {/* ---------- 4. Core glow, breathing ---------- */}
      <div
        style={{ background: CORE_GLOW }}
        className={`absolute left-1/2 top-1/2 size-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 ${
          still ? "" : "animate-reactor-core"
        }`}
      />
    </div>
  );
}

/** Pointer pixels as a four-digit instrument readout: 0342, not 342.4. */
function coordinate(value: number) {
  return String(Math.max(0, Math.round(value))).padStart(4, "0");
}

/* -----------------------------------------------------------------------------
   TELEMETRY
   The readout groups down both sides of the frame. Values are real — they come
   from `hero.hud.telemetry` in content/site.ts, which reads them off the
   profile — because a HUD full of invented numbers is a screensaver.

   There is no animated bar meter under them. There was, and it was the single
   noisiest thing on the page: sixteen bars waving on a loop in each margin,
   saying nothing. Two short columns of true values do the job quietly.
   -------------------------------------------------------------------------- */

export function Telemetry({ align = "left" }: { align?: "left" | "right" }) {
  const reduced = useReducedMotion();
  const right = align === "right";
  const items = right ? [...hero.hud.telemetry].reverse() : hero.hud.telemetry;

  return (
    <div
      aria-hidden="true"
      className={`flex flex-col gap-2 ${right ? "items-end text-right" : "items-start"}`}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className={`flex items-center gap-2 ${right ? "flex-row-reverse" : ""}`}
          initial={reduced ? false : { opacity: 0, x: right ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.9 + i * 0.09 }}
        >
          <span className="mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            {item.label}
          </span>
          <span className="h-px w-4 bg-cyan/20" />
          <span className="mono whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-cyan/50">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
