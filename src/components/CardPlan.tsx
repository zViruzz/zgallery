/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { premiunPlan } from '@/app/actions/premiunPlan'
import TilIcon from './icons/TilIcon'
import { useNotificationContext } from '@/context/notification'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  title: string
  priceTag: string
  price: number
  description: string
  features: string[]
  textButton: string
}

export default function CardPlan ({ title, priceTag, price, description, features, textButton }: Props) {
  const { handleNotification } = useNotificationContext()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleClick = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user === null) {
      handleNotification({
        message: 'You are not logged in',
        type: 'ERROR'
      })
      console.log('notification')
      return
    }

    await premiunPlan(price)

    handleNotification({
      message: 'Successfully changed to Premiun plan',
      type: 'DONE'
    })
  }

  return (
    <div className='h-96 w-[90%] sm:w-[70%] box-content border-2 rounded-3xl border-neutral-700 md:w-80'>
      <div className='w-full h-full p-8 flex flex-col'>
        <div>
          <div>
            <h2 className='text-tertiary text-2xl mb-4'>{title}</h2>
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='text-4xl'>{priceTag}</h3>
            <p className='text-neutral-500'>{description}</p>
          </div>
        </div>

        <div className='mt-6'>
          <ul className='list-image-checkmark text-base  text-neutral-500 flex flex-col gap-3'>
            {
              features.map((feature) => (
                <li key={feature} className='flex items-center gap-2'>
                  <TilIcon />{feature}
                </li>
              ))
            }
          </ul>
        </div>

        <div className='h-full flex flex-col justify-end'>

          <button
            disabled={price === 0}
            onClick={handleClick}
            className='bg-tertiary w-full h-10 rounded-lg hover:bg-[#930b34] active:bg-[#76092a] disabled:bg-[#4f2230] disabled:text-[#5b5b5b]'
          >
            {textButton}
          </button>
        </div>
      </div>

    </div>
  )
}
