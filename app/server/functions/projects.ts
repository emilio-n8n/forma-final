import { createServerFn } from "@tanstack/react-start"
import { createClient } from "~/lib/supabase/client"

type ProjectStatus = "todo" | "in_progress" | "review" | "done"

export const listProjects = createServerFn({ method: "GET" })
  .validator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", data.userId)
      .order("position", { ascending: true })
    return projects ?? []
  })

export const createProject = createServerFn({ method: "POST" })
  .validator((d: { userId: string; title: string; description?: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    const { data: project } = await supabase
      .from("projects")
      .insert({
        user_id: data.userId,
        title: data.title,
        description: data.description ?? "",
        status: "todo",
      })
      .select()
      .single()
    return project
  })

export const updateProjectStatus = createServerFn({ method: "POST" })
  .validator((d: { projectId: string; status: ProjectStatus }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    await supabase
      .from("projects")
      .update({ status: data.status })
      .eq("id", data.projectId)
    return { success: true }
  })

export const updateProject = createServerFn({ method: "POST" })
  .validator((d: { projectId: string; title?: string; description?: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    await supabase
      .from("projects")
      .update({
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
      })
      .eq("id", data.projectId)
    return { success: true }
  })

export const deleteProject = createServerFn({ method: "POST" })
  .validator((d: { projectId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient()
    await supabase.from("projects").delete().eq("id", data.projectId)
    return { success: true }
  })
