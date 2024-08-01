'use client'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNotificationContext } from '@/context/notification'
import CardPlan from '@/components/CardPlan'

import usePlans from '@/hook/usePlans'
import React from 'react'
import NotificationLayout from '@/components/Notification'
import { createBrowserClient } from '@supabase/ssr'

export default function page () {
  const { changePlanBasic, changePlanPremiun } = usePlans()
  const { notification, handleNotification } = useNotificationContext()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleClickBasic = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user === null) {
      handleNotification({
        message: 'You are not logged in',
        type: 'ERROR'
      })
      return
    }

    changePlanBasic()
    handleNotification({
      message: 'Successfully changed to Basic plan',
      type: 'DONE'
    })
  }

  const handleClickPremiun = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user === null) {
      handleNotification({
        message: 'You are not logged in',
        type: 'ERROR'
      })
      return
    }

    changePlanPremiun()
    handleNotification({
      message: 'Successfully changed to Premiun plan',
      type: 'DONE'
    })
  }
  return (
    <>
      <NotificationLayout {...notification} />

      <section className='w-full grid grid-rows-[14rem_1fr] md:h-full md:grid-rows-[20rem_1fr]'>
        <div className='flex flex-col items-center justify-center'>
          <p className='md:w-[58%] w-[90%] text-center text-3xl'>
            Discover the perfect plan for you
          </p>
        </div>

        <div className='pb-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-center md:gap-16'>

          <CardPlan
            title='Basic'
            price='Free'
            description='unlimited'
            features={[
              '2 gb storage ',
              'Access to all main features'
            ]}
            textButton='Start'
            handleClick={handleClickBasic}
          />

          <CardPlan
            title='Premiun'
            price='$ 0 usd'
            description='Per month'
            features={[
              '2 gb storage ',
              'Access to all main features',
              'Change resolution'
            ]}
            textButton='Start'
            handleClick={handleClickPremiun}
          />

        </div>
      </section>
    </>
  )
}
