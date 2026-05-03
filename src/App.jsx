import { useState } from "react"
import PagesListPage from "./pages/PagesListPage"
import PageBuilderPage from "./pages/PageBuilderPage"
import ArticleBuilderPage from "./pages/ArticleBuilderPage"

// view: "list" | "page" | "article"
function App() {
    const [view, setView] = useState("list")
    const [globalSchema, setGlobalSchema] = useState("")

    function handleOpen(type) {
        setView(type === "article" ? "article" : "page")
    }

    if (view === "page") {
        return <PageBuilderPage onBack={() => setView("list")} />
    }

    if (view === "article") {
        return <ArticleBuilderPage onBack={() => setView("list")} />
    }

    return <PagesListPage onOpen={handleOpen} globalSchema={globalSchema} onGlobalSchemaChange={setGlobalSchema} />
}

export default App
