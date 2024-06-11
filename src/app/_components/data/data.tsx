import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	CheckCircledIcon,
	CircleIcon,
	DoubleArrowUpIcon,
} from '@radix-ui/react-icons'

export const categories = [
	{
		value: 'home',
		label: 'Home',
	},
	{
		value: 'work',
		label: 'Work',
	},
	{
		value: 'personal',
		label: 'Personal',
	},
	{
		value: 'shopping',
		label: 'Shopping',
	},
]

export const statuses = [
	{
		value: 'todo',
		label: 'Todo',
		icon: CircleIcon,
	},
	{
		value: 'done',
		label: 'Done',
		icon: CheckCircledIcon,
	},
]

export const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDownIcon,
	},
	{
		label: 'Normal',
		value: 'normal',
		icon: ArrowRightIcon,
	},
	{
		label: 'High',
		value: 'high',
		icon: ArrowUpIcon,
	},
	{
		label: 'Critical',
		value: 'critical',
		icon: DoubleArrowUpIcon,
	},
]
