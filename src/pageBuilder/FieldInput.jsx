export default function FieldInput({ field, value, onChange }) {
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
        default:
            return null
    }
}
