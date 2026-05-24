import { streamText } from "ai"
import { cerebras } from "@ai-sdk/cerebras"

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json()

  const result = streamText({
    model: cerebras("gpt-oss-120b") as any,
    providerOptions: {
      cerebras: {
        reasoningEffort: "medium",
      },
    },
    messages,
    onFinish: async ({ text }) => {
      const { createClient } = await import("~/lib/supabase/client")
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from("messages").insert([
        { conversation_id: conversationId, user_id: user.id, role: "assistant", content: text },
      ])
    },
  })

  return result.toDataStreamResponse()
}
