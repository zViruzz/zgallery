import { type ReactNode } from 'react'

function layout ({ children }: { children: ReactNode }) {
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full mx-auto max-w-[500px] md:px-6 px-4 flex flex-col justify-center'>
        <div className='bg-[#1d1d1d] px-6 py-3 rounded-xl divide-zinc-700 divide-y [&>div]:py-6 [&>div]:flex [&>div]:justify-between'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
