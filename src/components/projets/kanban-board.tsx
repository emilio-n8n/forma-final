import { useEffect, useState } from "react"
import { DndContext, closestCenter, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useUser } from "~/hooks/use-user"
import { listProjects, createProject, updateProjectStatus, deleteProject } from "~/server/functions/projects"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { Plus } from "lucide-react"

const COLUMNS = ["todo", "in_progress", "review", "done"]

interface Project {
  id: string
  title: string
  description?: string
  status: string
}

export function KanbanBoard() {
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    load()
  }, [user])

  async function load() {
    if (!user) return
    const data = await listProjects({ data: { userId: user.id } })
    setProjects(data)
  }

  async function handleAdd() {
    if (!user || !newTitle.trim()) return
    const p = await createProject({ data: { userId: user.id, title: newTitle.trim() } })
    if (p) setProjects((prev) => [...prev, p])
    setNewTitle("")
  }

  async function handleDelete(id: string) {
    await deleteProject({ data: { projectId: id } })
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeProject = projects.find((p) => p.id === active.id)
    if (!activeProject) return

    const overId = String(over.id)
    if (COLUMNS.includes(overId)) {
      await updateProjectStatus({ data: { projectId: activeProject.id, status: overId as any } })
      setProjects((prev) => prev.map((p) => (p.id === activeProject.id ? { ...p, status: overId } : p)))
    }
  }

  const getCards = (status: string) => projects.filter((p) => p.status === status)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Nouveau projet..."
          className="flex h-9 flex-1 rounded-md border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleAdd}
          className="inline-flex h-9 items-center gap-1 rounded-md bg-gold-500 px-3 text-sm font-medium text-black hover:bg-gold-400"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragStart={(e) => setActiveId(String(e.active.id))} onDragEnd={handleDragEnd}>
        <div className="grid flex-1 grid-cols-4 gap-3">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col}
              id={col}
              title={col}
              cards={getCards(col)}
              onDeleteCard={handleDelete}
            />
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <KanbanCard card={projects.find((p) => p.id === activeId)!} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
