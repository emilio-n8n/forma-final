import { useEffect, useState } from "react"
import { useUser } from "~/hooks/use-user"
import { listConversations, deleteConversation } from "~/server/functions/chat"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Trash2, MessageSquare } from "lucide-react"
import { Button } from "~/components/ui/button"

export function ConversationSidebar() {
  const { user } = useUser()
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([])
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!user) return
    load()
  }, [user])

  async function load() {
    if (!user) return
    const convs = await listConversations({ data: { userId: user.id } })
    setConversations(convs)
  }

  async function handleDelete(id: string) {
    await deleteConversation({ data: { conversationId: id } })
    load()
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="self-start rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="w-72 border-l border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Historique</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Fermer
        </button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
            >
              <span className="truncate">{conv.title}</span>
              <button
                onClick={() => handleDelete(conv.id)}
                className="hidden text-red-400 hover:text-red-300 group-hover:block"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-xs text-muted-foreground">Aucune conversation</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
