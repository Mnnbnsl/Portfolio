'use client';

import { useRef } from 'react';
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';

type Side = 'left' | 'right';

interface Artifact {
  side: Side;
  /** Vertical anchor inside the project stage, as a percentage. */
  top: number;
  /** Distance from the stage edge, as a percentage. */
  inset: number;
  /** Fixed tile width in rem. */
  width: number;
  /** Seconds for one float cycle. */
  duration: number;
  /** Negative delay so no two tiles move in sync. */
  delay: number;
  /** Idle float rotation in degrees. */
  tilt: number;
  body: ReactNode;
}

const PLACEMENTS = [
  { side: 'left', top: 3, inset: 2, width: 8.6, duration: 9.4, delay: -0.7, tilt: -5 },
  { side: 'right', top: 12, inset: 3, width: 8.1, duration: 10.6, delay: -2.4, tilt: 5 },
  { side: 'left', top: 32, inset: 6, width: 7.8, duration: 8.7, delay: -4.2, tilt: 4 },
  { side: 'right', top: 46, inset: 1, width: 8.8, duration: 9.9, delay: -1.6, tilt: -4 },
  { side: 'left', top: 62, inset: 1, width: 8.3, duration: 10.2, delay: -3.3, tilt: 5 },
  { side: 'right', top: 76, inset: 6, width: 7.7, duration: 8.9, delay: -5.1, tilt: -5 },
] as const;

function assignPlacements(bodies: ReactNode[]): Artifact[] {
  return bodies.map((body, index) => {
    const placement = PLACEMENTS[index % PLACEMENTS.length];
    return {
      side: placement.side as Side,
      top: placement.top,
      inset: placement.inset,
      width: placement.width,
      duration: placement.duration,
      delay: placement.delay,
      tilt: placement.tilt,
      body,
    };
  });
}

/* ---------------------------------------------------------------
   Shared bits
   --------------------------------------------------------------- */

function Label({
  children,
  meta,
}: {
  children: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="artifact-label">
      <span>{children}</span>
      {meta ?? <span className="artifact-dot" />}
    </div>
  );
}

function StatusDot({ tone = 'accent' }: { tone?: 'accent' | 'danger' }) {
  return <span className={`artifact-dot${tone === 'danger' ? ' is-danger' : ''}`} />;
}

function Bar({ value }: { value: string }) {
  return (
    <div className="artifact-bar-track">
      <span className="artifact-bar-fill" style={{ width: value }} />
    </div>
  );
}

/* ---------------------------------------------------------------
   Sider — in-memory datastore
   --------------------------------------------------------------- */

function siderArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="resp">
      <Label meta={<span className="artifact-badge">TCP</span>}>RESP2</Label>
      <pre className="artifact-code">
        {'*3\n$3  SET\n$6  key:42\n$5  value'}
      </pre>
      <Bar value="100%" />
    </div>,
    <div className="art-block" key="ttl">
      <Label meta={<span className="artifact-sub">key:42</span>}>TTL</Label>
      <div className="artifact-value">42s</div>
      <Bar value="58%" />
      <div className="artifact-row">
        <span>LAZY</span>
        <b>ON</b>
      </div>
    </div>,
    <div className="art-block" key="latency">
      <Label meta={<span className="artifact-badge">p99</span>}>LATENCY</Label>
      <div className="artifact-value">&lt; 0.05ms</div>
      <Bar value="92%" />
      <div className="artifact-sub">epoll hot path</div>
    </div>,
    <div className="art-block" key="kv">
      <Label meta={<span className="artifact-sub">RAM</span>}>GET</Label>
      <div className="artifact-rows">
        <div className="artifact-row">
          <span>session:7</span>
          <b>&quot;a83f…&quot;</b>
        </div>
        <div className="artifact-row">
          <span>HIT</span>
          <b>IN MEMORY</b>
        </div>
      </div>
      <Bar value="76%" />
    </div>,
    <div className="art-block" key="memory">
      <Label meta={<span className="artifact-sub">RAM</span>}>MEMORY</Label>
      <div className="artifact-bars">
        {[58, 82, 44, 92, 68, 52].map((height, index) => (
          <span
            key={index}
            style={{
              height: `${height}%`,
              animationDelay: `${index * 0.16}s`,
            }}
          />
        ))}
      </div>
      <div className="artifact-row">
        <span>KEYS</span>
        <b>12,480</b>
      </div>
    </div>,
    <div className="art-block" key="epoll">
      <div className="artifact-ring-layout">
        <svg className="artifact-ring" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="15" className="artifact-ring-track" />
          <circle
            cx="20"
            cy="20"
            r="15"
            className="artifact-ring-arc"
            strokeDasharray="14 80"
          />
          <circle cx="20" cy="5" r="2" className="artifact-ring-dot" />
        </svg>
        <div>
          <Label meta={<span className="artifact-sub">RDY</span>}>EPOLL</Label>
          <div className="artifact-value">EVENT LOOP</div>
          <div className="artifact-sub">read · write · accept</div>
        </div>
      </div>
    </div>,
  ];
}

