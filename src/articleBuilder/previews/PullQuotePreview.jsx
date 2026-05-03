export default function PullQuotePreview({ section, isSelected, onClick }) {
    const f = section.fields
    return (
        <div data-section-id={section.id} className={`pb-preview-section ab-pullquote${isSelected ? " selected" : ""}`} onClick={onClick} style={{ background: "#fff" }}>
            {isSelected && <span className="pb-section-label">Pull Quote</span>}
            <div className="ab-pullquote-col">
                <div className="ab-pullquote-mark">&ldquo;</div>
                <blockquote className="ab-pullquote-text">
                    {f.quote || <span style={{ opacity: 0.3 }}>Add your pull quote here...</span>}
                </blockquote>
                {f.attribution && <cite className="ab-pullquote-attribution">— {f.attribution}</cite>}
            </div>
        </div>
    )
}
