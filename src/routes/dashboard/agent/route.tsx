import { createFileRoute } from "@tanstack/react-router"
import { ChatWindow } from "~/components/agent/chat-window"
import { ConversationSidebar } from "~/components/agent/conversation-sidebar"

export const Route = createFileRoute("/dashboard/agent")({
  component: AgentPage,
})

function AgentPage() {
  return (
    <div className="flex h-full gap-4">
      <div className="flex-1">
        <ChatWindow />
      </div>
      <ConversationSidebar />
    </div>
  )
}
