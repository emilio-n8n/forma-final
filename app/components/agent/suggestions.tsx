interface SuggestionsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export function Suggestions({ suggestions, onSelect }: SuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold-500/50 hover:text-gold-400"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
