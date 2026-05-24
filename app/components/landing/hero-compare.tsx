import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"

export function HeroCompare() {
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          L&apos;IA qui pense comme un
          <span className="text-gold-500"> architecte</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          FORMA est votre assistant spécialisé : réglementation, design génératif,
          gestion de projets. Conçu pour les architectes, par des architectes.
        </p>
        <Link
          to="/auth"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-gold-500 px-6 text-base font-medium text-black transition-all hover:bg-gold-400"
        >
          Démarrer maintenant
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-16 w-full max-w-4xl">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-xl border border-border">
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <span className="text-4xl text-gold-500">FORMÉ</span>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <span className="text-4xl text-zinc-600">BRUT</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-y-0 w-full cursor-ew-resize appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:bg-gold-500"
          />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Faites glisser pour comparer • Avant / Après
        </p>
      </div>
    </section>
  )
}
