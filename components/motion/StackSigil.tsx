"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { hero } from "@/content/site";

/**
 * The hero centrepiece, in place of a photograph.
 *
 * Three isometric planes — interface, logic, data — threaded by a spine with a
 * pulse running down it. It is the claim the whole site makes, drawn rather than
 * written: one person, every layer. A headshot would have said nothing a visitor
 * couldn't get from LinkedIn.
 *
 * Everything is one inline SVG on a 400×500 field (the plate's 4:5), so it
 * scales to any plate size, costs no image bytes, and needs no font or asset to
 * have loaded before it is correct.
 *
 * Geometry notes, since the numbers look arbitrary:
 *
 * - Layers sit at y = 126 / 204 / 282 rather than centred, because the plate's
 *   lower 30% is under the gradient the hero name is set across. The lowest
 *   plane bottoms out at 325 and the readout sits at 346, both clear of it.
 * - Half-width is 80 and the labels are anchored at x = 394, which leaves ~88px
 *   for the longest of them ("INTERFACE") at 10px mono. The plate renders at
 *   roughly 0.83 scale on a laptop, so 10px here is ~8px on screen — anything
 *   smaller stops being readable, and anything wider pushes the label off the
 *   field. Both numbers move together.
 * - The orbit rings animate `stroke-dashoffset` rather than rotating. A rotating
 *   ellipse visibly wobbles; a travelling dash reads as particles in orbit and
 *   costs one animated property.
 *
 * Under `prefers-reduced-motion` every animation is dropped and the diagram
 * renders in its final state — it is information, not decoration, so it must not
 * depend on motion to be legible.
 */

const CENTER_X = 200;
const HALF_W = 80;
const HALF_H = 34;
/** Extruded depth under each plane's lower edges. */
const DEPTH = 9;
const LAYER_Y = [126, 204, 282];
/** Vertical centre of the composition — the orbits hang off it. */
const ORBIT_Y = 204;

/** The rhombus that reads as a plane in isometric projection. */
function plane(cy: number) {
  return `${CENTER_X},${cy - HALF_H} ${CENTER_X + HALF_W},${cy} ${CENTER_X},${cy + HALF_H} ${CENTER_X - HALF_W},${cy}`;
}

/** The slab side: down the left vertex, across the bottom, up the right. */
function slab(cy: number) {
  return [
    `M ${CENTER_X - HALF_W} ${cy}`,
    `L ${CENTER_X - HALF_W} ${cy + DEPTH}`,
    `L ${CENTER_X} ${cy + HALF_H + DEPTH}`,
    `L ${CENTER_X + HALF_W} ${cy + DEPTH}`,
    `L ${CENTER_X + HALF_W} ${cy}`,
    `L ${CENTER_X} ${cy + HALF_H}`,
    "Z",
  ].join(" ");
}

/** Three small planes inside each layer, to suggest structure rather than mass. */
const CELLS = [
  { dx: -30, dy: 0 },
  { dx: 8, dy: -11 },
  { dx: 20, dy: 11 },
];

function cell(cx: number, cy: number) {
  const w = 20;
  const h = 7.5;
  return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
}

