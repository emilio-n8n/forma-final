import { createFileRoute } from "@tanstack/react-router"
import { RenderForm } from "~/components/render/render-form"
import { Gallery } from "~/components/render/gallery"

export const Route = createFileRoute("/dashboard/render")({
  component: RenderPage,
})

function RenderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Render AI</h1>
        <p className="text-sm text-muted-foreground">
          Générez des images architecturales avec Nano Banana
        </p>
      </div>
      <RenderForm />
      <Gallery />
    </div>
  )
}
