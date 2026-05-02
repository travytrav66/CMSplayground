import { THEMES } from "../config"

export default function PackagesPreview({ section, sectionSelected, selectedItemId, onSectionClick, onItemClick }) {
    const f = section.fields
    const t = THEMES[f.theme] || THEMES.white
    const vPad = f.padding === "small" ? "64px" : "100px"
    return (
        <div data-section-id={section.id} className={`pb-preview-section${sectionSelected ? " selected" : ""}`} style={{ background: t.sectionBg, padding: `${vPad} 48px` }} onClick={onSectionClick}>
            {sectionSelected && <span className="pb-section-label">Packages</span>}
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: t.heading, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{f.heading}</h2>
                    <p style={{ fontSize: 15, color: t.subheading, margin: 0 }}>{f.subheading}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                    {section.items
                        ?.filter((item) => !item.hidden)
                        .map((item) => {
                            const pf = item.fields
                            const isItemSelected = selectedItemId === item.id
                            const cardBg = pf.featured ? t.featuredBg : t.cardBg
                            const cardFg = pf.featured ? t.featuredFg : t.cardHeading
                            const cardSub = pf.featured ? t.featuredSub : t.cardBody
                            const badgeBg = pf.featured ? t.sectionBg : t.cardBg
                            const badgeFg = pf.featured ? t.heading : t.cardHeading
                            return (
                                <div
                                    key={item.id}
                                    className={`pb-preview-item${isItemSelected ? " selected" : ""}`}
                                    style={{
                                        position: "relative",
                                        padding: "28px 24px",
                                        background: cardBg,
                                        borderRadius: 12,
                                        borderTop: `4px solid ${pf.accentColor || "#ccc"}`,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onItemClick(item.id)
                                    }}>
                                    {isItemSelected && <span className="pb-item-label">Package</span>}
                                    {pf.featured && (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                background: badgeBg,
                                                color: badgeFg,
                                                padding: "3px 8px",
                                                borderRadius: 20,
                                                marginBottom: 14,
                                            }}>
                                            Most Popular
                                        </span>
                                    )}
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: cardFg, margin: "0 0 8px" }}>{pf.name}</h3>
                                    <p style={{ fontSize: 13, color: cardSub, margin: "0 0 20px", lineHeight: 1.5 }}>{pf.description}</p>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                                        <span style={{ fontSize: 32, fontWeight: 800, color: cardFg }}>{pf.price}</span>
                                        <span style={{ fontSize: 13, color: cardSub }}>{pf.period}</span>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
