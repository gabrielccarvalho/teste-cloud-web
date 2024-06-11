import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { priorities, statuses } from './data/data'
import type { Task } from './data/schema'

const formSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	evaluation_points: z.string().optional(),
	status: z.string().optional(),
	category: z.string().optional(),
	due_date: z.date().optional(),
	priority: z.string().optional(),
})

export function EditTodoDrawer({
	data,
	editTaskFn,
	children,
}: {
	data: Task
	children: React.ReactNode
	editTaskFn: (data: {
		title?: string
		description?: string
		evaluation_points?: number
		status?: string
		category?: string
		due_date?: string
		priority?: string
	}) => void
}) {
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...data,
			evaluation_points: data.evaluation_points.toString(),
			due_date: new Date(data.due_date),
		},
	})

	function onSubmit(data: z.infer<typeof formSchema>) {
		setOpen(false)
		editTaskFn({
			...data,
			evaluation_points: Number.parseInt(data.evaluation_points as string),
			due_date: data.due_date?.toISOString(),
		})
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Edit your todo</DrawerTitle>
						<DrawerDescription>
							Edit the details you want. Hit Submit when you are ready!
						</DrawerDescription>
					</DrawerHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid grid-cols-2 space-y-4 space-x-2 p-4'
							id='edit-todo'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='col-span-2 px-2'>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder='Title' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder='Description' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='evaluation_points'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Evaluation Points</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Evaluation Points'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='status'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a status' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{statuses.map((status) => (
													<SelectItem key={status.value} value={status.value}>
														<div className='flex items-center gap-1'>
															{status.icon && <status.icon />}
															{status.label}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='priority'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormLabel>Priority</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a priority' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{priorities.map((priority) => (
													<SelectItem
														key={priority.value}
														value={priority.value}
													>
														<div className='flex items-center gap-1'>
															{priority.icon && <priority.icon />}
															{priority.label}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='due_date'
								render={({ field }) => (
									<FormItem className='col-span-2 flex flex-col'>
										<FormLabel>Due Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground',
														)}
													>
														{field.value ? (
															moment(field.value).format('DD MMM YYYY')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
					<DrawerFooter>
						<Button type='submit' form='edit-todo' onClick={() => {}}>
							Submit
						</Button>
						<DrawerClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
