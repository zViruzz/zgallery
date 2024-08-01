'use client'
import { NotificationProvider } from '@/context/notification'

async function layout ({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <>
        {children}
      </>
    </NotificationProvider>
  )
}

export default layout
