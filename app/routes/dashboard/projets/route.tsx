import { createFileRoute } from "@tanstack/react-router"
import { KanbanBoard } from "~/components/projets/kanban-board"

export const Route = createFileRoute("/dashboard/projets")({
  component: ProjetsPage,
})

function ProjetsPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Projets</h1>
        <p className="text-sm text-muted-foreground">
          Gérez vos projets architecturaux en méthode Kanban
        </p>
      </div>
      <div className="flex-1">
        <KanbanBoard />
      </div>
    </div>
  )
}