/* ---------------------------------------------------------------
   shorty — URL shortener
   --------------------------------------------------------------- */

function shortyArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="shorten">
      <Label meta={<span className="artifact-badge">BASE62</span>}>SHORTEN</Label>
      <div className="artifact-sub artifact-ellipsis">
        github.com/manan/a-very-long-path
      </div>
      <div className="artifact-flow-arrow">↓</div>
      <div className="artifact-value">shty.io/a9Kq2</div>
    </div>,
    <div className="art-block" key="cache">
      <Label meta={<span className="artifact-badge">HIT</span>}>CACHE</Label>
      <div className="artifact-value">&lt; 1ms</div>
      <Bar value="86%" />
      <div className="artifact-sub">redis fast path</div>
    </div>,
    <div className="art-block" key="base62">
      <Label meta={<span className="artifact-sub">62</span>}>ALPHABET</Label>
      <div className="artifact-ellipsis artifact-sub">0–9 · A–Z · a–z</div>
      <div className="artifact-value">a9Kq2</div>
      <div className="artifact-sub">collision checked</div>
    </div>,
    <div className="art-block" key="redirect">
      <Label meta={<span className="artifact-badge">301</span>}>REDIRECT</Label>
      <div className="artifact-chain">
        <span>short</span>
        <i>→</i>
        <span>edge</span>
        <i>→</i>
        <span>origin</span>
      </div>
    </div>,
    <div className="art-block" key="clicks">
      <Label meta={<span className="artifact-sub">24h</span>}>CLICKS</Label>
      <div className="artifact-value">148,203</div>
      <svg className="artifact-spark" viewBox="0 0 62 22" aria-hidden="true">
        <path
          d="M2 18 12 14 20 16 29 9 38 12 47 5 60 3"
          className="artifact-spark-line"
        />
      </svg>
    </div>,
    <div className="art-block" key="postgres">
      <Label meta={<span className="artifact-sub">SQL</span>}>POSTGRES</Label>
      <pre className="artifact-code">
        {'SELECT code, url\nFROM links\nWHERE code = $1'}
      </pre>
    </div>,
  ];
}

/* ---------------------------------------------------------------
   Mockingjay-Claw — terminal coding agent
   --------------------------------------------------------------- */

function mockingjayArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="terminal">
      <Label meta={<StatusDot />}>AGENT</Label>
      <div className="artifact-terminal">
        <span className="artifact-prompt">❯</span> agent.exec()
        <span className="artifact-cursor" />
      </div>
      <div className="artifact-sub">autonomous prompt loop</div>
    </div>,
    <div className="art-block" key="tools">
      <Label meta={<span className="artifact-sub">3</span>}>TOOLS</Label>
      <div className="artifact-rows">
        <div className="artifact-row">
          <b>read_file</b>
          <span className="artifact-ok">✓</span>
        </div>
        <div className="artifact-row">
          <b>edit_file</b>
          <span className="artifact-ok">✓</span>
        </div>
        <div className="artifact-row">
          <b>web_search</b>
          <span className="artifact-ok">✓</span>
        </div>
      </div>
    </div>,
    <div className="art-block" key="diff">
      <Label meta={<span className="artifact-badge">GIT</span>}>DIFF</Label>
      <pre className="artifact-code">
        <span className="artifact-del">- const old</span>
        {'\n'}
        <span className="artifact-add">+ const next</span>
      </pre>
    </div>,
    <div className="art-block" key="ripgrep">
      <Label meta={<span className="artifact-badge">rg</span>}>SEARCH</Label>
      <div className="artifact-sub artifact-ellipsis">rg &quot;tool&quot;</div>
      <div className="artifact-row">
        <b>src/agent.ts</b>
        <span>:42</span>
      </div>
      <Bar value="64%" />
    </div>,
    <div className="art-block" key="step">
      <Label meta={<span className="artifact-sub">07</span>}>STEP</Label>
      <div className="artifact-pips">
        {[0, 1, 2, 3, 4, 5, 6].map((pip) => (
          <span key={pip} className={pip < 5 ? 'is-on' : undefined} />
        ))}
      </div>
      <div className="artifact-sub">tool call in flight</div>
    </div>,
    <div className="art-block" key="runtime">
      <Label meta={<span className="artifact-badge">TS</span>}>RUNTIME</Label>
      <div className="artifact-value">Bun</div>
      <div className="artifact-sub">typescript · cli</div>
    </div>,
  ];
}

