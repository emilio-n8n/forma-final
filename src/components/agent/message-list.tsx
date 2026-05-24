import { ScrollArea } from "~/components/ui/scroll-area"
import { CitationBadge } from "~/components/agent/citation-badge"
import { Skeleton } from "~/components/ui/skeleton"
import type { Message } from "ai"

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex h-full items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">
              Commencez une conversation avec FORMA
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gold-500/10 text-foreground"
                  : "bg-card text-foreground border border-border"
              }`}
            >
              {msg.role === "assistant" && (
                <p className="mb-1 text-xs font-medium text-gold-500">FORMA</p>
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
              {msg.role === "assistant" && (msg as any).citations?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {(msg as any).citations.map((c: { code: string }, i: number) => (
                    <CitationBadge key={i} code={c.code} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] space-y-2 rounded-xl bg-card border border-border px-4 py-3">
              <Skeleton className="h-3 w-16 bg-muted" />
              <Skeleton className="h-4 w-64 bg-muted" />
              <Skeleton className="h-4 w-48 bg-muted" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
