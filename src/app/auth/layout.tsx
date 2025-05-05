import { NotificationProvider } from '@/context/notification'

async function layout({ children }: { children: React.ReactNode }) {
	return (
		<NotificationProvider>
			<main className='w-screen h-screen flex items-center justify-center bg-black md:bg-neutral-900'>
				{children}
			</main>
		</NotificationProvider>
	)
}

export default layout