/* ---------------------------------------------------------------
   Smart-Stock-Engine — forecasting model
   --------------------------------------------------------------- */

function stockArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="forecast">
      <Label meta={<span className="artifact-badge">t+7</span>}>FORECAST</Label>
      <svg className="artifact-spark" viewBox="0 0 64 24" aria-hidden="true">
        <path
          d="M2 20 12 16 20 18 28 11 38 13 48 6 61 3"
          className="artifact-spark-line"
        />
        <circle cx="61" cy="3" r="2.1" className="artifact-pulse-dot" />
      </svg>
      <div className="artifact-row">
        <span>MODEL</span>
        <b>LSTM</b>
      </div>
    </div>,
    <div className="art-block" key="rsi">
      <Label meta={<span className="artifact-sub">14D</span>}>RSI</Label>
      <div className="artifact-value">68.4</div>
      <Bar value="68%" />
      <div className="artifact-row">
        <span>OVERSOLD</span>
        <span>OVERBOUGHT</span>
      </div>
    </div>,
    <div className="art-block" key="candles">
      <Label meta={<span className="artifact-sub">OHLCV</span>}>CANDLES</Label>
      <svg className="artifact-candles" viewBox="0 0 64 30" aria-hidden="true">
        <line x1="9" y1="7" x2="9" y2="24" className="artifact-wick" />
        <rect x="6" y="12" width="6" height="9" className="artifact-up" />
        <line x1="21" y1="4" x2="21" y2="22" className="artifact-wick" />
        <rect x="18" y="8" width="6" height="10" className="artifact-up" />
        <line x1="33" y1="9" x2="33" y2="27" className="artifact-wick" />
        <rect x="30" y="13" width="6" height="10" className="artifact-down" />
        <line x1="45" y1="11" x2="45" y2="28" className="artifact-wick" />
        <rect x="42" y="14" width="6" height="9" className="artifact-down" />
        <line x1="57" y1="5" x2="57" y2="24" className="artifact-wick" />
        <rect x="54" y="10" width="6" height="10" className="artifact-up" />
      </svg>
    </div>,
    <div className="art-block" key="tensor">
      <Label meta={<span className="artifact-badge">Torch</span>}>TENSOR</Label>
      <div className="artifact-value">[1, 60, 5]</div>
      <div className="artifact-sub">sequence × OHLCV features</div>
    </div>,
    <div className="art-block" key="confidence">
      <Label meta={<span className="artifact-sub">BAND</span>}>CONFIDENCE</Label>
      <svg className="artifact-spark" viewBox="0 0 64 24" aria-hidden="true">
        <path
          d="M2 18 12 14 22 16 32 10 42 12 52 6 61 4V20L52 19 42 22 32 20 22 22 12 20 2 22Z"
          className="artifact-band"
        />
        <path
          d="M2 20 12 17 22 19 32 15 42 17 52 12 61 11"
          className="artifact-spark-line is-soft"
        />
      </svg>
      <div className="artifact-row">
        <span>LOW</span>
        <b>HIGH</b>
      </div>
    </div>,
    <div className="art-block" key="model">
      <Label meta={<span className="artifact-badge">PyTorch</span>}>MODEL</Label>
      <div className="artifact-value">LSTM / SEQ2SEQ</div>
      <div className="artifact-sub">multi-step horizon</div>
    </div>,
  ];
}

/* ---------------------------------------------------------------
   Vapor — ephemeral chat
   --------------------------------------------------------------- */

function vaporArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="message">
      <Label meta={<span className="artifact-sub">#A7F2</span>}>MESSAGE</Label>
      <div className="artifact-bubble">
        this message
        <br />
        self-destructs
        <span className="artifact-bubble-dot" />
      </div>
    </div>,
    <div className="art-block" key="room">
      <Label meta={<StatusDot />}>ROOM</Label>
      <div className="artifact-value">#A7F2</div>
      <div className="artifact-row">
        <span>ONLINE</span>
        <b>03</b>
      </div>
    </div>,
    <div className="art-block" key="disk">
      <Label meta={<span className="artifact-badge">RAM</span>}>DISK</Label>
      <div className="artifact-value">0 BYTES</div>
      <Bar value="0%" />
      <div className="artifact-row">
        <span>WRITES</span>
        <b>NONE</b>
      </div>
      <div className="artifact-sub">nothing ever written</div>
    </div>,
    <div className="art-block" key="socket">
      <Label meta={<StatusDot />}>SOCKET</Label>
      <div className="artifact-value">CONNECTED</div>
      <div className="artifact-sub">ws · state held in RAM</div>
    </div>,
    <div className="art-block" key="sweeper">
      <Label meta={<span className="artifact-badge">TTL</span>}>SWEEPER</Label>
      <div className="artifact-value">04:59</div>
      <div className="artifact-bar-track">
        <span className="artifact-bar-fill artifact-countdown" />
      </div>
      <div className="artifact-row">
        <span>IDLE ROOMS</span>
        <b>GC</b>
      </div>
    </div>,
    <div className="art-block" key="ephemeral">
      <Label meta={<span className="artifact-sub">GC</span>}>EPHEMERAL</Label>
      <div className="artifact-particles">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="artifact-row">
        <span>STATE</span>
        <b>FADES OUT</b>
      </div>
    </div>,
  ];
}

/* ---------------------------------------------------------------
   Sahayak — disaster response mesh
   --------------------------------------------------------------- */

function sahayakArtifacts(): ReactNode[] {
  return [
    <div className="art-block" key="beacon">
      <Label meta={<span className="artifact-badge is-danger">SOS</span>}>
        BEACON
      </Label>
      <div className="artifact-beacon">
        <span className="artifact-sos" />
        <div>
          <div className="artifact-value">ACTIVE</div>
          <div className="artifact-sub">28.61°N · 77.20°E</div>
        </div>
      </div>
    </div>,
    <div className="art-block" key="dispatch">
      <Label meta={<StatusDot />}>DISPATCH</Label>
      <div className="artifact-chain">
        <span>VOL 04</span>
        <i>→</i>
        <b>SECTOR 4</b>
      </div>
      <div className="artifact-sub">nearest cluster</div>
    </div>,
    <div className="art-block" key="triage">
      <Label meta={<span className="artifact-badge is-danger">P1</span>}>
        TRIAGE
      </Label>
      <div className="artifact-value">CRITICAL</div>
      <div className="artifact-severity">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((tick) => (
          <span key={tick} className={tick < 6 ? 'is-on' : undefined} />
        ))}
      </div>
    </div>,
    <div className="art-block" key="volunteers">
      <Label meta={<StatusDot />}>VOLUNTEERS</Label>
      <div className="artifact-value">1,204</div>
      <div className="artifact-sub">online · mesh synced</div>
    </div>,
    <div className="art-block" key="geo">
      <Label meta={<span className="artifact-sub">GEO</span>}>MAP</Label>
      <svg className="artifact-radar" viewBox="0 0 60 30" aria-hidden="true">
        <circle cx="30" cy="15" r="6" className="artifact-radar-ring" />
        <circle cx="30" cy="15" r="12" className="artifact-radar-ring" />
        <line x1="18" y1="15" x2="42" y2="15" className="artifact-radar-cross" />
        <line x1="30" y1="1" x2="30" y2="29" className="artifact-radar-cross" />
        <circle cx="37" cy="10" r="2" className="artifact-pulse-dot" />
      </svg>
      <div className="artifact-row">
        <span>LAT</span>
        <b>28.61</b>
      </div>
    </div>,
    <div className="art-block" key="mesh">
      <Label meta={<span className="artifact-badge">IO</span>}>MESH</Label>
      <div className="artifact-mesh">
        <span />
        <i />
        <span />
        <i />
        <span />
      </div>
      <div className="artifact-sub">socket.io link</div>
    </div>,
  ];
}

