import { createServerFn } from "@tanstack/react-start"
import { createClient } from "~/lib/supabase/client"

export const ensureConversation = createServerFn({ method: "GET" })
  .validator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: existing } = await supabase
      .from("conversations")
      .select("id, title")
      .eq("user_id", data.userId)
      .order("created_at", { ascending: false })
      .limit(1)

    if (existing && existing.length > 0) return existing[0]

    const { data: newConv } = await supabase
      .from("conversations")
      .insert({ user_id: data.userId, title: "Nouvelle conversation" })
      .select("id, title")
      .single()

    return newConv
  })

export const loadMessages = createServerFn({ method: "GET" })
  .validator((d: { conversationId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: messages } = await supabase
      .from("messages")
      .select("id, role, content, citations, created_at")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true })

    return messages ?? []
  })

export const saveMessage = createServerFn({ method: "POST" })
  .validator((d: { conversationId: string; userId: string; role: string; content: string; citations?: unknown }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { error } = await supabase.from("messages").insert({
      conversation_id: data.conversationId,
      user_id: data.userId,
      role: data.role,
      content: data.content,
      citations: data.citations ?? null,
    })
    if (error) throw error
    return { success: true }
  })

export const resetConversation = createServerFn({ method: "POST" })
  .validator((d: { conversationId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    await supabase.from("messages").delete().eq("conversation_id", data.conversationId)
    return { success: true }
  })

export const listConversations = createServerFn({ method: "GET" })
  .validator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: conversations } = await supabase
      .from("conversations")
      .select("id, title, created_at")
      .eq("user_id", data.userId)
      .order("created_at", { ascending: false })

    return conversations ?? []
  })

export const deleteConversation = createServerFn({ method: "POST" })
  .validator((d: { conversationId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    await supabase.from("messages").delete().eq("conversation_id", data.conversationId)
    await supabase.from("conversations").delete().eq("id", data.conversationId)
    return { success: true }
  })

export const generateSuggestions = createServerFn({ method: "POST" })
  .validator((d: { messages: { role: string; content: string }[] }) => d)
  .handler(async ({ data }) => {
    const lastMsg = data.messages.slice(-1)[0]
    if (!lastMsg) return []

    const suggestions: string[] = [
      "Expliquez-moi les règles parasismiques pour ce projet",
      "Quelles sont les normes RT2020 applicables ?",
      "Comparez les matériaux structurels recommandés",
    ]

    return suggestions
  })
