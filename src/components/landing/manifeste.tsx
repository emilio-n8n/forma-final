import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

export function Manifeste() {
  return (
    <section id="manifeste" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="text-3xl font-bold text-foreground md:text-4xl">
        Le manifeste FORMA
      </h2>
      <div className="mt-8 space-y-6 text-left text-muted-foreground leading-relaxed">
        <p>
          L&apos;architecture est le plus ancien des métiers du monde. Et pourtant,
          ses outils digitaux n&apos;ont pas évolué depuis 20 ans.
        </p>
        <p>
          FORMA est né d&apos;une conviction : l&apos;IA générative peut libérer l&apos;architecte
          des tâches répétitives — recherche de normes, rédaction de notes, génération
          d&apos;esquisses — pour lui permettre de se concentrer sur l&apos;essentiel : créer.
        </p>
        <p className="font-medium text-foreground">
          FORMA n&apos;est pas un outil de plus. C&apos;est votre nouveau associé.
        </p>
      </div>
      <Link
        to="/auth"
        className="mt-10 inline-flex h-12 items-center gap-2 rounded-md bg-gold-500 px-6 text-base font-medium text-black transition-all hover:bg-gold-400"
      >
        Rejoindre FORMA
        <ArrowRight className="h-5 w-5" />
      </Link>
    </section>
  )
}
