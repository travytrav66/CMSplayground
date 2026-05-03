import { useState } from "react"
import { DndContext, DragOverlay, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItemRow, ItemRowClone } from "../../pageBuilder/dndRows"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, TrashIcon, PaintbrushIcon, FileTextIcon, ListIcon } from "../../pageBuilder/icons"
import { SECTION_META, FIELD_DEFS } from "../config"
import FieldInput from "../../pageBuilder/FieldInput"

function Accordion({ label, icon, open, onToggle, children, bodyClass }) {
    return (
        <div className="pb-accordion">
            <button className={`pb-accordion-header${open ? " open" : ""}`} onClick={onToggle}>
                <span className="pb-accordion-label-group">
                    {icon && <span className="pb-accordion-icon">{icon}</span>}
                    <span className="pb-accordion-label">{label}</span>
                </span>
                <span className={`pb-accordion-chevron${open ? " open" : ""}`}><ChevronRightIcon /></span>
            </button>
            {open && <div className={`pb-accordion-body${bodyClass ? ` ${bodyClass}` : ""}`}>{children}</div>}
        </div>
    )
}

export default function SectionEditorPanel({ section, selection, onBack, onNavigateToItem, onFieldChange, onAddItem, onDeleteSection, onDeleteItem, onReorderItems, onToggleItemVisibility }) {
    const meta = SECTION_META[section.type] || {}
    const fieldDefs = FIELD_DEFS[section.type] || []
    const selectedItemId = selection[1] ?? null
    const items = section.items ?? []

    const styleFields = fieldDefs.filter((f) => f.group === "style")
    const contentFields = fieldDefs.filter((f) => f.group !== "style")

    const [openStyles, setOpenStyles] = useState(true)
    const [openContent, setOpenContent] = useState(true)
    const [openItems, setOpenItems] = useState(true)
    const [activeId, setActiveId] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const activeItem = activeId ? items.find((i) => i.id === activeId) : null
    const isDragging = activeId !== null

    function handleDragStart({ active }) { setActiveId(active.id) }
    function handleDragEnd({ active, over }) {
        setActiveId(null)
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)
            onReorderItems(oldIndex, newIndex)
        }
    }

    return (
        <div className="pb-editor">
            <div className="pb-editor-header">
                <button className="pb-back-btn" onClick={onBack} title="Back to article"><ChevronLeftIcon /></button>
                <div className="pb-breadcrumb">
                    <button className="pb-breadcrumb-btn" onClick={onBack}>Article</button>
                    <span className="pb-breadcrumb-sep">›</span>
                    <span className="pb-breadcrumb-current">{meta.label || section.type}</span>
                </div>
            </div>
            <div className="pb-editor-body">
                {styleFields.length > 0 && (
                    <Accordion label="Styles" icon={<PaintbrushIcon />} open={openStyles} onToggle={() => setOpenStyles((v) => !v)}>
                        <div className="pb-fields">
                            {styleFields.map((field) => (
                                <div className="pb-field" key={field.key}>
                                    <label className="pb-field-label">{field.label}</label>
                                    <FieldInput field={field} value={section.fields[field.key]} onChange={(val) => onFieldChange(field.key, val)} />
                                </div>
                            ))}
                        </div>
                    </Accordion>
                )}
                {contentFields.length > 0 && (
                    <Accordion label="Content" icon={<FileTextIcon />} open={openContent} onToggle={() => setOpenContent((v) => !v)}>
                        <div className="pb-fields">
                            {contentFields.map((field) => (
                                <div className="pb-field" key={field.key}>
                                    <label className="pb-field-label">{field.label}</label>
                                    <FieldInput field={field} value={section.fields[field.key]} onChange={(val) => onFieldChange(field.key, val)} allValues={section.fields} onAnyFieldChange={onFieldChange} />
                                </div>
                            ))}
                        </div>
                    </Accordion>
                )}
                {meta.hasItems && (
                    <Accordion label={`${meta.itemType}s (${items.length})`} icon={<ListIcon />} open={openItems} onToggle={() => setOpenItems((v) => !v)} bodyClass="pb-accordion-body--flush">
                        <div className="pb-items-list">
                            {items.length > 0 && (
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                                    <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                                        {!isDragging && (
                                            <div className="pb-insert-zone">
                                                <button className="pb-insert-btn" onClick={() => onAddItem(0)}><PlusIcon /></button>
                                            </div>
                                        )}
                                        {items.map((item, idx) => (
                                            <div key={item.id}>
                                                <SortableItemRow item={item} isActive={selectedItemId === item.id} onClick={() => onNavigateToItem(item.id)} onToggleHidden={() => onToggleItemVisibility(item.id)} onDelete={() => onDeleteItem(item.id)} />
                                                {!isDragging && idx < items.length - 1 && (
                                                    <div className="pb-insert-zone">
                                                        <button className="pb-insert-btn" onClick={() => onAddItem(idx + 1)}><PlusIcon /></button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </SortableContext>
                                    <DragOverlay dropAnimation={null}>{activeItem ? <ItemRowClone item={activeItem} /> : null}</DragOverlay>
                                </DndContext>
                            )}
                        </div>
                        <button className="pb-add-full-btn" onClick={() => onAddItem()}>
                            <PlusIcon /> Add {meta.itemType}
                        </button>
                    </Accordion>
                )}
            </div>
            <div className="pb-delete-area">
                <button className="pb-delete-btn" onClick={onDeleteSection}><TrashIcon /> Remove Section</button>
            </div>
        </div>
    )
}
