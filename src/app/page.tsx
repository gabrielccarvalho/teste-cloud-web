import type { Metadata } from 'next'

import { Table } from './_components/table'

export const metadata: Metadata = {
	title: 'Tasks',
	description: 'A task and issue tracker build using Tanstack Table.',
}

export default async function TaskPage() {
	return (
		<>
			<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Welcome!</h2>
						<p className='text-muted-foreground'>
							This is a simple todo list made for cloud++
						</p>
					</div>
				</div>
				<Table />
			</div>
		</>
	)
}
