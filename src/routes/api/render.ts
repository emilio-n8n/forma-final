import { fal } from "@fal-ai/client"

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  const { prompt, imageUrl, style, ambiance, weather } = await req.json()

  const enrichedPrompt = [
    prompt,
    style && `Style architectural: ${style}`,
    ambiance && `Ambiance: ${ambiance}`,
    weather && `Météo: ${weather}`,
    "Architecture professionnelle, photorealistic, 4K",
  ].filter(Boolean).join(". ")

  const result = await fal.subscribe("fal-ai/nano-banana-pro", {
    input: {
      prompt: enrichedPrompt,
      image_url: imageUrl || undefined,
      image_size: "1024x1024",
    },
  })

  const imageUrlResult = result.data.images[0]?.url

  if (!imageUrlResult) {
    return Response.json({ error: "Échec de génération" }, { status: 500 })
  }

  const { createClient } = await import("~/lib/supabase/client")
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const imgResp = await fetch(imageUrlResult)
    const imgBlob = await imgResp.blob()
    const fileName = `render_${Date.now()}.png`
    const { data: uploadData } = await supabase.storage.from("renders").upload(fileName, imgBlob, {
      contentType: "image/png",
    })

    if (uploadData) {
      const { data: { publicUrl } } = supabase.storage.from("renders").getPublicUrl(fileName)

      await supabase.from("renders").insert({
        user_id: user.id,
        prompt,
        style,
        ambiance,
        weather,
        image_url: publicUrl,
        original_image_url: imageUrl || null,
      })
    }
  }

  return Response.json({ imageUrl: imageUrlResult })
}
