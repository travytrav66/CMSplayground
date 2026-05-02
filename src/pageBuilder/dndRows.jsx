import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragHandleIcon, EyeIcon, EyeOffIcon, ChevronRightIcon, TrashIcon } from "./icons"
import { SECTION_META } from "./config"

export function SortableSectionRow({ section, onSelect, onToggleVisibility, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })
    const meta = SECTION_META[section.type] || {}
    const sub = section.fields.heading || section.fields.title || ""
    const hidden = !!section.hidden

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0 : 1 }} className={`pb-section-row${hidden ? " pb-row-hidden" : ""}`} onClick={() => onSelect([section.id])}>
            <span className="pb-drag-handle" {...attributes} {...listeners} onClick={(e) => e.stopPropagation()}>
                <DragHandleIcon />
            </span>
            <div className="pb-section-row-text">
                <div className="pb-section-row-label">{meta.label || section.type}</div>
                {sub && <div className="pb-section-row-sub">{sub}</div>}
            </div>
            <button
                className={`pb-eye-btn${hidden ? " pb-eye-btn--off" : ""}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleVisibility(section.id)
                }}
                title={hidden ? "Show section" : "Hide section"}>
                {hidden ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            <button
                className="pb-row-delete-btn"
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(section.id)
                }}
                title="Delete section">
                <TrashIcon />
            </button>
            <span className="pb-chevron">
                <ChevronRightIcon />
            </span>
        </div>
    )
}

export function SectionRowClone({ section }) {
    const meta = SECTION_META[section.type] || {}
    const sub = section.fields.heading || section.fields.title || ""
    const hidden = !!section.hidden
    return (
        <div className={`pb-section-row pb-row-drag-clone${hidden ? " pb-row-hidden" : ""}`}>
            <span className="pb-drag-handle" style={{ cursor: "grabbing" }}>
                <DragHandleIcon />
            </span>
            <div className="pb-section-row-text">
                <div className="pb-section-row-label">{meta.label || section.type}</div>
                {sub && <div className="pb-section-row-sub">{sub}</div>}
            </div>
            <span className="pb-chevron">
                <ChevronRightIcon />
            </span>
        </div>
    )
}

export function SortableItemRow({ item, isActive, onClick, onToggleHidden, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
    const name = item.fields.name || item.fields.title || item.fields.filename || "Untitled"
    const hidden = !!item.hidden

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0 : 1 }} className={`pb-item-row${isActive ? " active" : ""}${hidden ? " pb-row-hidden" : ""}`} onClick={onClick}>
            <span className="pb-drag-handle pb-drag-handle--sm" {...attributes} {...listeners} onClick={(e) => e.stopPropagation()}>
                <DragHandleIcon />
            </span>
            <div className="pb-item-row-text">
                <div className="pb-item-row-type">{item.type}</div>
                <div className="pb-item-row-name">{name}</div>
            </div>
            <button
                className={`pb-eye-btn${hidden ? " pb-eye-btn--off" : ""}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleHidden()
                }}
                title={hidden ? "Show" : "Hide"}>
                {hidden ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            <button
                className="pb-row-delete-btn"
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                }}
                title="Delete">
                <TrashIcon />
            </button>
            <span className="pb-item-chevron">
                <ChevronRightIcon />
            </span>
        </div>
    )
}

export function ItemRowClone({ item }) {
    const name = item.fields.name || item.fields.title || item.fields.filename || "Untitled"
    const hidden = !!item.hidden
    return (
        <div className={`pb-item-row pb-row-drag-clone${hidden ? " pb-row-hidden" : ""}`}>
            <span className="pb-drag-handle pb-drag-handle--sm" style={{ cursor: "grabbing" }}>
                <DragHandleIcon />
            </span>
            <div className="pb-item-row-text">
                <div className="pb-item-row-type">{item.type}</div>
                <div className="pb-item-row-name">{name}</div>
            </div>
            <span className="pb-item-chevron">
                <ChevronRightIcon />
            </span>
        </div>
    )
}
