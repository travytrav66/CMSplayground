const SIZE_MAX = { full: "100%", large: "900px", medium: "680px" }

export default function ImageCaptionPreview({ section, isSelected, onClick }) {
    const f = section.fields
    const maxW = SIZE_MAX[f.size] || SIZE_MAX.large
    const align = f.align || "center"
    const marginStyle = align === "center" ? { marginLeft: "auto", marginRight: "auto" }
        : align === "left" ? { marginLeft: 0, marginRight: "auto" }
        : { marginLeft: "auto", marginRight: 0 }

    return (
        <div data-section-id={section.id} className={`pb-preview-section ab-image-caption${isSelected ? " selected" : ""}`} onClick={onClick} style={{ background: "#fff" }}>
            {isSelected && <span className="pb-section-label">Image + Caption</span>}
            <div className="ab-img-caption-wrap" style={{ maxWidth: maxW, ...marginStyle }}>
                {f.coverImage ? (
                    <img src={f.coverImage} alt={f.alt || ""} className="ab-img-caption-img" />
                ) : (
                    <div className="ab-img-placeholder">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#d1d5db" }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span style={{ color: "#9ca3af", fontSize: 13, marginTop: 8 }}>No image uploaded</span>
                    </div>
                )}
                {f.caption && <p className="ab-img-caption-text">{f.caption}</p>}
            </div>
        </div>
    )
}
