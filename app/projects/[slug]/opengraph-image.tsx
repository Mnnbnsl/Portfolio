import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/app/lib/projects';
import { SITE_NAME, SITE_URL } from '@/app/lib/site';

export const alt = 'Project case study by Manan Bansal';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

function truncate(value: string, limit: number): string {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const name = project?.name ?? 'Project';
  const domain = project?.domain ?? 'Engineering';
  const description = truncate(
    project?.description ??
      'An engineering case study covering architecture, trade-offs, and implementation.',
    150
  );
  const tags = project?.tags.slice(0, 4) ?? [];
  const year = project?.year;
  const host = SITE_URL.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '72px',
          background: '#050605',
          color: '#edf0e6',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: '#b7f34a',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#b7f34a',
              fontFamily: 'monospace',
              fontSize: '18px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#b7f34a',
              }}
            />
            Case study
          </div>

          <div
            style={{
              display: 'flex',
              color: '#7a8079',
              fontFamily: 'monospace',
              fontSize: '18px',
              letterSpacing: '2px',
            }}
          >
            {domain}
            {year ? ` · ${year}` : ''}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '78px',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-2.5px',
            maxWidth: '960px',
            color: '#edf0e6',
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '26px',
            maxWidth: '920px',
            fontSize: '28px',
            lineHeight: 1.45,
            color: '#999f97',
          }}
        >
          {description}
        </div>

        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '34px',
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(237, 240, 230, 0.2)',
                  color: '#edf0e6',
                  fontFamily: 'monospace',
                  fontSize: '18px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: 'auto',
            paddingTop: '26px',
            borderTop: '1px solid rgba(237, 240, 230, 0.12)',
            color: '#7a8079',
            fontFamily: 'monospace',
            fontSize: '18px',
          }}
        >
          <span>{SITE_NAME}</span>
          <span>{host}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
