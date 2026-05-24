import { Download } from "lucide-react"

interface ExportBtnProps {
  messages: { role: string; content: string; citations?: { code: string; text: string }[] }[]
}

export function ExportBtn({ messages }: ExportBtnProps) {
  function handleExport() {
    const md = messages
      .map((m) => {
        const role = m.role === "user" ? "**Vous**" : "**FORMA**"
        const citations = m.citations?.map((c) => `> [${c.code}] ${c.text}`).join("\n") ?? ""
        return `## ${role}\n\n${m.content}\n\n${citations}`
      })
      .join("\n\n---\n\n")

    const blob = new Blob([`# Conversation FORMA\n\n${md}`], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `forma-conversation-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (messages.length === 0) return null

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <Download className="h-3.5 w-3.5" />
      Exporter .md
    </button>
  )
}
