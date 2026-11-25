"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/format";

export type AltitudePoint = { day: number; meters: number; title: string };

type AltitudeProfileProps = {
  points: AltitudePoint[];
  /** Total trip days, so the x-axis spans the whole trip (days without altitude leave a gap) */
  totalDays: number;
};

// Chart geometry in SVG user units; the SVG scales to its container width
const W = 720;
const H = 280;
const PAD = { top: 36, right: 20, bottom: 40, left: 56 };
const STEP = 1000; // gridline every 1,000 m

/**
 * Monotone cubic (Fritsch–Carlson) path: smooth, but never overshoots the data,
 * so the curve can't suggest an altitude higher or lower than a listed value.
 */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  const n = pts.length;
  const dx = pts.slice(1).map((p, i) => p.x - pts[i].x);
  const slope = pts.slice(1).map((p, i) => (p.y - pts[i].y) / dx[i]);
  const m = pts.map((_, i) => {
    if (i === 0) return slope[0];
    if (i === n - 1) return slope[n - 2];
    return slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
  });
  for (let i = 0; i < n - 1; i++) {
    if (slope[i] === 0) {
      m[i] = m[i + 1] = 0;
      continue;
    }
    const a = m[i] / slope[i];
    const b = m[i + 1] / slope[i];
    const h = a * a + b * b;
    if (h > 9) {
      const t = 3 / Math.sqrt(h);
      m[i] = t * a * slope[i];
      m[i + 1] = t * b * slope[i];
    }
  }
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${pts[i].x + h},${pts[i].y + m[i] * h} ${pts[i + 1].x - h},${pts[i + 1].y - m[i + 1] * h} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return d;
}

/** Single-series altitude-by-day chart: navy line, glacier fill, saffron peak marker. */
export default function AltitudeProfile({ points, totalDays }: AltitudeProfileProps) {
  const [active, setActive] = useState<number | null>(null);

  const maxM = Math.ceil(Math.max(...points.map((p) => p.meters)) / STEP) * STEP;
  const lastDay = Math.max(totalDays, ...points.map((p) => p.day));
  const x = (day: number) => PAD.left + ((day - 1) / Math.max(lastDay - 1, 1)) * (W - PAD.left - PAD.right);
  const y = (m: number) => PAD.top + (1 - m / maxM) * (H - PAD.top - PAD.bottom);
  const baseY = y(0);

  const yTicks = Array.from({ length: maxM / STEP + 1 }, (_, i) => i * STEP);
  const xEvery = lastDay > 14 ? 2 : 1;
  const xTicks = Array.from({ length: lastDay }, (_, i) => i + 1).filter((d) => (d - 1) % xEvery === 0);

  const xy = points.map((p) => ({ x: x(p.day), y: y(p.meters) }));
  const line = smoothPath(xy);
  const area = `${line} L${xy.at(-1)!.x},${baseY} L${xy[0].x},${baseY} Z`;
  const peakIndex = points.reduce((best, p, i) => (p.meters > points[best].meters ? i : best), 0);
  const peak = points[peakIndex];
  const activePoint = active === null ? null : points[active];

  return (
    <figure>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Altitude by day, peaking at ${formatNumber(peak.meters)} m on day ${peak.day}`}
        >
          {yTicks.map((m) => (
            <g key={m}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(m)} y2={y(m)} className="stroke-line" strokeWidth={1} />
              <text x={PAD.left - 10} y={y(m)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px]">
                {formatNumber(m)}
              </text>
            </g>
          ))}
          <text x={PAD.left - 10} y={14} textAnchor="end" className="fill-muted text-[11px]">
            m
          </text>
          {xTicks.map((d) => (
            <text key={d} x={x(d)} y={baseY + 20} textAnchor="middle" className="fill-muted text-[11px]">
              {d}
            </text>
          ))}
          <text x={(PAD.left + W - PAD.right) / 2} y={H - 4} textAnchor="middle" className="fill-muted text-[11px]">
            Day
          </text>

          <path d={area} className="fill-glacier" />
          <path d={line} fill="none" className="stroke-navy" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {activePoint && (
            <line
              x1={x(activePoint.day)}
              x2={x(activePoint.day)}
              y1={PAD.top - 8}
              y2={baseY}
              className="stroke-muted"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          {points.map((p, i) => {
            const isPeak = i === peakIndex;
            return (
              <g key={`${p.day}-${i}`}>
                <circle
                  cx={x(p.day)}
                  cy={y(p.meters)}
                  r={isPeak ? 7 : active === i ? 6 : 4}
                  className={`stroke-white ${isPeak ? "fill-saffron" : "fill-navy"}`}
                  strokeWidth={2}
                />
                {/* Larger invisible hit target */}
                <circle
                  cx={x(p.day)}
                  cy={y(p.meters)}
                  r={14}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`Day ${p.day}: ${formatNumber(p.meters)} m, ${p.title}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="cursor-pointer outline-none"
                />
              </g>
            );
          })}

          {/* Direct label on the highest point only */}
          <text
            x={x(peak.day)}
            y={y(peak.meters) - 14}
            textAnchor="middle"
            className="pointer-events-none fill-navy text-[12px] font-semibold"
          >
            {formatNumber(peak.meters)} m
          </text>
        </svg>

        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl bg-navy px-3 py-2 text-xs text-white shadow-lg"
            style={{
              left: `${(x(activePoint.day) / W) * 100}%`,
              top: `${(y(activePoint.meters) / H) * 100}%`,
              marginTop: -14,
            }}
          >
            <p className="font-semibold">
              Day {activePoint.day} · {formatNumber(activePoint.meters)} m
            </p>
            <p className="max-w-[14rem] text-white/80">{activePoint.title}</p>
          </div>
        )}
      </div>

      <figcaption className="mt-2 text-xs text-muted">Days without a listed altitude are left out.</figcaption>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-saffron-text">Show as table</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="border-b border-line text-muted">
              <th scope="col" className="py-1.5 pr-4 font-medium">Day</th>
              <th scope="col" className="py-1.5 pr-4 font-medium">Altitude</th>
              <th scope="col" className="py-1.5 font-medium">Stage</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p, i) => (
              <tr key={`${p.day}-${i}`} className="border-b border-line/60">
                <td className="py-1.5 pr-4">{p.day}</td>
                <td className="py-1.5 pr-4 tabular-nums">{formatNumber(p.meters)} m</td>
                <td className="py-1.5">{p.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
