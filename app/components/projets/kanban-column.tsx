import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./kanban-card"

interface KanbanColumnProps {
  id: string
  title: string
  cards: { id: string; title: string; description?: string }[]
  onDeleteCard?: (id: string) => void
}

const colorMap: Record<string, string> = {
  todo: "border-l-blue-500",
  in_progress: "border-l-gold-500",
  review: "border-l-purple-500",
  done: "border-l-green-500",
}

const labelMap: Record<string, string> = {
  todo: "À faire",
  in_progress: "En cours",
  review: "Revue",
  done: "Terminé",
}

export function KanbanColumn({ id, cards, onDeleteCard }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-lg border border-border bg-card/50 p-3 transition-all ${
        isOver ? "border-gold-500/50 bg-gold-500/5" : ""
      }`}
    >
      <div className={`mb-3 border-l-2 ${colorMap[id] || "border-l-border"} pl-2`}>
        <h3 className="text-sm font-medium text-foreground">{labelMap[id] || id}</h3>
        <p className="text-xs text-muted-foreground">{cards.length}</p>
      </div>

      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-[100px]">
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
