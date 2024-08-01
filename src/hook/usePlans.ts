/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { createBrowserClient } from '@supabase/ssr'

export default function usePlans () {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const changePlanBasic = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { user_plan: 'BASIC' }
      })

      if (error != null) console.error('A ocurido un error al cambiar de plan', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  const changePlanPremiun = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { user_plan: 'PREMIUN' }
      })

      if (error != null) console.error('A ocurido un error al cambiar de plan', error)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  return { changePlanBasic, changePlanPremiun }
}
