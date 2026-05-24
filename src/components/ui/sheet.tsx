import { cn } from "~/lib/utils"
import { forwardRef, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  if (!open) return null
  return (
    <SheetOverlay onClose={() => onOpenChange(false)}>
      <SheetContent onClose={() => onOpenChange(false)}>
        {children}
      </SheetContent>
    </SheetOverlay>
  )
}

function SheetOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

function SheetContent({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed right-0 top-0 z-50 h-full w-[400px] max-w-full border-l border-border bg-card p-6 shadow-lg">
      <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5" />
      </button>
      {children}
    </div>
  )
}

const SheetHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-6 flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
  )
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  )
)
SheetTitle.displayName = "SheetTitle"

export { Sheet, SheetHeader, SheetTitle }
