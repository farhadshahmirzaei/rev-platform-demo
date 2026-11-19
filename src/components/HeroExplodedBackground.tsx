import React from 'react';

export const HeroExplodedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* Subtle architectural dot grid */}
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Center Radial Glow */}
      <div
        className="exploded-layer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-[#3ab0a2]/12 via-[#f4e3b5]/20 to-transparent blur-3xl"
        style={{ '--explode-x': '0px', '--explode-y': '0px', '--explode-rot': '0deg', '--explode-scale': '0.35' } as React.CSSProperties}
      />

      {/* Concentric Orbital Ring — Inner */}
      <div
        className="exploded-layer absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-[#3ab0a2]/20"
        style={{ '--explode-x': '0px', '--explode-y': '0px', '--explode-scale': '0.28', '--explode-rot': '18deg' } as React.CSSProperties}
      >
        <div className="exploded-ring-pulse w-full h-full rounded-full border border-dashed border-[#3ab0a2]/30" />
      </div>

      {/* Concentric Orbital Ring — Outer */}
      <div
        className="exploded-layer absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[760px] h-[580px] sm:h-[760px] rounded-full border border-slate-200/80"
        style={{ '--explode-x': '0px', '--explode-y': '0px', '--explode-scale': '0.42', '--explode-rot': '-24deg' } as React.CSSProperties}
      >
        <div className="w-3 h-3 rounded-full bg-[#3ab0a2]/45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#f4e3b5] border border-[#3ab0a2]/40 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>

      {/* Exploding Top-Left Mechanical Plate */}
      <div
        className="exploded-layer absolute top-[12%] left-[4%] sm:left-[10%]"
        style={{ '--explode-x': '-140px', '--explode-y': '-95px', '--explode-rot': '-14deg' } as React.CSSProperties}
      >
        <div className="exploded-float-a w-28 sm:w-44 h-24 sm:h-36 rounded-2xl border border-[#3ab0a2]/25 bg-white/75 backdrop-blur-xs shadow-sm p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="w-6 h-1.5 rounded-full bg-[#3ab0a2]/50" />
            <span className="w-2 h-2 rounded-xs border border-[#3ab0a2]/50" />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
            <div className="h-1.5 w-1/2 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Exploding Top-Right Blueprint Plate */}
      <div
        className="exploded-layer absolute top-[14%] right-[4%] sm:right-[10%]"
        style={{ '--explode-x': '150px', '--explode-y': '-90px', '--explode-rot': '16deg' } as React.CSSProperties}
      >
        <div className="exploded-float-b w-28 sm:w-44 h-24 sm:h-36 rounded-2xl border border-[#f4e3b5] bg-[#f4e3b5]/25 backdrop-blur-xs shadow-sm p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="w-2 h-2 rounded-full bg-[#3ab0a2]/60" />
            <span className="w-8 h-1.5 rounded-full bg-[#3ab0a2]/35" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded-lg bg-white/80 border border-slate-200/70" />
            <div className="h-8 rounded-lg bg-white/80 border border-slate-200/70" />
            <div className="h-8 rounded-lg bg-[#3ab0a2]/15 border border-[#3ab0a2]/25" />
          </div>
        </div>
      </div>

      {/* Exploding Bottom-Left Corner Bracket */}
      <div
        className="exploded-layer absolute bottom-[14%] left-[6%] sm:left-[14%]"
        style={{ '--explode-x': '-120px', '--explode-y': '110px', '--explode-rot': '-18deg' } as React.CSSProperties}
      >
        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-3xl border-2 border-dashed border-[#3ab0a2]/30 bg-white/50 flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl border border-[#3ab0a2]/40 rotate-12" />
        </div>
      </div>

      {/* Exploding Bottom-Right Corner Bracket */}
      <div
        className="exploded-layer absolute bottom-[12%] right-[6%] sm:right-[14%]"
        style={{ '--explode-x': '130px', '--explode-y': '115px', '--explode-rot': '20deg' } as React.CSSProperties}
      >
        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-3xl border border-[#f4e3b5] bg-[#f4e3b5]/20 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#3ab0a2]/35" />
        </div>
      </div>
    </div>
  );
};
