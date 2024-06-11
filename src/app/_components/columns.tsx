'use client'

import type { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { categories, priorities, statuses } from './data/data'
import type { Task } from './data/schema'

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				className='translate-y-[2px]'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className='translate-y-[2px]'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Title' />
		),
		cell: ({ row }) => (
			<div className='line-clamp-1'>{row.getValue('title')}</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Description' />
		),
		cell: ({ row }) => {
			const category = categories.find(
				(category) => category.value === row.original.category,
			)

			return (
				<div className='flex space-x-2'>
					{category && <Badge variant='outline'>{category.label}</Badge>}
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('description')}
					</span>
				</div>
			)
		},
		filterFn: (row, _, value) => {
			return value.includes(row.original.category)
		},
	},
	{
		accessorKey: 'evaluation_points',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Evaluation Points' />
		),
		cell: ({ row }) => (
			<div className='tabular-nums'>{row.getValue('evaluation_points')}</div>
		),
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Status' />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue('status'),
			)

			if (!status) {
				return null
			}

			return (
				<div className='flex w-[100px] items-center'>
					{status.icon && (
						<status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
					)}
					<span>{status.label}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'priority',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Priority' />
		),
		cell: ({ row }) => {
			const priority = priorities.find(
				(priority) => priority.value === row.getValue('priority'),
			)

			if (!priority) {
				return null
			}

			return (
				<div className='flex items-center'>
					{priority.icon && (
						<priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
					)}
					<span>{priority.label}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'due_date',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Due Date' />
		),
		cell: ({ row }) => (
			<div>{moment(row.getValue('due_date')).format('MMMM Do, YYYY')}</div>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
