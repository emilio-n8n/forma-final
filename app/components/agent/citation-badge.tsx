import { Badge } from "~/components/ui/badge"

interface CitationBadgeProps {
  code: string
}

export function CitationBadge({ code }: CitationBadgeProps) {
  return (
    <Badge variant="outline" className="mr-1 border-gold-500/30 text-gold-400 text-[10px]">
      {code}
    </Badge>
  )
}
