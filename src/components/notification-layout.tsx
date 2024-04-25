import { type NotificationType } from '@/type'
import React from 'react'

function NotificationLayout ({ message, visible, type }: NotificationType) {
  return (
    <div className={`${visible ? 'visible' : 'invisible'}
    ${type === 'ERROR' ? 'bg-tertiary' : 'bg-green-500'}
    absolute  px-5 py-3 top-0 mt-5 rounded-2xl`}>{message}</div>
  )
}

export default NotificationLayout
