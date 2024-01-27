import { redirect } from 'next/navigation'
import authUser from '@/util/authUser'

async function layout ({ children }: { children: React.ReactNode }) {
  const { supabase } = await authUser()
  const { data } = await supabase.auth.getUser()

  if (data.user !== null) {
    redirect('/app')
  }

  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      {children}
    </main>
  )
}

export default layout
