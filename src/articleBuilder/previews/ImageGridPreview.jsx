export default function ImageGridPreview({ section, isSelected, selectedItemId, onSectionClick, onItemClick }) {
    const f = section.fields
    const items = section.items ?? []
    const cols = f.layout === "2-col" ? 2 : 3

    return (
        <div data-section-id={section.id} className={`pb-preview-section ab-image-grid${isSelected && !selectedItemId ? " selected" : ""}`} onClick={onSectionClick} style={{ background: "#fff" }}>
            {isSelected && !selectedItemId && <span className="pb-section-label">Image Grid</span>}
            {f.heading && <p className="ab-grid-heading">{f.heading}</p>}
            {items.length > 0 ? (
                <div className="ab-grid-wrap" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {items.map((item) => {
                        const itemSelected = selectedItemId === item.id
                        return (
                            <div key={item.id} className={`ab-grid-cell${itemSelected ? " selected" : ""}${item.hidden ? " ab-grid-cell--hidden" : ""}`} onClick={(e) => { e.stopPropagation(); onItemClick(item.id) }}>
                                {itemSelected && <span className="pb-section-label">Image</span>}
                                {item.fields.url ? (
                                    <img src={item.fields.url} alt={item.fields.alt || ""} className="ab-grid-img" />
                                ) : (
                                    <div className="ab-img-placeholder ab-img-placeholder--small">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#d1d5db" }}>
                                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                )}
                                {item.fields.caption && <p className="ab-grid-caption">{item.fields.caption}</p>}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="ab-grid-empty">No images yet — add images from the sidebar</div>
            )}
        </div>
    )
}
