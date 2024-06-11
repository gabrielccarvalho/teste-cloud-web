import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Providers } from './providers'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'A basic TODO app for cloud++',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Providers>
				<body
					className={cn(
						'min-h-screen bg-background font-sans antialiased',
						fontSans.variable,
					)}
				>
					{children}
					<Toaster />
				</body>
			</Providers>
		</html>
	)
}
