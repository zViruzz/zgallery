'use client'
import useAuth from '@/hook/useAuth'
import { useRouter } from 'next/navigation'

function SignOutButton () {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleClick}>
      Sign Out
    </button>
  )
}

export default SignOutButton
