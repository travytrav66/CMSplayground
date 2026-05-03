import { useState } from "react"
import "./PagesListPage.css"

const BUILDER_TYPES = [
    {
        id: "page",
        label: "Page Builder",
        description: "Build landing pages with heroes, features, galleries, and pricing sections.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
        color: "#4f46e5",
        bg: "#eef2ff",
    },
    {
        id: "article",
        label: "Article Builder",
        description: "Write and design blog posts and news articles with editorial typography.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        color: "#1d4ed8",
        bg: "#eff6ff",
    },
]

const SAMPLE_PAGES = [
    { id: "p1", type: "page",    title: "Homepage",       slug: "/",             status: "published", updatedAt: "May 2, 2026" },
    { id: "p2", type: "page",    title: "Pricing",         slug: "/pricing",      status: "draft",     updatedAt: "Apr 28, 2026" },
    { id: "p3", type: "article", title: "The Future of Web Design", slug: "/blog/future-web-design", status: "published", updatedAt: "May 2, 2026" },
    { id: "p4", type: "article", title: "Getting Started with React", slug: "/blog/react-start",   status: "draft",     updatedAt: "Apr 30, 2026" },
]

export default function PagesListPage({ onOpen, globalSchema, onGlobalSchemaChange }) {
    const [tab, setTab] = useState("all")
    const [siteSettingsOpen, setSiteSettingsOpen] = useState(false)

    const filtered = tab === "all" ? SAMPLE_PAGES : SAMPLE_PAGES.filter((p) => p.type === tab)

    const globalSchemaValid = globalSchema
        ? (() => { try { JSON.parse(globalSchema); return true } catch { return false } })()
        : null

    return (
        <div className="pl-root">
            <header className="pl-header">
                <div className="pl-header-inner">
                    <h1 className="pl-heading">Content</h1>
                    <div className="pl-new-btns">
                        <button
                            className={`pl-site-settings-btn${siteSettingsOpen ? " active" : ""}`}
                            onClick={() => setSiteSettingsOpen((v) => !v)}
                            title="Site Settings"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            Site Settings
                        </button>
                        {BUILDER_TYPES.map((bt) => (
                            <button key={bt.id} className="pl-new-btn" style={{ "--btn-color": bt.color, "--btn-bg": bt.bg }} onClick={() => onOpen(bt.id, null)}>
                                <span className="pl-new-btn-icon">{bt.icon}</span>
                                New {bt.label.split(" ")[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {siteSettingsOpen && (
                <div className="pl-site-settings">
                    <div className="pl-site-settings-inner">
                        <div className="pl-site-settings-section">
                            <div className="pl-site-settings-heading">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                </svg>
                                Global Schema Markup
                                <span className="pl-site-settings-hint">Injected on every page as JSON-LD</span>
                            </div>
                            <textarea
                                className="pl-schema-textarea"
                                value={globalSchema}
                                onChange={(e) => onGlobalSchemaChange(e.target.value)}
                                rows={8}
                                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Your Company",\n  "url": "https://example.com"\n}'}
                                spellCheck={false}
                                autoCorrect="off"
                                autoCapitalize="off"
                            />
                            {globalSchemaValid !== null && (
                                <span className={`pl-schema-status ${globalSchemaValid ? "pl-schema-status--valid" : "pl-schema-status--error"}`}>
                                    {globalSchemaValid ? "✓ Valid JSON" : "✗ Invalid JSON"}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="pl-body">
                <div className="pl-tabs">
                    {[{ id: "all", label: "All" }, { id: "page", label: "Pages" }, { id: "article", label: "Articles" }].map((t) => (
                        <button key={t.id} className={`pl-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="pl-table">
                    <div className="pl-table-head">
                        <div className="pl-col pl-col-title">Title</div>
                        <div className="pl-col pl-col-type">Type</div>
                        <div className="pl-col pl-col-slug">Slug</div>
                        <div className="pl-col pl-col-status">Status</div>
                        <div className="pl-col pl-col-date">Updated</div>
                    </div>
                    {filtered.map((page) => {
                        const bt = BUILDER_TYPES.find((b) => b.id === page.type)
                        return (
                            <button key={page.id} className="pl-table-row" onClick={() => onOpen(page.type, page.id)}>
                                <div className="pl-col pl-col-title">
                                    <span className="pl-row-icon" style={{ color: bt.color, background: bt.bg }}>{bt.icon}</span>
                                    <span className="pl-row-title">{page.title}</span>
                                </div>
                                <div className="pl-col pl-col-type">
                                    <span className="pl-type-badge" style={{ color: bt.color, background: bt.bg }}>{bt.label}</span>
                                </div>
                                <div className="pl-col pl-col-slug pl-slug">{page.slug}</div>
                                <div className="pl-col pl-col-status">
                                    <span className={`pl-status pl-status--${page.status}`}>{page.status}</span>
                                </div>
                                <div className="pl-col pl-col-date pl-date">{page.updatedAt}</div>
                            </button>
                        )
                    })}
                    {filtered.length === 0 && (
                        <div className="pl-empty">No {tab === "all" ? "content" : tab + "s"} yet.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
