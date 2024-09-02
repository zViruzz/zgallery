'use client'
import { useNotificationContext } from '@/context/notification'

function NotificationLayout () {
  const { notification: { message, visible, type } } = useNotificationContext()

  return (
    <div className={`${visible ? 'visible' : 'invisible'}
    ${type === 'ERROR' ? 'bg-tertiary' : 'bg-green-500'}
     absolute px-5 py-3 top-0 mt-10 left-2/4  -translate-x-2/4 rounded-2xl`}>{message}</div>
  )
}

export default NotificationLayout
