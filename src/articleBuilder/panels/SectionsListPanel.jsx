import { useState } from "react"
import { DndContext, DragOverlay, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableSectionRow, SectionRowClone } from "../../pageBuilder/dndRows"
import { ChevronRightIcon, PlusIcon, LayersIcon, SettingsGearIcon } from "../../pageBuilder/icons"

export default function SectionsListPanel({ sections, onSelect, onStartAdd, onReorder, onToggleVisibility, onDeleteSection, meta, onMetaChange, schemaIsManual, onSchemaReset }) {
    const [activeId, setActiveId] = useState(null)
    const [sectionsOpen, setSectionsOpen] = useState(true)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const activeSection = activeId ? sections.find((s) => s.id === activeId) : null
    const isDragging = activeId !== null

    function handleDragStart({ active }) { setActiveId(active.id) }
    function handleDragEnd({ active, over }) {
        setActiveId(null)
        if (over && active.id !== over.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id)
            const newIndex = sections.findIndex((s) => s.id === over.id)
            onReorder(oldIndex, newIndex)
        }
    }

    return (
        <div className="pb-sidebar-content">
            <div className="pb-section-list-header">
                <h2>{meta.articleTitle || "Untitled Article"}</h2>
            </div>
            <div className="pb-section-list">
                <div className="pb-accordion">
                    <button className={`pb-accordion-header${settingsOpen ? " open" : ""}`} onClick={() => setSettingsOpen((v) => !v)}>
                        <span className="pb-accordion-label-group">
                            <span className="pb-accordion-icon"><SettingsGearIcon /></span>
                            <span className="pb-accordion-label">Article Settings</span>
                        </span>
                        <span className={`pb-accordion-chevron${settingsOpen ? " open" : ""}`}><ChevronRightIcon /></span>
                    </button>
                    {settingsOpen && (
                        <div className="pb-accordion-body">
                            <div className="pb-fields">
                                <div className="pb-field">
                                    <label className="pb-field-label">Article Title</label>
                                    <input className="pb-input" type="text" value={meta.articleTitle} onChange={(e) => onMetaChange("articleTitle", e.target.value)} placeholder="My Article" />
                                </div>
                                <div className="pb-field">
                                    <label className="pb-field-label">URL Slug</label>
                                    <div className="pb-slug-row">
                                        <span className="pb-slug-prefix">/blog/</span>
                                        <input className="pb-input pb-slug-input" type="text" value={meta.slug.replace(/^\//, "")} onChange={(e) => onMetaChange("slug", "/" + e.target.value.replace(/^\/+/, "").replace(/\s+/g, "-").toLowerCase())} placeholder="my-article" />
                                    </div>
                                </div>
                                <div className="pb-field">
                                    <label className="pb-field-label">Meta Title</label>
                                    <input className="pb-input" type="text" value={meta.metaTitle} onChange={(e) => onMetaChange("metaTitle", e.target.value)} placeholder="Title for search engines" />
                                </div>
                                <div className="pb-field">
                                    <label className="pb-field-label">Meta Description</label>
                                    <textarea className="pb-input pb-textarea" value={meta.metaDescription} onChange={(e) => onMetaChange("metaDescription", e.target.value)} rows={3} placeholder="Brief description for search results" />
                                </div>
                                <div className="pb-field">
                                    <div className="pb-schema-label-row">
                                        <label className="pb-field-label">
                                            Schema Markup
                                            <span className="pb-field-hint"> — JSON-LD, this article only</span>
                                        </label>
                                        {schemaIsManual && (
                                            <button className="pb-schema-reset-btn" onClick={onSchemaReset} type="button">
                                                ↺ Reset to auto
                                            </button>
                                        )}
                                    </div>
                                    <textarea
                                        className="pb-input pb-textarea pb-schema-textarea"
                                        value={meta.schema}
                                        onChange={(e) => onMetaChange("schema", e.target.value)}
                                        rows={6}
                                        spellCheck={false}
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                    />
                                    {meta.schema && (() => {
                                        try {
                                            JSON.parse(meta.schema)
                                            return (
                                                <span className="pb-schema-status pb-schema-status--valid">
                                                    {schemaIsManual ? "✓ Valid JSON" : "✓ Auto-generated · Valid JSON"}
                                                </span>
                                            )
                                        } catch {
                                            return <span className="pb-schema-status pb-schema-status--error">✗ Invalid JSON</span>
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="pb-accordion">
                    <button className={`pb-accordion-header${sectionsOpen ? " open" : ""}`} onClick={() => setSectionsOpen((v) => !v)}>
                        <span className="pb-accordion-label-group">
                            <span className="pb-accordion-icon"><LayersIcon /></span>
                            <span className="pb-accordion-label">Article Sections ({sections.length})</span>
                        </span>
                        <span className={`pb-accordion-chevron${sectionsOpen ? " open" : ""}`}><ChevronRightIcon /></span>
                    </button>
                    {sectionsOpen && (
                        <div className="pb-accordion-body pb-accordion-body--flush">
                            <div className="pb-items-list">
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                                    <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                                        {!isDragging && sections.length > 0 && (
                                            <div className="pb-insert-zone">
                                                <button className="pb-insert-btn" onClick={() => onStartAdd(0)}><PlusIcon /></button>
                                            </div>
                                        )}
                                        {sections.map((section, idx) => (
                                            <div key={section.id}>
                                                <SortableSectionRow section={section} onSelect={onSelect} onToggleVisibility={onToggleVisibility} onDelete={onDeleteSection} />
                                                {!isDragging && idx < sections.length - 1 && (
                                                    <div className="pb-insert-zone">
                                                        <button className="pb-insert-btn" onClick={() => onStartAdd(idx + 1)}><PlusIcon /></button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </SortableContext>
                                    <DragOverlay dropAnimation={null}>{activeSection ? <SectionRowClone section={activeSection} /> : null}</DragOverlay>
                                </DndContext>
                            </div>
                            <button className="pb-add-full-btn" onClick={() => onStartAdd(sections.length)}>
                                <PlusIcon /> Add Section
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
