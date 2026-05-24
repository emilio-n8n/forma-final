import { useEffect, useState } from "react"
import { useUser } from "~/hooks/use-user"
import { listRenders } from "~/server/functions/renders"
import { ImageCard } from "./image-card"

interface Render {
  id: string
  image_url: string
  prompt: string
  style: string | null
  created_at: string
}

export function Gallery() {
  const { user } = useUser()
  const [renders, setRenders] = useState<Render[]>([])

  useEffect(() => {
    if (!user) return
    listRenders({ data: { userId: user.id } }).then(setRenders)
  }, [user])

  if (renders.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Aucun rendu généré</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Galerie</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {renders.map((r) => (
          <ImageCard
            key={r.id}
            imageUrl={r.image_url}
            prompt={r.prompt}
            style={r.style}
            createdAt={r.created_at}
          />
        ))}
      </div>
    </div>
  )
}
