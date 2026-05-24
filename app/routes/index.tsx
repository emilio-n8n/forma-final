import { createFileRoute, Link } from "@tanstack/react-router"
import { HeroCompare } from "~/components/landing/hero-compare"
import { BentoGrid } from "~/components/landing/bento-grid"
import { StatsSection } from "~/components/landing/stats-section"
import { Manifeste } from "~/components/landing/manifeste"
import { ArrowRight } from "lucide-react"

export const Route = createFileRoute("/")({
  component: Landing,
})

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="text-xl font-bold tracking-tight text-gold-500">
            FORMA
          </span>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Fonctionnalités
            </a>
            <a href="#stats" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Stats
            </a>
            <a href="#manifeste" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Manifeste
            </a>
          </nav>
          <Link
            to="/auth"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-gold-500 px-4 text-sm font-medium text-black transition-all hover:bg-gold-400"
          >
            Commencer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <HeroCompare />
        <BentoGrid />
        <StatsSection />
        <Manifeste />
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>FORMA — Assistant IA pour Architectes</p>
      </footer>
    </div>
  )
}
