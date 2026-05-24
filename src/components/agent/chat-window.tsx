import { useState, useEffect, useCallback } from "react"
import { useUser } from "~/hooks/use-user"
import { useChat } from "@ai-sdk/react"
import {
  ensureConversation,
  loadMessages,
  saveMessage,
  generateSuggestions,
  resetConversation,
} from "~/server/functions/chat"
import { MessageList } from "./message-list"
import { ChatInput } from "./chat-input"
import { Suggestions } from "./suggestions"
import { ExportBtn } from "./export-btn"

export function ChatWindow() {
  const { user } = useUser()
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [initialLoading, setInitialLoading] = useState(true)

  const { messages, append, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: { conversationId },
    onFinish: async (_message) => {
      if (!user || !conversationId) return
      const sug = await generateSuggestions({
        data: { messages: [...messages, _message].map((m) => ({ role: m.role, content: m.content })) },
      })
      setSuggestions(sug)
    },
  })

  useEffect(() => {
    if (!user) return
    init()
  }, [user])

  async function init() {
    if (!user) return
    setInitialLoading(true)
    const conv = await ensureConversation({ data: { userId: user.id } })
    setConversationId(conv.id)
    const msgs = await loadMessages({ data: { conversationId: conv.id } })
    if (msgs.length > 0) {
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
          citations: m.citations,
        })),
      )
    }
    setInitialLoading(false)
  }

  const handleSend = useCallback(
    async (content: string) => {
      if (!user || !conversationId) return
      await saveMessage({
        data: { conversationId, userId: user.id, role: "user", content },
      })
      setSuggestions([])
      append({ role: "user", content })
    },
    [user, conversationId, append],
  )

  async function handleReset() {
    if (!conversationId) return
    await resetConversation({ data: { conversationId } })
    setMessages([])
    setSuggestions([])
  }

  if (initialLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Agent IA</h2>
        <div className="flex items-center gap-2">
          <ExportBtn messages={messages} />
          <button
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Nouvelle conversation
          </button>
        </div>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />
      <Suggestions suggestions={suggestions} onSelect={handleSend} />

      <div className="mt-4 border-t border-border pt-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  )
}
