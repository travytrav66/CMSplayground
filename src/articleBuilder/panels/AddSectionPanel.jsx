import { ChevronLeftIcon, ChevronRightIcon } from "../../pageBuilder/icons"
import { SECTION_META, SECTION_DESCRIPTIONS } from "../config"

export default function AddSectionPanel({ onAdd, onCancel }) {
    return (
        <div className="pb-editor">
            <div className="pb-editor-header">
                <button className="pb-back-btn" onClick={onCancel} title="Cancel"><ChevronLeftIcon /></button>
                <div className="pb-breadcrumb">
                    <button className="pb-breadcrumb-btn" onClick={onCancel}>Article</button>
                    <span className="pb-breadcrumb-sep">›</span>
                    <span className="pb-breadcrumb-current">Add Section</span>
                </div>
            </div>
            <div className="pb-editor-body">
                <div style={{ padding: "14px" }}>
                    <p className="pb-add-section-hint">Choose a section type to add to the article</p>
                    <div className="pb-section-type-list">
                        {Object.entries(SECTION_META).map(([type, meta]) => (
                            <button key={type} className="pb-section-type-card" onClick={() => onAdd(type)}>
                                <div className="pb-section-type-text">
                                    <div className="pb-section-type-name">{meta.label}</div>
                                    <div className="pb-section-type-desc">{SECTION_DESCRIPTIONS[type]}</div>
                                </div>
                                <span className="pb-chevron"><ChevronRightIcon /></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
