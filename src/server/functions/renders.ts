import { createServerFn } from "@tanstack/react-start"
import { createClient } from "~/lib/supabase/client"

export const listRenders = createServerFn({ method: "GET" })
  .validator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: renders } = await supabase
      .from("renders")
      .select("*")
      .eq("user_id", data.userId)
      .order("created_at", { ascending: false })
    return renders ?? []
  })

export const createRender = createServerFn({ method: "POST" })
  .validator((d: {
    userId: string
    prompt: string
    style?: string
    ambiance?: string
    weather?: string
    imageUrl?: string
    originalImageUrl?: string
  }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: render } = await supabase
      .from("renders")
      .insert({
        user_id: data.userId,
        prompt: data.prompt,
        style: data.style ?? null,
        ambiance: data.ambiance ?? null,
        weather: data.weather ?? null,
        image_url: data.imageUrl ?? null,
        original_image_url: data.originalImageUrl ?? null,
      })
      .select()
      .single()
    return render
  })
