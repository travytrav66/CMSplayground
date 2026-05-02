import PageBuilder from "../pageBuilder/PageBuilder"

// Thin route wrapper — receives pageId from the CMS router when wired up
export default function PageBuilderPage({ pageId }) {
    return <PageBuilder pageId={pageId} />
}
