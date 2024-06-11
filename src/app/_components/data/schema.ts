import { z } from 'zod'

export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	category: z.string(),
	priority: z.string(),
	status: z.string(),
	evaluation_points: z.number(),
	due_date: z.string(),
})

export type Task = z.infer<typeof taskSchema>
