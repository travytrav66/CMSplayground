export default function ArticleHeaderPreview({ section, isSelected, onClick }) {
    const f = section.fields
    return (
        <div data-section-id={section.id} className={`pb-preview-section ab-article-header${isSelected ? " selected" : ""}`} onClick={onClick} style={{ padding: 0, background: "#fff" }}>
            {isSelected && <span className="pb-section-label">Article Header</span>}
            {f.coverImage && (
                <div className="ab-cover-wrap">
                    <img src={f.coverImage} alt={f.title || "Cover"} className="ab-cover-img" />
                </div>
            )}
            <div className="ab-header-content">
                {f.category && <span className="ab-category-pill">{f.category}</span>}
                <h1 className="ab-title">{f.title || <span style={{ opacity: 0.3 }}>Article Title</span>}</h1>
                {f.subtitle && <p className="ab-subtitle">{f.subtitle}</p>}
                <div className="ab-byline">
                    {f.author && <span className="ab-byline-author">{f.author}</span>}
                    {f.author && f.date && <span className="ab-byline-dot">·</span>}
                    {f.date && <span className="ab-byline-date">{f.date}</span>}
                </div>
                <div className="ab-header-rule" />
            </div>
        </div>
    )
}
