import { THEMES } from "../config"

export default function HeroPreview({ section, isSelected, onClick }) {
    const f = section.fields
    const t = THEMES[f.theme] || THEMES.white
    const vPad = f.padding === "small" ? "80px" : "120px"
    return (
        <div data-section-id={section.id} className={`pb-preview-section${isSelected ? " selected" : ""}`} style={{ background: t.sectionBg, padding: `${vPad} 48px` }} onClick={onClick}>
            {isSelected && <span className="pb-section-label">Hero</span>}
            <div style={{ maxWidth: 600, margin: "0 auto", textAlign: f.textAlign || "center" }}>
                {f.eyebrow && <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: t.subheading, marginBottom: 12, opacity: 0.7 }}>{f.eyebrow}</p>}
                <h1 style={{ fontSize: 42, fontWeight: 800, color: t.heading, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" }}>{f.title}</h1>
                <p style={{ fontSize: 16, color: t.subheading, lineHeight: 1.7, margin: "0 0 32px" }}>{f.subtitle}</p>
                {f.ctaText && (
                    <a
                        href={f.ctaUrl || "#"}
                        onClick={(e) => e.preventDefault()}
                        style={{
                            display: "inline-block",
                            padding: "12px 28px",
                            background: t.ctaBg,
                            color: t.ctaFg,
                            fontSize: 14,
                            fontWeight: 600,
                            borderRadius: 10,
                            textDecoration: "none",
                        }}>
                        {f.ctaText}
                    </a>
                )}
            </div>
        </div>
    )
}
