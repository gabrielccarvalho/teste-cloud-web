'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categories, priorities, statuses } from './data/data'
import { type Task, taskSchema } from './data/schema'
import { EditTodoDrawer } from './edit-todo-drawer'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const task = taskSchema.parse(row.original)
	const queryClient = useQueryClient()

	const { mutateAsync: deleteTaskFn } = useMutation({
		mutationKey: ['delete-task', task.id],
		mutationFn: async () => {
			await fetch(`http://localhost:3333/todos/${task.id}`, {
				method: 'DELETE',
			})

			return { success: true }
		},
		onSuccess: () => {
			queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
				return tasks.filter((t) => t.id !== task.id)
			})

			toast.success('Task deleted', {
				description: `${task.title} has been deleted.`,
			})
		},
	})

	const { mutateAsync: editTaskFn } = useMutation({
		mutationKey: ['delete-task', task.id],
		mutationFn: async (data: {
			title?: string
			description?: string
			status?: string
			category?: string
			priority?: string
			due_date?: string
			evaluation_points?: number
		}) => {
			await fetch(`http://localhost:3333/todos/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			return { success: true }
		},
		onSuccess: (_, variables) => {
			queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
				return tasks.map((t) => {
					if (t.id === task.id) {
						return { ...t, ...variables }
					}

					return t
				})
			})

			toast.success('Task Edited', {
				description: `${task.title} has been edited.`,
			})
		},
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<DotsHorizontalIcon className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				<EditTodoDrawer data={task} editTaskFn={editTaskFn}>
					<Button
						variant='ghost'
						className='w-full align-center justify-start h-auto px-2 py-1.5'
					>
						Edit
					</Button>
				</EditTodoDrawer>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={task.status}>
							{statuses.map((status) => (
								<DropdownMenuRadioItem
									key={status.value}
									value={status.value}
									onClick={() => {
										editTaskFn({ status: status.value as 'todo' | 'done' })
									}}
								>
									{status.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={task.category}>
							{categories.map((category) => (
								<DropdownMenuRadioItem
									key={category.value}
									value={category.value}
									onClick={() => {
										editTaskFn({ category: category.value })
									}}
								>
									{category.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={task.priority}>
							{priorities.map((priority) => (
								<DropdownMenuRadioItem
									key={priority.value}
									value={priority.value}
									onClick={() => {
										editTaskFn({ priority: priority.value })
									}}
								>
									{priority.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						deleteTaskFn()
					}}
				>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
