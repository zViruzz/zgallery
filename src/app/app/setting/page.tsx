import SignOutButton from '@/components/SignOutButton'
import authUser from '@/util/authUser'

async function page () {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      {user?.email}
      <SignOutButton/>
    </div>
  )
}

export default page
