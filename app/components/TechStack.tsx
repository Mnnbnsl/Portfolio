'use client';

const row1 = [
  'Python', 'TypeScript', 'JavaScript', 'C++', 'SQL',
  'Node.js', 'Express', 'Next.js', 'React',
  'Python', 'TypeScript', 'JavaScript', 'C++', 'SQL',
  'Node.js', 'Express', 'Next.js', 'React',
];

const row2 = [
  'PyTorch', 'LangChain', 'HuggingFace',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Web Sockets',
  'PyTorch', 'LangChain', 'HuggingFace',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Web Sockets',
];

export default function TechStack() {
  return (
    <section className="marquee-section">
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track left">
          {row1.map((tech, i) => (
            <span key={`r1-${i}`} className="marquee-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track right">
          {row2.map((tech, i) => (
            <span key={`r2-${i}`} className="marquee-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}