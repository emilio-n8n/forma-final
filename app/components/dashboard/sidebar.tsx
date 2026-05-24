import { Link, useLocation } from "@tanstack/react-router"
import { Bot, Image, FolderKanban, Settings, ChevronLeft } from "lucide-react"
import { cn } from "~/lib/utils"
import { useState } from "react"

const links = [
  { to: "/dashboard/agent", label: "Agent IA", icon: Bot },
  { to: "/dashboard/render", label: "Render AI", icon: Image },
  { to: "/dashboard/projets", label: "Projets", icon: FolderKanban },
  { to: "/dashboard/settings", label: "Paramètres", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link to="/dashboard" className="text-lg font-bold text-gold-500">
            FORMA
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const active = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold-500/10 text-gold-400"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
