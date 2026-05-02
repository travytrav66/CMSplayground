import { useState, useEffect, useRef } from "react"
import { GridIcon, DesktopIcon, MobileIcon } from "./icons"
import { initialSections, genId, SECTION_META, DEFAULT_ITEM_FIELDS, DEFAULT_SECTION_FIELDS, VIEWPORTS } from "./config"
import SectionsListPanel from "./panels/SectionsListPanel"
import AddSectionPanel from "./panels/AddSectionPanel"
import SectionEditorPanel from "./panels/SectionEditorPanel"
import ItemEditorPanel from "./panels/ItemEditorPanel"
import HeroPreview from "./previews/HeroPreview"
import PackagesPreview from "./previews/PackagesPreview"
import FeaturesPreview from "./previews/FeaturesPreview"
import "./PageBuilder.css"

export default function PageBuilder() {
    const [sections, setSections] = useState(initialSections)
    // selection: null | [sectionId] | [sectionId, itemId]
    const [selection, setSelection] = useState(null)
    const [viewport, setViewport] = useState("desktop")
    const [addingSection, setAddingSection] = useState(false)
    const [insertAt, setInsertAt] = useState(null)
    const [pageMeta, setPageMeta] = useState({ pageName: "Homepage", slug: "", metaTitle: "", metaDescription: "" })
    // publish state: 'draft' | 'saved' | 'published' | 'modified'
    const [publishStatus, setPublishStatus] = useState("draft")
    const [saveFlash, setSaveFlash] = useState(false)
    const [customWidth, setCustomWidth] = useState(null)
    const [isResizing, setIsResizing] = useState(false)
    const previewFrameRef = useRef(null)

    useEffect(() => { setCustomWidth(null) }, [viewport])

    useEffect(() => {
        if (!selection?.[0] || !previewFrameRef.current) return
        const sectionEl = previewFrameRef.current.querySelector(`[data-section-id="${selection[0]}"]`)
        if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [selection?.[0]])

    function updateMeta(key, value) {
        setPageMeta((prev) => ({ ...prev, [key]: value }))
        setPublishStatus((prev) => (prev === "published" ? "modified" : prev === "saved" ? "modified" : prev))
    }

    function markDirty() {
        setPublishStatus((prev) => (prev === "published" || prev === "saved" ? "modified" : prev))
    }

    function handleSave() {
        setPublishStatus((prev) => (prev === "modified" || prev === "draft" ? "saved" : prev))
        setSaveFlash(true)
        setTimeout(() => setSaveFlash(false), 1800)
    }

    function handlePublish() {
        setPublishStatus("published")
    }

    const selectedSection = selection ? (sections.find((s) => s.id === selection[0]) ?? null) : null
    const selectedItem = selection?.length === 2 ? (selectedSection?.items?.find((i) => i.id === selection[1]) ?? null) : null

    function updateSectionField(sectionId, key, value) {
        setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, fields: { ...s.fields, [key]: value } } : s)))
        markDirty()
    }

    function updateItemField(sectionId, itemId, key, value) {
        setSections((prev) =>
            prev.map((s) =>
                s.id === sectionId
                    ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, fields: { ...i.fields, [key]: value } } : i)) }
                    : s,
            ),
        )
        markDirty()
    }

    function addItem(sectionId, insertAt) {
        const section = sections.find((s) => s.id === sectionId)
        const meta = SECTION_META[section.type]
        if (!meta?.hasItems) return
        const newItem = {
            id: genId(),
            type: meta.itemType,
            fields: { ...DEFAULT_ITEM_FIELDS[meta.itemType] },
        }
        setSections((prev) =>
            prev.map((s) => {
                if (s.id !== sectionId) return s
                const items = [...(s.items ?? [])]
                const idx = insertAt !== undefined ? insertAt : items.length
                items.splice(idx, 0, newItem)
                return { ...s, items }
            }),
        )
        setSelection([sectionId, newItem.id])
    }

    function reorderSections(fromIndex, toIndex) {
        setSections((prev) => {
            const next = [...prev]
            const [moved] = next.splice(fromIndex, 1)
            next.splice(toIndex, 0, moved)
            return next
        })
    }

    function addSection(type) {
        const newSection = {
            id: genId(),
            type,
            fields: { ...DEFAULT_SECTION_FIELDS[type] },
            ...(SECTION_META[type]?.hasItems ? { items: [] } : {}),
        }
        setSections((prev) => {
            const next = [...prev]
            const idx = insertAt !== null ? insertAt : next.length
            next.splice(idx, 0, newSection)
            return next
        })
        setAddingSection(false)
        setInsertAt(null)
        setSelection([newSection.id])
    }

    function deleteSection(sectionId) {
        setSections((prev) => prev.filter((s) => s.id !== sectionId))
        setSelection(null)
    }

    function reorderItems(sectionId, fromIndex, toIndex) {
        setSections((prev) =>
            prev.map((s) => {
                if (s.id !== sectionId) return s
                const items = [...s.items]
                const [moved] = items.splice(fromIndex, 1)
                items.splice(toIndex, 0, moved)
                return { ...s, items }
            }),
        )
    }

    function toggleSectionVisibility(sectionId) {
        setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, hidden: !s.hidden } : s)))
        markDirty()
    }

    function toggleItemVisibility(sectionId, itemId) {
        setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, hidden: !i.hidden } : i)) } : s)))
        markDirty()
    }

    function deleteItem(sectionId, itemId) {
        setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s)))
        setSelection([sectionId])
    }

    function handleSectionClick(sectionId) {
        if (selection?.length === 1 && selection[0] === sectionId) return
        setSelection([sectionId])
    }

    function handleItemClick(sectionId, itemId) {
        setSelection([sectionId, itemId])
    }

    function renderSidebar() {
        if (addingSection) {
            return <AddSectionPanel onAdd={addSection} onCancel={() => setAddingSection(false)} />
        }

        if (selectedItem && selection.length === 2) {
            return (
                <ItemEditorPanel
                    section={selectedSection}
                    item={selectedItem}
                    onBackToSection={() => setSelection([selection[0]])}
                    onBackToRoot={() => setSelection(null)}
                    onFieldChange={(key, val) => updateItemField(selection[0], selectedItem.id, key, val)}
                    onDelete={() => deleteItem(selection[0], selectedItem.id)}
                />
            )
        }

        if (selectedSection && selection.length === 1) {
            return (
                <SectionEditorPanel
                    section={selectedSection}
                    selection={selection}
                    onBack={() => setSelection(null)}
                    onNavigateToItem={(itemId) => setSelection([selection[0], itemId])}
                    onFieldChange={(key, val) => updateSectionField(selectedSection.id, key, val)}
                    onAddItem={(idx) => addItem(selectedSection.id, idx)}
                    onDeleteSection={() => deleteSection(selectedSection.id)}
                    onReorderItems={(from, to) => reorderItems(selectedSection.id, from, to)}
                    onToggleItemVisibility={(itemId) => toggleItemVisibility(selectedSection.id, itemId)}
                />
            )
        }

        return (
            <SectionsListPanel
                sections={sections}
                onSelect={(sel) => {
                    setAddingSection(false)
                    setSelection(sel)
                }}
                onToggleVisibility={toggleSectionVisibility}
                onStartAdd={(index) => {
                    setSelection(null)
                    setInsertAt(index ?? null)
                    setAddingSection(true)
                }}
                onReorder={reorderSections}
                meta={pageMeta}
                onMetaChange={updateMeta}
            />
        )
    }

    function renderPreview() {
        return sections.map((section) => {
            if (section.hidden) return null
            const sectionSelected = selection?.[0] === section.id && !selection?.[1]
            const selectedItemId = selection?.[0] === section.id ? (selection?.[1] ?? null) : null

            switch (section.type) {
                case "Hero":
                    return <HeroPreview key={section.id} section={section} isSelected={sectionSelected} onClick={() => handleSectionClick(section.id)} />
                case "Packages":
                    return <PackagesPreview key={section.id} section={section} sectionSelected={sectionSelected} selectedItemId={selectedItemId} onSectionClick={() => handleSectionClick(section.id)} onItemClick={(itemId) => handleItemClick(section.id, itemId)} />
                case "Features":
                    return <FeaturesPreview key={section.id} section={section} sectionSelected={sectionSelected} selectedItemId={selectedItemId} onSectionClick={() => handleSectionClick(section.id)} onItemClick={(itemId) => handleItemClick(section.id, itemId)} />
                default:
                    return null
            }
        })
    }

    const activeViewport = VIEWPORTS.find((v) => v.id === viewport)

    function startResize(e, side) {
        e.preventDefault()
        const startX = e.clientX
        const startW = customWidth ?? parseFloat(activeViewport.width)
        const maxW = previewFrameRef.current ? previewFrameRef.current.clientWidth - 40 : Infinity
        setIsResizing(true)

        function onMove(ev) {
            const delta = ev.clientX - startX
            const newW = side === "right" ? Math.min(maxW, Math.max(280, startW + delta)) : Math.min(maxW, Math.max(280, startW - delta))
            setCustomWidth(newW)
        }
        function onUp() {
            setIsResizing(false)
            document.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseup", onUp)
        }
        document.addEventListener("mousemove", onMove)
        document.addEventListener("mouseup", onUp)
    }

    const frameWidth = viewport === "desktop" ? "100%" : customWidth !== null ? `${customWidth}px` : activeViewport.width

    return (
        <div className="pb-root">
            <aside className="pb-sidebar">
                <div className="pb-topbar">
                    <div className="pb-topbar-logo">
                        <div className="pb-topbar-icon">
                            <GridIcon />
                        </div>
                        Page Builder
                    </div>
                </div>
                {renderSidebar()}
            </aside>

            <main className="pb-preview-pane">
                <div className="pb-preview-toolbar">
                    <div className="pb-toolbar-left">
                        <span className="pb-preview-label">Live Preview</span>
                    </div>

                    <div className="pb-viewport-switcher">
                        {VIEWPORTS.map((vp) => (
                            <button key={vp.id} className={`pb-viewport-btn${viewport === vp.id ? " active" : ""}`} onClick={() => setViewport(vp.id)} title={vp.label}>
                                {vp.id === "desktop" ? <DesktopIcon /> : <MobileIcon />}
                            </button>
                        ))}
                    </div>

                    <div className="pb-toolbar-right">
                        <span className={`pb-publish-status pb-publish-status--${publishStatus}`}>
                            <span className="pb-publish-status-dot" />
                            {publishStatus === "published" && "Published"}
                            {publishStatus === "modified" && "Unpublished changes"}
                            {publishStatus === "saved" && "Saved · Not published"}
                            {publishStatus === "draft" && "Draft"}
                        </span>
                        <button className={`pb-save-btn${saveFlash ? " pb-save-btn--flash" : ""}`} onClick={handleSave}>
                            {saveFlash ? "Saved ✓" : "Save"}
                        </button>
                        <button className="pb-publish-btn" onClick={handlePublish} disabled={publishStatus === "published"}>
                            Publish
                        </button>
                    </div>
                </div>

                <div className="pb-preview-frame-outer" ref={previewFrameRef}>
                    <div className={`pb-resize-wrapper${isResizing ? " resizing" : ""}`} style={{ width: frameWidth, maxWidth: "100%" }}>
                        {viewport !== "desktop" && (
                            <div className="pb-resize-handle pb-resize-handle--left" onMouseDown={(e) => startResize(e, "left")}>
                                <div className="pb-resize-handle-grip" />
                            </div>
                        )}
                        <div className="pb-preview-frame">
                            {renderPreview()}
                        </div>
                        {viewport !== "desktop" && (
                            <div className="pb-resize-handle pb-resize-handle--right" onMouseDown={(e) => startResize(e, "right")}>
                                <div className="pb-resize-handle-grip" />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
