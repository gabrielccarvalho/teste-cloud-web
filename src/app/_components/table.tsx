'use client'

import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { DataTable } from './data-table'

export function Table() {
	const { data, isSuccess } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			const res = await fetch('http://localhost:3333/todos')

			return await res.json()
		},
	})

	if (!isSuccess) return

	return <DataTable data={data} columns={columns} />
}