export default function StackSigil() {
  const reduced = useReducedMotion();
  const layers = hero.sigil.layers;
  const still = Boolean(reduced);

  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 size-full"
      role="img"
      aria-label={`Diagram of a full stack: ${layers.map((l) => l.label).join(", ")}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {layers.map((layer, i) => (
          <linearGradient key={layer.label} id={`sigil-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={layer.color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={layer.color} stopOpacity={0.04} />
          </linearGradient>
        ))}

        {/* Fades the grid out toward the edges so it never meets the frame. */}
        {/* Mask luminance is multiplied by the stop's alpha, so 0.9 white here
            and 0.14 on the grid rect land at ~0.13 in the centre — a shade above
            the site's dot grid, which is what a lit panel should read as. */}
        <radialGradient id="sigil-grid-mask" cx="50%" cy="43%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <mask id="sigil-grid-fade">
          <rect width="400" height="500" fill="url(#sigil-grid-mask)" />
        </mask>

        <pattern id="sigil-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="#fff" strokeWidth="0.5" />
        </pattern>

        <filter id="sigil-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---------- Field ---------- */}
      <rect width="400" height="500" fill="url(#sigil-grid)" mask="url(#sigil-grid-fade)" opacity={0.14} />

      {/* ---------- Frame ticks ---------- */}
      <g stroke="#fff" strokeOpacity={0.22} strokeWidth={1} fill="none">
        {[
          "M18 40 V18 H40",
          "M360 18 H382 V40",
          "M382 460 V482 H360",
          "M40 482 H18 V460",
        ].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <text
        x="200"
        y="62"
        textAnchor="middle"
        fill="#fff"
        fillOpacity={0.32}
        fontSize="10"
        letterSpacing="3.5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {hero.sigil.heading.toUpperCase()}
      </text>

      {/* ---------- Orbits ----------
          Two counter-travelling dashed ellipses. They give the composition a
          horizon without adding another readable element. */}
      <g fill="none" stroke="#7B7BF5" strokeOpacity={0.35} strokeLinecap="round">
        <motion.ellipse
          cx="200"
          cy={ORBIT_Y}
          rx="168"
          ry="88"
          strokeWidth={1}
          strokeDasharray="2 12"
          initial={still ? undefined : { strokeDashoffset: 0 }}
          animate={still ? undefined : { strokeDashoffset: -280 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.ellipse
          cx="200"
          cy={ORBIT_Y}
          rx="140"
          ry="72"
          strokeWidth={1}
          strokeOpacity={0.5}
          strokeDasharray="2 16"
          initial={still ? undefined : { strokeDashoffset: 0 }}
          animate={still ? undefined : { strokeDashoffset: 240 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      </g>

      {/* ---------- Spine ---------- */}
      <line
        x1="200"
        y1={LAYER_Y[0]}
        x2="200"
        y2={LAYER_Y[2]}
        stroke="#fff"
        strokeOpacity={0.18}
        strokeWidth={1}
        strokeDasharray="3 5"
      />

      {/* ---------- Layers ---------- */}
      {layers.map((layer, i) => {
        const cy = LAYER_Y[i] ?? LAYER_Y[LAYER_Y.length - 1];

        return (
          <motion.g
            key={layer.label}
            initial={still ? undefined : { opacity: 0, y: -26 }}
            animate={still ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.35 + i * 0.16 }}
          >
            {/* Float, phase-offset per layer so the stack breathes rather than
                sliding as one slab. */}
            <motion.g
              animate={still ? undefined : { y: [0, -4.5, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
            >
              <path d={slab(cy)} fill={layer.color} fillOpacity={0.1} />
              <polygon points={plane(cy)} fill={`url(#sigil-fill-${i})`} />
              <polygon
                points={plane(cy)}
                fill="none"
                stroke={layer.color}
                strokeOpacity={0.9}
                strokeWidth={1.25}
                strokeLinejoin="round"
              />

              {CELLS.map((c, j) => (
                <polygon
                  key={j}
                  points={cell(CENTER_X + c.dx, cy + c.dy)}
                  fill="none"
                  stroke={layer.color}
                  strokeOpacity={0.34}
                  strokeWidth={0.75}
                />
              ))}

              {/* Leader line out to the label. */}
              <line
                x1={CENTER_X + HALF_W + 6}
                y1={cy}
                x2={CENTER_X + HALF_W + 26}
                y2={cy}
                stroke={layer.color}
                strokeOpacity={0.4}
                strokeWidth={1}
              />
              <circle cx={CENTER_X + HALF_W + 26} cy={cy} r={1.6} fill={layer.color} />
              <text
                x="394"
                y={cy + 3.5}
                textAnchor="end"
                fill={layer.color}
                fillOpacity={0.85}
                fontSize="10"
                letterSpacing="1.2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {layer.label.toUpperCase()}
              </text>

              {/* Index, mirrored on the left. */}
              <text
                x="10"
                y={cy + 3.5}
                fill="#fff"
                fillOpacity={0.22}
                fontSize="9"
                letterSpacing="1.2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* ---------- Pulses ----------
          Two dots travelling the spine on offset schedules — the only thing on
          the plate that says the layers talk to each other. */}
      {!still &&
        [0, 2.1].map((delay) => (
          <motion.circle
            key={delay}
            cx="200"
            r="3"
            fill="#fff"
            filter="url(#sigil-glow)"
            initial={{ cy: LAYER_Y[0], opacity: 0 }}
            animate={{
              cy: [LAYER_Y[0], LAYER_Y[2]],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              repeatDelay: 0.6,
              delay,
              ease: "easeInOut",
              opacity: {
                duration: 4.2,
                repeat: Infinity,
                repeatDelay: 0.6,
                delay,
                times: [0, 0.12, 0.86, 1],
              },
            }}
          />
        ))}

      {/* ---------- Readout ---------- */}
      <text
        x="200"
        y="346"
        textAnchor="middle"
        fill="#fff"
        fillOpacity={0.34}
        fontSize="9"
        letterSpacing="1.8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {hero.sigil.readout.toUpperCase()}
      </text>
    </svg>
  );
}
