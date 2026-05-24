interface ImageCardProps {
  imageUrl: string
  prompt: string
  style?: string | null
  createdAt: string
}

export function ImageCard({ imageUrl, prompt, style, createdAt }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-gold-500/50">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={prompt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-xs text-muted-foreground">{prompt}</p>
        {style && (
          <p className="mt-1 text-[10px] text-gold-500/70">{style}</p>
        )}
        <p className="mt-1 text-[10px] text-muted-foreground/50">
          {new Date(createdAt).toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  )
}
