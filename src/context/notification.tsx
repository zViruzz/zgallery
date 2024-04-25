import { type NotificationType } from '@/type'
import { createContext, useContext, useState } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

interface ContextProps {
  notification: NotificationType
  handleNotification: ({ message, type }: { message: string, type: 'ERROR' | 'DONE' }) => void
}

export const NotificationContext = createContext<ContextProps>({
  notification: { type: 'DONE', message: '', visible: false },
  handleNotification: () => {}
})

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationType>({
    message: '',
    type: 'ERROR',
    visible: false
  })

  const handleNotification = ({ message, type }: { message: string, type: 'ERROR' | 'DONE' }): void => {
    setNotification({ type, message, visible: true })
    setTimeout(() => { setNotification({ type, message, visible: false }) }, 6000)
  }

  return (
    <NotificationContext.Provider value={{
      notification,
      handleNotification
    }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = (): ContextProps => useContext(NotificationContext)
