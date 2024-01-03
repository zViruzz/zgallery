import Link from 'next/link'

function page () {
  return (
    <div className='bg-black flex flex-col p-10 gap-5  rounded-2xl'>
      <div className='text-xl'>
        <p>
          Check your email to verify your account
        </p>
      </div>
      <div className='grid place-content-center'>
        <Link
          className='bg-tertiary p-3 rounded-lg block'
          href="/auth/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default page
