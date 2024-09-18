'use client'

import CardPlan from '@/components/CardPlan'

import NotificationLayout from '@/components/NotificationLayout'
import { NotificationProvider } from '@/context/notification'

export default function page () {
  return (
    <NotificationProvider>
      <NotificationLayout />

      <section className='w-full grid grid-rows-[14rem_1fr] md:h-full md:grid-rows-[20rem_1fr]'>
        <div className='flex flex-col items-center justify-center'>
          <p className='md:w-[58%] w-[90%] text-center text-3xl'>
            Discover the perfect plan for you
          </p>
        </div>

        <div className='pb-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-center md:gap-16'>

          <CardPlan
            title='Basic'
            price={0}
            priceTag='Free'
            description='unlimited'
            features={[
              '50 mb storage ',
              'Access to all main features'
            ]}
            textButton='Start'
          />

          <CardPlan
            title='Premiun'
            price={1350}
            priceTag='$ 1 usd'
            description='Per month'
            features={[
              '100 mb storage',
              'Access to all main features',
              'Change resolution'
            ]}
            textButton='Start'
          />

        </div>
      </section>
    </NotificationProvider>
  )
}
