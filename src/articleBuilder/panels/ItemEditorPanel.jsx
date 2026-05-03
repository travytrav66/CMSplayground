import { ChevronLeftIcon, TrashIcon } from "../../pageBuilder/icons"
import { SECTION_META, FIELD_DEFS } from "../config"
import FieldInput from "../../pageBuilder/FieldInput"

export default function ItemEditorPanel({ section, item, onBackToSection, onBackToRoot, onFieldChange, onDelete }) {
    const meta = SECTION_META[section.type] || {}
    const fieldDefs = FIELD_DEFS[item.type] || []
    const itemName = item.fields.name || item.fields.title || item.fields.filename || "Image"

    return (
        <div className="pb-editor">
            <div className="pb-editor-header">
                <button className="pb-back-btn" onClick={onBackToSection} title="Back to section"><ChevronLeftIcon /></button>
                <div className="pb-breadcrumb">
                    <button className="pb-breadcrumb-btn" onClick={onBackToRoot}>Article</button>
                    <span className="pb-breadcrumb-sep">›</span>
                    <button className="pb-breadcrumb-btn" onClick={onBackToSection}>{meta.label || section.type}</button>
                    <span className="pb-breadcrumb-sep">›</span>
                    <span className="pb-breadcrumb-current">{itemName}</span>
                </div>
            </div>
            <div className="pb-editor-body">
                <div className="pb-fields">
                    {fieldDefs.map((field) => (
                        <div className="pb-field" key={field.key}>
                            <label className="pb-field-label">{field.label}</label>
                            <FieldInput field={field} value={item.fields[field.key]} onChange={(val) => onFieldChange(field.key, val)} allValues={item.fields} onAnyFieldChange={onFieldChange} />
                        </div>
                    ))}
                    {item.type === "GridImage" && (
                        <>
                            <div className="pb-field">
                                <label className="pb-field-label">Alt Text</label>
                                <input className="pb-input" type="text" value={item.fields.alt ?? ""} onChange={(e) => onFieldChange("alt", e.target.value)} placeholder="Describe the image" />
                            </div>
                            <div className="pb-field">
                                <label className="pb-field-label">Caption</label>
                                <input className="pb-input" type="text" value={item.fields.caption ?? ""} onChange={(e) => onFieldChange("caption", e.target.value)} placeholder="Optional caption" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="pb-delete-area">
                <button className="pb-delete-btn" onClick={onDelete}><TrashIcon /> Remove {item.type === "GridImage" ? "Image" : item.type}</button>
            </div>
        </div>
    )
}
