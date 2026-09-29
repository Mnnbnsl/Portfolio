import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Manan Bansal — AI & Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050605',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Live indicator block */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#999f97',
            fontFamily: 'monospace',
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '32px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#b7f34a',
              borderRadius: '50%',
            }}
          />
          available for collaborations
        </div>

        {/* Heading */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 800,
            color: '#edf0e6',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: '12px',
            zIndex: 10,
          }}
        >
          Manan Bansal
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: 600,
            color: '#b7f34a',
            marginBottom: '40px',
            zIndex: 10,
          }}
        >
          AI & Full-Stack Developer
        </div>

        {/* Footer info line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: '#7a8079',
            fontFamily: 'monospace',
            fontSize: '18px',
            borderTop: '1px solid rgba(237,240,230,0.08)',
            paddingTop: '24px',
            marginTop: 'auto',
            zIndex: 10,
          }}
        >
          <span>mananbansal.dev</span>
          <span>NIT Jalandhar</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
