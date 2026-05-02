let _idCounter = 100
export function genId() {
    return `el-${++_idCounter}`
}

export const initialSections = [
    {
        id: "s-hero",
        type: "Hero",
        fields: {
            theme: "beige",
            textAlign: "center",
            eyebrow: "Welcome",
            title: "Build Pages That Convert",
            subtitle: "A powerful yet simple page builder that lets your team create stunning pages without writing a line of code.",
            ctaText: "Get Started",
            ctaUrl: "#",
        },
    },
    {
        id: "s-packages",
        type: "Packages",
        fields: {
            theme: "white",
            heading: "Choose Your Package",
            subheading: "Find the perfect plan for your needs",
        },
        items: [
            {
                id: "pkg-rose",
                type: "Package",
                fields: {
                    name: "The Beginner",
                    description: "Perfect for individuals just getting started.",
                    price: "$9",
                    period: "/month",
                    featured: false,
                    accentColor: "#e8b4b8",
                },
            },
            {
                id: "pkg-blush",
                type: "Package",
                fields: {
                    name: "The Pro",
                    description: "Great for growing teams and small businesses.",
                    price: "$29",
                    period: "/month",
                    featured: true,
                    accentColor: "#c9a0dc",
                },
            },
            {
                id: "pkg-pour",
                type: "Package",
                fields: {
                    name: "The Expert",
                    description: "For large organizations that need it all.",
                    price: "$99",
                    period: "/month",
                    featured: false,
                    accentColor: "#a8c5da",
                },
            },
        ],
    },
    {
        id: "s-features",
        type: "Features",
        fields: {
            theme: "beige",
            heading: "Why Teams Love Us",
            subheading: "Everything you need to succeed, nothing you don't",
        },
        items: [
            {
                id: "feat-1",
                type: "Feature",
                fields: { icon: "⚡", title: "Lightning Fast", description: "Optimized for performance at any scale." },
            },
            {
                id: "feat-2",
                type: "Feature",
                fields: { icon: "✨", title: "Easy to Use", description: "Intuitive interface anyone can master in minutes." },
            },
            {
                id: "feat-3",
                type: "Feature",
                fields: { icon: "🔒", title: "Secure by Default", description: "Enterprise-grade security built into every layer." },
            },
            {
                id: "feat-4",
                type: "Feature",
                fields: { icon: "🌍", title: "Global CDN", description: "Deliver content fast to users anywhere in the world." },
            },
        ],
    },
    {
        id: "s-gallery",
        type: "Gallery",
        fields: {
            theme: "white",
            padding: "default",
            layout: "3-col",
            heading: "Gallery",
            subheading: "",
        },
        items: [],
    },
]

export const THEME_OPTIONS = [
    { value: "white", label: "White" },
    { value: "beige", label: "Beige" },
    { value: "black", label: "Black" },
]

export const THEMES = {
    white: {
        sectionBg: "#ffffff",
        heading: "#111827",
        subheading: "#6b7280",
        cardBg: "#f9fafb",
        cardHeading: "#111827",
        cardBody: "#6b7280",
        featuredBg: "#111827",
        featuredFg: "#ffffff",
        featuredSub: "#9ca3af",
        ctaBg: "#111827",
        ctaFg: "#ffffff",
    },
    beige: {
        sectionBg: "#faf7f4",
        heading: "#111827",
        subheading: "#78716c",
        cardBg: "#f0ebe4",
        cardHeading: "#111827",
        cardBody: "#78716c",
        featuredBg: "#111827",
        featuredFg: "#ffffff",
        featuredSub: "#9ca3af",
        ctaBg: "#111827",
        ctaFg: "#ffffff",
    },
    black: {
        sectionBg: "#111827",
        heading: "#f9fafb",
        subheading: "#9ca3af",
        cardBg: "#1f2937",
        cardHeading: "#f9fafb",
        cardBody: "#9ca3af",
        featuredBg: "#f9fafb",
        featuredFg: "#111827",
        featuredSub: "#6b7280",
        ctaBg: "#ffffff",
        ctaFg: "#111827",
    },
}

