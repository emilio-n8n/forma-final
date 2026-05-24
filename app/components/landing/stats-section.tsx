import { useEffect, useState, useRef } from "react"

const stats = [
  { label: "Projets gérés", value: 1240, suffix: "+" },
  { label: "Rendus générés", value: 8900, suffix: "+" },
  { label: "Heures économisées", value: 3400, suffix: "h" },
  { label: "Normes référencées", value: 15000, suffix: "+" },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-gold-500 md:text-5xl">
        {count}{suffix}
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section id="stats" className="border-y border-border py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
