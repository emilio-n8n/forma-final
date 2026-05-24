import { useState } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question réglementaire..."
        disabled={disabled}
        className="flex h-11 flex-1 rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500 text-black transition-all hover:bg-gold-400 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