export const TEXT_ALIGN_OPTIONS = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
]

export const PADDING_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "small", label: "Small" },
]

export const LAYOUT_OPTIONS = [
    { value: "2-col", label: "2 Columns" },
    { value: "3-col", label: "3 Columns" },
    { value: "4-col", label: "4 Columns" },
    { value: "masonry", label: "Masonry" },
    { value: "featured", label: "Featured (1 large + grid)" },
]

export const FIELD_DEFS = {
    Hero: [
        { key: "theme", label: "Theme", type: "select", options: THEME_OPTIONS, group: "style" },
        { key: "padding", label: "Padding", type: "select", options: PADDING_OPTIONS, group: "style" },
        { key: "textAlign", label: "Text Alignment", type: "select", options: TEXT_ALIGN_OPTIONS, group: "style" },
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
        { key: "ctaText", label: "Button Text", type: "text" },
        { key: "ctaUrl", label: "Button URL", type: "text" },
    ],
    Packages: [
        { key: "theme", label: "Theme", type: "select", options: THEME_OPTIONS, group: "style" },
        { key: "padding", label: "Padding", type: "select", options: PADDING_OPTIONS, group: "style" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
    ],
    Package: [
        { key: "name", label: "Name", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "price", label: "Price", type: "text" },
        { key: "period", label: "Period", type: "text" },
        { key: "featured", label: "Featured", type: "toggle" },
        { key: "accentColor", label: "Accent Color", type: "color" },
    ],
    Features: [
        { key: "theme", label: "Theme", type: "select", options: THEME_OPTIONS, group: "style" },
        { key: "padding", label: "Padding", type: "select", options: PADDING_OPTIONS, group: "style" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
    ],
    Feature: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
    ],
    Gallery: [
        { key: "theme", label: "Theme", type: "select", options: THEME_OPTIONS, group: "style" },
        { key: "padding", label: "Padding", type: "select", options: PADDING_OPTIONS, group: "style" },
        { key: "layout", label: "Layout", type: "select", options: LAYOUT_OPTIONS, group: "style" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
    ],
    Image: [
        { key: "url", label: "Image", type: "image" },
    ],
}

export const SECTION_META = {
    Hero: { icon: "🖼", label: "Hero Section", bgColor: "#f0f4ff", hasItems: false },
    Packages: { icon: "📦", label: "Packages", bgColor: "#fff7ed", hasItems: true, itemType: "Package" },
    Features: { icon: "⭐", label: "Features", bgColor: "#f0fdf4", hasItems: true, itemType: "Feature" },
    Gallery: { icon: "🖼", label: "Gallery", bgColor: "#fdf4ff", hasItems: true, itemType: "Image" },
}

export const DEFAULT_ITEM_FIELDS = {
    Package: { name: "New Package", description: "Package description", price: "$0", period: "/month", featured: false, accentColor: "#cccccc" },
    Feature: { title: "New Feature", description: "Feature description" },
    Image: { url: "", alt: "", caption: "", filename: "" },
}

export const DEFAULT_SECTION_FIELDS = {
    Hero: { theme: "white", padding: "default", textAlign: "center", eyebrow: "", title: "New Hero Section", subtitle: "Add your subtitle here.", ctaText: "Learn More", ctaUrl: "#" },
    Packages: { theme: "white", padding: "default", heading: "Our Packages", subheading: "Choose the plan that works for you" },
    Features: { theme: "white", padding: "default", heading: "Features", subheading: "Everything you need to succeed" },
    Gallery: { theme: "white", padding: "default", layout: "3-col", heading: "", subheading: "" },
}

export const SECTION_DESCRIPTIONS = {
    Hero: "Full-width banner with title, subtitle, and a call-to-action button",
    Packages: "Pricing cards — add and edit individual package items",
    Features: "Icon + text feature grid with nested feature items",
    Gallery: "Image grid with multiple layout options",
}

export const VIEWPORTS = [
    { id: "desktop", label: "Desktop", width: "100%" },
    { id: "mobile", label: "Mobile", width: "390px" },
]
