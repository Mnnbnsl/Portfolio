'use client';

interface ProjectVisualProps {
  projectId: string;
  projectName: string;
}

export default function ProjectVisual({
  projectId,
  projectName,
}: ProjectVisualProps) {
  const normalized = (projectName || projectId).toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div className="simple-visual-canvas" aria-hidden="true">
      {normalized.includes('sider') && <SiderVisual />}
      {normalized.includes('shorty') && <ShortyVisual />}
      {normalized.includes('mockingjay') && <MockingjayVisual />}
      {normalized.includes('stock') && <StockVisual />}
      {normalized.includes('vapor') && <VaporVisual />}
      {normalized.includes('sahayak') && <SahayakVisual />}

      {!normalized.includes('sider') &&
        !normalized.includes('shorty') &&
        !normalized.includes('mockingjay') &&
        !normalized.includes('stock') &&
        !normalized.includes('vapor') &&
        !normalized.includes('sahayak') && <FallbackVisual />}
    </div>
  );
}

// -------------------------------------------------------------
// 1. SIDER: Minimal Epoll Event Loop & In-Memory Core
// -------------------------------------------------------------
function SiderVisual() {
  return (
    <div className="visual-graphic sider-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        {/* Subtle static guideline ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="rgba(237, 240, 230, 0.08)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Rotating Epoll orbit pulse */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="24 200"
          className="anim-orbit-ring"
        />
        {/* Orbiting packet dot */}
        <circle cx="50" cy="14" r="3" fill="var(--accent)" className="anim-orbit-dot" />

        {/* Central Core Memory Nodes */}
        <circle cx="50" cy="50" r="18" fill="#0c0f0d" stroke="rgba(237, 240, 230, 0.15)" strokeWidth="1" />
        <rect x="40" y="44" width="20" height="3" rx="1.5" fill="var(--accent)" className="anim-bar-1" />
        <rect x="40" y="49" width="14" height="3" rx="1.5" fill="rgba(237, 240, 230, 0.5)" className="anim-bar-2" />
        <rect x="40" y="54" width="17" height="3" rx="1.5" fill="var(--accent)" opacity="0.6" className="anim-bar-3" />
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 2. SHORTY: Minimalist URL Compression Ray
// -------------------------------------------------------------
function ShortyVisual() {
  return (
    <div className="visual-graphic shorty-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        {/* Left incoming long URL packet stream */}
        <line x1="10" y1="50" x2="38" y2="50" stroke="rgba(237, 240, 230, 0.2)" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="22" cy="50" r="2.5" fill="rgba(237, 240, 230, 0.6)" className="anim-compress-in" />

        {/* Central Compression Rhombus Core */}
        <polygon
          points="50,34 62,50 50,66 38,50"
          fill="#0c0f0d"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="anim-pulse-rhombus"
        />
        <circle cx="50" cy="50" r="3" fill="var(--accent)" />

        {/* Right emitted compressed fast beam */}
        <line x1="62" y1="50" x2="90" y2="50" stroke="var(--accent)" strokeWidth="2.5" />
        <circle cx="76" cy="50" r="3" fill="var(--accent)" className="anim-compress-out" />
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 3. MOCKINGJAY-CLAW: Minimal Autonomous Agent Prompt & Scanner
// -------------------------------------------------------------
function MockingjayVisual() {
  return (
    <div className="visual-graphic mockingjay-graphic">
      <div className="minimal-term-box">
        <div className="minimal-term-bar">
          <span className="mini-dot d1" />
          <span className="mini-dot d2" />
          <span className="mini-dot d3" />
        </div>
        <div className="minimal-term-content">
          <span className="prompt-arrow">❯</span>
          <span className="prompt-text">agent.exec()</span>
          <span className="prompt-cursor" />
        </div>
        <div className="scan-line-track">
          <div className="scan-line-beam" />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. SMART-STOCK-ENGINE: Minimal Quantitative Trend Curve
// -------------------------------------------------------------
function StockVisual() {
  return (
    <div className="visual-graphic stock-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        {/* Subtle grid lines */}
        <line x1="15" y1="25" x2="85" y2="25" stroke="rgba(237, 240, 230, 0.05)" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="rgba(237, 240, 230, 0.05)" />
        <line x1="15" y1="75" x2="85" y2="75" stroke="rgba(237, 240, 230, 0.05)" />

        {/* Upward Time-Series Curve */}
        <path
          d="M 18 72 Q 40 68 55 48 T 82 28"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          className="anim-trend-line"
        />

        {/* Prediction Target Pulse Node */}
        <circle cx="82" cy="28" r="4" fill="var(--accent)" className="anim-pulse-target" />
        <circle cx="82" cy="28" r="8" fill="none" stroke="var(--accent)" strokeWidth="1" className="anim-target-ring" />
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 5. VAPOR: Minimal Ephemeral Particles & Waveform
// -------------------------------------------------------------
function VaporVisual() {
  return (
    <div className="visual-graphic vapor-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        {/* Left and Right Nodes */}
        <circle cx="28" cy="50" r="4" fill="rgba(237, 240, 230, 0.4)" />
        <circle cx="72" cy="50" r="4" fill="var(--accent)" />

        {/* Waveform connecting them */}
        <path
          d="M 28 50 Q 40 38 50 50 T 72 50"
          fill="none"
          stroke="rgba(183, 243, 74, 0.5)"
          strokeWidth="1.5"
          className="anim-wave-line"
        />
      </svg>

      {/* Floating particles rising and dissolving */}
      <div className="particle-stage">
        <span className="p-dot pd-1" />
        <span className="p-dot pd-2" />
        <span className="p-dot pd-3" />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. SAHAYAK: Minimal Tactical Radar Sweep
// -------------------------------------------------------------
function SahayakVisual() {
  return (
    <div className="visual-graphic sahayak-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        {/* Concentric Radar Rings */}
        <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(237, 240, 230, 0.08)" strokeWidth="1" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(183, 243, 74, 0.2)" strokeWidth="1" />

        {/* Crosshair Lines */}
        <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(237, 240, 230, 0.06)" />
        <line x1="12" y1="50" x2="88" y2="50" stroke="rgba(237, 240, 230, 0.06)" />

        {/* Rotating Radar Sweep Line */}
        <g className="anim-radar-sweep">
          <line x1="50" y1="50" x2="86" y2="50" stroke="var(--accent)" strokeWidth="1.5" />
        </g>

        {/* Beacon Dots */}
        <circle cx="62" cy="40" r="3" fill="#ef5f5f" className="anim-beacon-sos" />
        <circle cx="38" cy="62" r="3" fill="var(--accent)" className="anim-beacon-vol" />
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 7. FALLBACK: Minimal Geometric Matrix
// -------------------------------------------------------------
function FallbackVisual() {
  return (
    <div className="visual-graphic generic-graphic">
      <svg viewBox="0 0 100 100" className="graphic-svg">
        <circle cx="35" cy="50" r="4" fill="var(--accent)" />
        <circle cx="65" cy="50" r="4" fill="rgba(237, 240, 230, 0.5)" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}
