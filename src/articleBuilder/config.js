export { genId } from "../pageBuilder/config"

export const initialSections = [
    {
        id: "a-header",
        type: "ArticleHeader",
        fields: {
            title: "The Future of Web Design: How AI is Changing the Way We Build",
            subtitle: "From layout generation to copy suggestions, artificial intelligence is quietly reshaping every corner of the modern design workflow.",
            author: "Jamie Chen",
            date: "May 2, 2026",
            category: "Design",
            coverImage: "",
        },
    },
    {
        id: "a-text-1",
        type: "TextBlock",
        fields: {
            body: "For decades, web design has been defined by a cycle of prototyping, feedback, and iteration — a slow, human-driven loop that demands both creativity and patience. But in the last two years, that loop has been quietly disrupted.\n\nA new generation of AI-powered tools is beginning to handle tasks that once required hours of careful manual work: generating layout variants, suggesting typographic hierarchies, predicting which visual elements will draw the user's eye. The question is no longer whether AI will influence design. It's how deep that influence will run.",
        },
    },
    {
        id: "a-pullquote-1",
        type: "PullQuote",
        fields: {
            quote: "Design is not just about how something looks. It's about how it works — and AI is getting very good at understanding both.",
            attribution: "Jamie Chen",
        },
    },
    {
        id: "a-text-2",
        type: "TextBlock",
        fields: {
            body: "The most immediate impact has been in prototyping. Tools that once required a designer to manually drag, drop, and resize components can now infer structure from a single sentence prompt. Teams that previously spent a full sprint on wireframes are shipping polished concepts in a day.\n\nBut speed is only half the story. The deeper shift is in accessibility — AI is lowering the barrier to entry for teams that couldn't afford dedicated design resources. Small startups and solo founders now have access to design intelligence that was previously locked inside expensive agencies.",
        },
    },
    {
        id: "a-img-1",
        type: "ImageCaption",
        fields: {
            coverImage: "",
            caption: "A designer reviewing AI-generated layout suggestions in a modern browser-based tool.",
            size: "large",
            align: "center",
        },
    },
    {
        id: "a-text-3",
        type: "TextBlock",
        fields: {
            body: "Of course, not everyone is celebrating. Senior designers worry about homogenisation — that AI-generated aesthetics will flatten the visual diversity of the web into a single, optimised-but-soulless style. It's a fair concern. When millions of teams use the same underlying models, convergence is almost inevitable.\n\nThe most thoughtful designers working with AI today treat it less like an oracle and more like a very fast junior colleague: useful for volume work and rapid exploration, but requiring constant creative direction. The goal isn't to replace human taste. It's to remove the friction between having an idea and seeing it on screen.",
        },
    },
    {
        id: "a-grid-1",
        type: "ImageGrid",
        fields: { heading: "", layout: "3-col" },
        items: [],
    },
]

export const IMAGE_SIZE_OPTIONS = [
    { value: "medium", label: "Medium (680px)" },
    { value: "large",  label: "Large (900px)" },
    { value: "full",   label: "Full Width" },
]

export const IMAGE_ALIGN_OPTIONS = [
    { value: "center", label: "Center" },
    { value: "left",   label: "Left" },
    { value: "right",  label: "Right" },
]

export const GRID_LAYOUT_OPTIONS = [
    { value: "2-col", label: "2 Columns" },
    { value: "3-col", label: "3 Columns" },
]

export const FIELD_DEFS = {
    ArticleHeader: [
        { key: "title",       label: "Title",        type: "text" },
        { key: "subtitle",    label: "Subtitle",     type: "textarea" },
        { key: "author",      label: "Author",       type: "text" },
        { key: "date",        label: "Publish Date", type: "text" },
        { key: "category",    label: "Category",     type: "text" },
        { key: "coverImage",  label: "Cover Image",  type: "image" },
    ],
    TextBlock: [
        { key: "body", label: "Body Text", type: "textarea" },
    ],
    PullQuote: [
        { key: "quote",       label: "Quote",       type: "textarea" },
        { key: "attribution", label: "Attribution", type: "text" },
    ],
    ImageCaption: [
        { key: "coverImage", label: "Image",     type: "image" },
        { key: "size",       label: "Size",      type: "select", options: IMAGE_SIZE_OPTIONS, group: "style" },
        { key: "align",      label: "Alignment", type: "select", options: IMAGE_ALIGN_OPTIONS, group: "style" },
        { key: "caption",    label: "Caption",   type: "text" },
    ],
    ImageGrid: [
        { key: "layout",  label: "Layout",  type: "select", options: GRID_LAYOUT_OPTIONS, group: "style" },
        { key: "heading", label: "Heading", type: "text" },
    ],
    GridImage: [
        { key: "url", label: "Image", type: "image" },
    ],
}

export const SECTION_META = {
    ArticleHeader: { icon: "📰", label: "Article Header",   bgColor: "#f0f4ff", hasItems: false },
    TextBlock:     { icon: "¶",  label: "Text Block",       bgColor: "#f9fafb", hasItems: false },
    PullQuote:     { icon: "❝",  label: "Pull Quote",       bgColor: "#fff7ed", hasItems: false },
    ImageCaption:  { icon: "🖼", label: "Image + Caption",  bgColor: "#f0fdf4", hasItems: false },
    ImageGrid:     { icon: "⊞",  label: "Image Grid",       bgColor: "#fdf4ff", hasItems: true, itemType: "GridImage" },
}

export const DEFAULT_ITEM_FIELDS = {
    GridImage: { url: "", alt: "", caption: "", filename: "" },
}

export const DEFAULT_SECTION_FIELDS = {
    ArticleHeader: { title: "Article Title", subtitle: "", author: "", date: "", category: "", coverImage: "" },
    TextBlock:     { body: "Start writing your article content here. You can add multiple paragraphs by pressing Enter twice." },
    PullQuote:     { quote: "A compelling quote from the article that deserves special attention.", attribution: "" },
    ImageCaption:  { coverImage: "", caption: "", size: "large", align: "center" },
    ImageGrid:     { heading: "", layout: "3-col" },
}

export const SECTION_DESCRIPTIONS = {
    ArticleHeader: "Title, subtitle, author byline, publish date, category, and cover image",
    TextBlock:     "Body text with paragraph support — the main content of your article",
    PullQuote:     "A highlighted quote with optional attribution, displayed prominently",
    ImageCaption:  "A single image with caption, in full, large, or medium width",
    ImageGrid:     "A grid of images — 2 or 3 columns, with per-image captions",
}

export const VIEWPORTS = [
    { id: "desktop", label: "Desktop", width: "100%" },
    { id: "mobile",  label: "Mobile",  width: "390px" },
]
