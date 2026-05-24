import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"

interface KanbanCardData {
  id: string
  title: string
  description?: string
}

interface KanbanCardProps {
  card: KanbanCardData
  onDelete?: (id: string) => void
}

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-gold-500/30"
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{card.title}</p>
          {card.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{card.description}</p>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(card.id)}
            className="hidden text-red-400 hover:text-red-300 group-hover:block"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
