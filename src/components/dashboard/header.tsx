import { useUser } from "~/hooks/use-user"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"

export function Header() {
  const { user } = useUser()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div />
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{user?.email}</span>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
