import React, { useId } from 'react';
import {
  INDONESIA_ARCHIPELAGO_PATH,
  INDONESIA_FLAG_COLORS,
  INDONESIA_MAP_VIEWBOX,
} from '../data/indonesiaMapData';

interface IndonesiaFlagMapProps {
  className?: string;
}

/**
 * Visually striking, geographically accurate 3D-lit vector illustration of the
 * Indonesian archipelago rendered in the official Indonesian flag colors
 * (vivid red #FF0000 upper half, pure white #FFFFFF lower half) with a clean
 * horizontal division, sculpted bevel depth, refined top-left lighting, and
 * soft floating shadow. Rendered exclusively in the Indonesian ('id') homepage hero.
 */
export const IndonesiaFlagMap: React.FC<IndonesiaFlagMapProps> = ({
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const { width, height, splitY } = INDONESIA_MAP_VIEWBOX;

  const archipelagoClipId = `id-map-clip-${uid}`;
  const upperHalfClipId = `id-upper-clip-${uid}`;
  const lowerHalfClipId = `id-lower-clip-${uid}`;
  const lightingGradId = `id-light-grad-${uid}`;
  const redSideGradId = `id-red-side-${uid}`;
  const whiteSideGradId = `id-white-side-${uid}`;
  const ambientShadowId = `id-ambient-shadow-${uid}`;
  const glossFilterId = `id-soft-bevel-${uid}`;

  return (
    <figure
      data-testid="indonesia-flag-map"
      className={`relative mx-auto w-full max-w-[300px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[560px] py-1 select-none ${className}`}
    >
      {/* Subtle atmospheric aura behind the archipelago so pure white lower islands lift softly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 inset-y-3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(241,245,249,0.92)_0%,rgba(248,250,252,0.45)_58%,transparent_80%)]"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Peta Kepulauan Indonesia berbentuk bendera Merah Putih"
        className="relative z-10 w-full h-auto block overflow-visible"
      >
        <title>Peta Kepulauan Indonesia — Merah Putih</title>

        <defs>
          {/* Exact 133-island Natural Earth silhouette clip */}
          <clipPath id={archipelagoClipId}>
            <path d={INDONESIA_ARCHIPELAGO_PATH} />
          </clipPath>

          {/* Horizontal flag division clips */}
          <clipPath id={upperHalfClipId}>
            <rect x="0" y="0" width={width} height={splitY} />
          </clipPath>
          <clipPath id={lowerHalfClipId}>
            <rect x="0" y={splitY} width={width} height={height - splitY} />
          </clipPath>

          {/* Soft ambient floating shadow */}
          <filter
            id={ambientShadowId}
            x="-10%"
            y="-15%"
            width="120%"
            height="145%"
          >
            <feDropShadow
              dx="0"
              dy="11"
              stdDeviation="8"
              floodColor="#0f172a"
              floodOpacity="0.15"
            />
            <feDropShadow
              dx="0"
              dy="3.5"
              stdDeviation="2.5"
              floodColor="#0f172a"
              floodOpacity="0.09"
            />
          </filter>

          {/* Subtle top-left studio lighting sheen across the entire sculpted surface */}
          <linearGradient
            id={lightingGradId}
            x1="12%"
            y1="0%"
            x2="88%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="72%" stopColor="#0f172a" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.06" />
          </linearGradient>

          {/* 3D extruded bevel edge gradients */}
          <linearGradient id={redSideGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cc0000" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>
          <linearGradient id={whiteSideGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dbe4ee" />
            <stop offset="100%" stopColor="#b8c5d6" />
          </linearGradient>

          {/* Subtle crisp top specular highlight */}
          <filter id={glossFilterId} x="-5%" y="-5%" width="110%" height="110%">
            <feSpecularLighting
              in="SourceAlpha"
              surfaceScale="1.5"
              specularConstant="0.45"
              specularExponent="28"
              lightingColor="#ffffff"
              result="spec"
            >
              <feDistantLight azimuth="225" elevation="58" />
            </feSpecularLighting>
            <feComposite
              in="spec"
              in2="SourceAlpha"
              operator="in"
              result="clippedSpec"
            />
            <feComposite
              in="SourceGraphic"
              in2="clippedSpec"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="0.18"
              k4="0"
            />
          </filter>
        </defs>

        {/* Layer 1: Floating soft drop shadow beneath the entire archipelago */}
        <path
          d={INDONESIA_ARCHIPELAGO_PATH}
          fill="#0f172a"
          fillOpacity="0.08"
          filter={`url(#${ambientShadowId})`}
        />

        {/* Layer 2: Tasteful 3D extruded depth plinth (deep ruby upper edge, cool porcelain lower edge) */}
        <g transform="translate(0, 4.2)">
          <g clipPath={`url(#${upperHalfClipId})`}>
            <path
              d={INDONESIA_ARCHIPELAGO_PATH}
              fill={`url(#${redSideGradId})`}
            />
          </g>
          <g clipPath={`url(#${lowerHalfClipId})`}>
            <path
              d={INDONESIA_ARCHIPELAGO_PATH}
              fill={`url(#${whiteSideGradId})`}
            />
          </g>
        </g>

        {/* Layer 2b: Mid-step extrusion for smooth 3D wall thickness */}
        <g transform="translate(0, 2.1)">
          <g clipPath={`url(#${upperHalfClipId})`}>
            <path d={INDONESIA_ARCHIPELAGO_PATH} fill="#dc0000" />
          </g>
          <g clipPath={`url(#${lowerHalfClipId})`}>
            <path d={INDONESIA_ARCHIPELAGO_PATH} fill="#e5edf5" />
          </g>
        </g>

        {/* Layer 3: Official Flag-Colored Surface (#FF0000 upper half, #FFFFFF lower half) */}
        <g clipPath={`url(#${archipelagoClipId})`} filter={`url(#${glossFilterId})`}>
          {/* Upper half: Vivid Indonesian National Red */}
          <rect
            data-testid="indonesia-flag-red-half"
            x="0"
            y="0"
            width={width}
            height={splitY}
            fill={INDONESIA_FLAG_COLORS.red}
          />
          {/* Lower half: Pure Indonesian National White */}
          <rect
            data-testid="indonesia-flag-white-half"
            x="0"
            y={splitY}
            width={width}
            height={height - splitY}
            fill={INDONESIA_FLAG_COLORS.white}
          />

          {/* Ultra-subtle crisp seam along the exact horizontal flag division */}
          <line
            x1="0"
            y1={splitY}
            x2={width}
            y2={splitY}
            stroke="#0f172a"
            strokeOpacity="0.08"
            strokeWidth="1"
          />

          {/* Refined studio directional sheen */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={`url(#${lightingGradId})`}
            style={{ pointerEvents: 'none' }}
          />
        </g>

        {/* Layer 4: Crisp hairline contour rims so every island (including pure white lower islands) reads sharply */}
        <g clipPath={`url(#${upperHalfClipId})`} pointerEvents="none">
          <path
            d={INDONESIA_ARCHIPELAGO_PATH}
            fill="none"
            stroke="#b30000"
            strokeOpacity="0.38"
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
        </g>
        <g clipPath={`url(#${lowerHalfClipId})`} pointerEvents="none">
          <path
            d={INDONESIA_ARCHIPELAGO_PATH}
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.62"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </figure>
  );
};
