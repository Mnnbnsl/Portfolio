'use client';

const sections = ["Stack", "Writing", "Personal"];

export default function SectionPreview() {
  return (
    <div className="section-preview" aria-label="Planned portfolio sections">
      {sections.map((section, index) => (
        <div className="preview-row" id={section.toLowerCase()} key={section}>
          <span className="section-index">0{index + 1}</span>
          <h2>{section}</h2>
          <span className="coming-soon">Up next</span>
        </div>
      ))}
    </div>
  );
}
