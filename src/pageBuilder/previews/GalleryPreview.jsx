import { THEMES } from "../config"

function Placeholder({ index }) {
    const hues = [210, 260, 180, 30, 340, 150, 20, 280]
    const hue = hues[index % hues.length]
    return (
        <div
            style={{
                width: "100%",
                paddingBottom: "66.6%",
                borderRadius: 8,
                background: `hsl(${hue}, 25%, 88%)`,
                position: "relative",
            }}
        >
            <svg
                viewBox="0 0 24 24"
                style={{ position: "absolute", inset: 0, margin: "auto", width: 28, height: 28, opacity: 0.35, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                fill="none"
                stroke={`hsl(${hue}, 20%, 55%)`}
                strokeWidth="1.5"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>
        </div>
    )
}

function GalleryImage({ item, isSelected, onClick, index }) {
    const ff = item.fields
    return (
        <div
            className={`pb-preview-item${isSelected ? " selected" : ""}`}
            style={{ position: "relative", borderRadius: 8, overflow: "hidden", cursor: "pointer" }}
            onClick={onClick}
        >
            {isSelected && <span className="pb-item-label">Image</span>}
            {ff.url ? (
                <div style={{ position: "relative" }}>
                    <img
                        src={ff.url}
                        alt={ff.alt || ""}
                        style={{ display: "block", width: "100%", aspectRatio: "3/2", objectFit: "cover", borderRadius: 8 }}
                        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block" }}
                    />
                    <div style={{ display: "none" }}><Placeholder index={index} /></div>
                </div>
            ) : (
                <Placeholder index={index} />
            )}
            {ff.caption && (
                <p style={{ fontSize: 12, color: "#6b7280", margin: "6px 0 0", lineHeight: 1.4 }}>{ff.caption}</p>
            )}
        </div>
    )
}

export default function GalleryPreview({ section, sectionSelected, selectedItemId, onSectionClick, onItemClick }) {
    const f = section.fields
    const t = THEMES[f.theme] || THEMES.white
    const vPad = f.padding === "small" ? "64px" : "100px"
    const layout = f.layout || "3-col"
    const visibleItems = section.items?.filter((item) => !item.hidden) ?? []

    const hasHeader = f.heading || f.subheading

    function renderGrid() {
        if (layout === "masonry") {
            return (
                <div style={{ columns: "3 200px", columnGap: 12 }}>
                    {visibleItems.map((item, i) => (
                        <div key={item.id} style={{ breakInside: "avoid", marginBottom: 12 }}>
                            <GalleryImage
                                item={item}
                                isSelected={selectedItemId === item.id}
                                onClick={(e) => { e.stopPropagation(); onItemClick(item.id) }}
                                index={i}
                            />
                        </div>
                    ))}
                </div>
            )
        }

        if (layout === "featured" && visibleItems.length > 0) {
            const [first, ...rest] = visibleItems
            return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ gridRow: "1 / 3" }}>
                        <GalleryImage
                            item={first}
                            isSelected={selectedItemId === first.id}
                            onClick={(e) => { e.stopPropagation(); onItemClick(first.id) }}
                            index={0}
                        />
                    </div>
                    {rest.map((item, i) => (
                        <GalleryImage
                            key={item.id}
                            item={item}
                            isSelected={selectedItemId === item.id}
                            onClick={(e) => { e.stopPropagation(); onItemClick(item.id) }}
                            index={i + 1}
                        />
                    ))}
                </div>
            )
        }

        const cols = layout === "2-col" ? 2 : layout === "4-col" ? 4 : 3
        return (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
                {visibleItems.map((item, i) => (
                    <GalleryImage
                        key={item.id}
                        item={item}
                        isSelected={selectedItemId === item.id}
                        onClick={(e) => { e.stopPropagation(); onItemClick(item.id) }}
                        index={i}
                    />
                ))}
            </div>
        )
    }

    return (
        <div
            data-section-id={section.id}
            className={`pb-preview-section${sectionSelected ? " selected" : ""}`}
            style={{ background: t.sectionBg, padding: `${vPad} 48px` }}
            onClick={onSectionClick}
        >
            {sectionSelected && <span className="pb-section-label">Gallery</span>}
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                {hasHeader && (
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        {f.heading && (
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: t.heading, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{f.heading}</h2>
                        )}
                        {f.subheading && (
                            <p style={{ fontSize: 15, color: t.subheading, margin: 0 }}>{f.subheading}</p>
                        )}
                    </div>
                )}
                {visibleItems.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0", color: t.subheading, fontSize: 14 }}>
                        No images yet — add some from the sidebar.
                    </div>
                ) : (
                    renderGrid()
                )}
            </div>
        </div>
    )
}