function fallbackArtifacts(projectName: string): ReactNode[] {
  return [
    <div className="art-block" key="system">
      <Label meta={<StatusDot />}>SYSTEM</Label>
      <div className="artifact-value artifact-value-sm">{projectName}</div>
      <div className="artifact-sub">architecture</div>
    </div>,
    <div className="art-block" key="nodes">
      <Label meta={<span className="artifact-sub">2</span>}>NODES</Label>
      <div className="artifact-chain">
        <span>client</span>
        <i>→</i>
        <span>service</span>
      </div>
    </div>,
    <div className="art-block" key="state">
      <Label meta={<span className="artifact-badge">LIVE</span>}>STATE</Label>
      <div className="artifact-value">RUNNING</div>
      <Bar value="72%" />
    </div>,
  ];
}

function getArtifacts(projectId: string, projectName: string): Artifact[] {
  const normalized = `${projectName} ${projectId}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (normalized.includes('sider')) {
    return assignPlacements(siderArtifacts());
  }
  if (normalized.includes('shorty')) {
    return assignPlacements(shortyArtifacts());
  }
  if (normalized.includes('mockingjay')) {
    return assignPlacements(mockingjayArtifacts());
  }
  if (normalized.includes('stock')) {
    return assignPlacements(stockArtifacts());
  }
  if (normalized.includes('vapor')) {
    return assignPlacements(vaporArtifacts());
  }
  if (normalized.includes('sahayak')) {
    return assignPlacements(sahayakArtifacts());
  }

  return assignPlacements(fallbackArtifacts(projectName));
}

const DRAG_QUERY = '(min-width: 76.01rem)';

function canDrag() {
  return (
    typeof window !== 'undefined' && window.matchMedia(DRAG_QUERY).matches
  );
}

function ArtifactTile({ artifact }: { artifact: Artifact }) {
  const state = useRef({ pointer: -1, startX: 0, startY: 0, x: 0, y: 0 });

  const orbitStyle = {
    '--artifact-top': `${artifact.top}%`,
    '--artifact-inset': `${artifact.inset}%`,
    '--artifact-width': `${artifact.width}rem`,
    '--artifact-duration': `${artifact.duration}s`,
    '--artifact-delay': `${artifact.delay}s`,
    '--artifact-tilt': `${artifact.tilt}deg`,
  } as CSSProperties;

  function pauseFloat(tile: HTMLElement, paused: boolean) {
    const bob = tile.closest('.artifact-bob') as HTMLElement | null;
    if (bob) {
      bob.style.animationPlayState = paused ? 'paused' : '';
    }
    const orbit = tile.closest('.artifact-orbit') as HTMLElement | null;
    if (orbit) {
      orbit.style.zIndex = paused ? '6' : '';
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!canDrag()) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const tile = event.currentTarget;
    state.current.pointer = event.pointerId;
    state.current.startX = event.clientX - state.current.x;
    state.current.startY = event.clientY - state.current.y;
    tile.setPointerCapture(event.pointerId);
    tile.classList.add('is-dragging');
    pauseFloat(tile, true);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (state.current.pointer !== event.pointerId) {
      return;
    }

    state.current.x = event.clientX - state.current.startX;
    state.current.y = event.clientY - state.current.startY;

    const tile = event.currentTarget;
    tile.style.setProperty('--drag-x', `${state.current.x}px`);
    tile.style.setProperty('--drag-y', `${state.current.y}px`);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (state.current.pointer !== event.pointerId) {
      return;
    }

    const tile = event.currentTarget;
    state.current.pointer = -1;
    tile.classList.remove('is-dragging');
    if (tile.hasPointerCapture(event.pointerId)) {
      tile.releasePointerCapture(event.pointerId);
    }
    pauseFloat(tile, false);
  }

  return (
    <div
      className={`artifact-orbit is-${artifact.side}`}
      style={orbitStyle}
      aria-hidden="true"
    >
      <div className="artifact-bob">
        <div
          className="artifact-tile"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {artifact.body}
        </div>
      </div>
    </div>
  );
}

export default function ProjectArtifacts({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const artifacts = getArtifacts(projectId, projectName);

  return (
    <div className="project-artifacts" aria-hidden="true">
      {artifacts.map((artifact, index) => (
        <ArtifactTile key={index} artifact={artifact} />
      ))}
    </div>
  );
}
