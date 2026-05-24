import { MessageSquare, Image, Layout } from "lucide-react"

const features = [
  {
    title: "Agent IA spécialisé",
    desc: "GPT-OSS 120B entraîné sur le corpus réglementaire français. Réponses en streaming, citations de normes en un clic.",
    icon: MessageSquare,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Render AI",
    desc: "Générez des visuels architecturaux photoréalistes avec Nano Banana. Ambiances jour/nuit, météo, styles.",
    icon: Image,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Kanban Projets",
    desc: "Suivez vos projets en 4 colonnes. Drag & drop, CRUD temps réel, React Query.",
    icon: Layout,
    className: "md:col-span-2 md:row-span-1",
  },
]

export function BentoGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
        Tout ce qu&apos;il vous faut
      </h2>
      <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
        {features.map((f) => (
          <div
            key={f.title}
            className={`group rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/5 ${f.className}`}
          >
            <f.icon className="mb-4 h-8 w-8 text-gold-500" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
