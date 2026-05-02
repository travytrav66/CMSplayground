import { useRef, useState } from "react"
import { createPortal } from "react-dom"

function ImageEditModal({ alt, caption, onSave, onClose }) {
    const [localAlt, setLocalAlt] = useState(alt ?? "")
    const [localCaption, setLocalCaption] = useState(caption ?? "")

    function handleSave() {
        onSave({ alt: localAlt, caption: localCaption })
        onClose()
    }

    return createPortal(
        <div className="pb-modal-overlay" onMouseDown={onClose}>
            <div className="pb-modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="pb-modal-header">
                    <span className="pb-modal-title">Image Details</span>
                    <button type="button" className="pb-modal-close" onClick={onClose} aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="pb-modal-body">
                    <div className="pb-field">
                        <label className="pb-field-label">Alt Text</label>
                        <input
                            className="pb-input"
                            type="text"
                            value={localAlt}
                            onChange={(e) => setLocalAlt(e.target.value)}
                            placeholder="Describe the image"
                            autoFocus
                        />
                    </div>
                    <div className="pb-field">
                        <label className="pb-field-label">Caption</label>
                        <input
                            className="pb-input"
                            type="text"
                            value={localCaption}
                            onChange={(e) => setLocalCaption(e.target.value)}
                            placeholder="Optional caption"
                        />
                    </div>
                </div>
                <div className="pb-modal-footer">
                    <button type="button" className="pb-modal-cancel" onClick={onClose}>Cancel</button>
                    <button type="button" className="pb-modal-save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default function FieldInput({ field, value, onChange, allValues, onAnyFieldChange }) {
    const fileInputRef = useRef(null)
    const [editModalOpen, setEditModalOpen] = useState(false)

    function handleImageFile(file) {
        if (!file || !file.type.startsWith("image/")) return
        const reader = new FileReader()
        reader.onload = (e) => {
            onChange(e.target.result)
            onAnyFieldChange?.("filename", file.name)
        }
        reader.readAsDataURL(file)
    }

    function getMimeLabel(dataUrl) {
        const match = dataUrl?.match(/^data:image\/([a-zA-Z0-9+]+);/)
        if (!match) return null
        const ext = match[1].toUpperCase()
        return ext === "JPEG" ? "JPG" : ext
    }

    switch (field.type) {
        case "text":
            return <input className="pb-input" type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        case "textarea":
            return <textarea className="pb-input pb-textarea" value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} />
        case "color":
            return (
                <div className="pb-color-row">
                    <input className="pb-color-swatch" type="color" value={value ?? "#ffffff"} onChange={(e) => onChange(e.target.value)} />
                    <input className="pb-input" type="text" value={value ?? "#ffffff"} onChange={(e) => onChange(e.target.value)} style={{ fontFamily: "monospace" }} />
                </div>
            )
        case "select":
            return (
                <select className="pb-input pb-select" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
                    {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )
        case "toggle": {
            const on = !!value
            return (
                <button className="pb-toggle-track" style={{ background: on ? "#6366f1" : "#e5e7eb" }} onClick={() => onChange(!on)} type="button" role="switch" aria-checked={on}>
                    <span className="pb-toggle-thumb" style={{ left: on ? "21px" : "3px" }} />
                </button>
            )
        }
        case "image": {
            const hasImage = !!value
            const filename = allValues?.filename || null
            const mimeLabel = getMimeLabel(value)
            return (
                <>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageFile(e.target.files?.[0])}
                    />
                    {editModalOpen && (
                        <ImageEditModal
                            alt={allValues?.alt}
                            caption={allValues?.caption}
                            onSave={({ alt, caption }) => {
                                onAnyFieldChange?.("alt", alt)
                                onAnyFieldChange?.("caption", caption)
                            }}
                            onClose={() => setEditModalOpen(false)}
                        />
                    )}
                    {hasImage ? (
                        <div className="pb-image-preview-wrap">
                            <img className="pb-image-preview-thumb" src={value} alt="Preview" />
                            <div className="pb-image-preview-meta">
                                {filename && <span className="pb-image-preview-filename">{filename}</span>}
                                {mimeLabel && <span className="pb-image-preview-type">{mimeLabel}</span>}
                            </div>
                            <div className="pb-image-preview-actions">
                                <button
                                    type="button"
                                    className="pb-image-action-btn"
                                    title="Edit details"
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="pb-image-action-btn"
                                    title="Replace image"
                                    onClick={() => {
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = ""
                                            fileInputRef.current.click()
                                        }
                                    }}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="1 4 1 10 7 10" />
                                        <polyline points="23 20 23 14 17 14" />
                                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="pb-image-action-btn pb-image-action-btn--delete"
                                    title="Remove image"
                                    onClick={() => onChange("")}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="pb-image-dropzone"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault()
                                handleImageFile(e.dataTransfer.files?.[0])
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#9ca3af" }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span className="pb-image-dropzone-label">Click or drag to upload</span>
                        </button>
                    )}
                </>
            )
        }
        default:
            return null
    }
}
