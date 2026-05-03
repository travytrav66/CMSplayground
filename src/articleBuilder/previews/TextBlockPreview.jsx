export default function TextBlockPreview({ section, isSelected, onClick }) {
    const paragraphs = (section.fields.body || "").split(/\n{2,}/).filter(Boolean)
    return (
        <div data-section-id={section.id} className={`pb-preview-section ab-text-block${isSelected ? " selected" : ""}`} onClick={onClick} style={{ background: "#fff" }}>
            {isSelected && <span className="pb-section-label">Text Block</span>}
            <div className="ab-prose-col">
                {paragraphs.length > 0
                    ? paragraphs.map((para, i) => <p key={i} className="ab-prose-p">{para}</p>)
                    : <p className="ab-prose-p" style={{ opacity: 0.3 }}>Your article text will appear here...</p>
                }
            </div>
        </div>
    )
}
