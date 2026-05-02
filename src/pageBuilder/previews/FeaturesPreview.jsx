import { THEMES } from "../config"

export default function FeaturesPreview({ section, sectionSelected, selectedItemId, onSectionClick, onItemClick }) {
    const f = section.fields
    const t = THEMES[f.theme] || THEMES.white
    const vPad = f.padding === "small" ? "64px" : "100px"
    return (
        <div data-section-id={section.id} className={`pb-preview-section${sectionSelected ? " selected" : ""}`} style={{ background: t.sectionBg, padding: `${vPad} 48px` }} onClick={onSectionClick}>
            {sectionSelected && <span className="pb-section-label">Features</span>}
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: t.heading, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{f.heading}</h2>
                    <p style={{ fontSize: 15, color: t.subheading, margin: 0 }}>{f.subheading}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {section.items
                        ?.filter((item) => !item.hidden)
                        .map((item) => {
                            const ff = item.fields
                            const isItemSelected = selectedItemId === item.id
                            return (
                                <div
                                    key={item.id}
                                    className={`pb-preview-item${isItemSelected ? " selected" : ""}`}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        gap: 16,
                                        padding: "20px",
                                        background: t.cardBg,
                                        borderRadius: 12,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onItemClick(item.id)
                                    }}>
                                    {isItemSelected && <span className="pb-item-label">Feature</span>}
                                    <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{ff.icon}</div>
                                    <div>
                                        <h3 style={{ fontSize: 15, fontWeight: 700, color: t.cardHeading, margin: "0 0 5px" }}>{ff.title}</h3>
                                        <p style={{ fontSize: 13, color: t.cardBody, margin: 0, lineHeight: 1.55 }}>{ff.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
