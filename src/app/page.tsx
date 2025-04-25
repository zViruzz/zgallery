import Header from '@/components/HeaderHome'
import Image from 'next/image'
import Link from 'next/link'
import illustration from '../../public/ilu.png'
import logo from '../../public/logo.svg'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen justify-items-center items-center grid lg:grid-cols-2">
        <div className='lg:text-2xl  text-[20px] lg:text-left text-center flex flex-col  items-center lg:items-start'>
          <Image
            className='lg:w-80 lg:h-auto w-[70%] mb-5 '
            src={logo}
            width={350}
            alt="Logo"
          />
          <div className='flex flex-col gap-9 items-center lg:items-start'>
            <p className='lg:w-[27rem] w-[90%] '>Gallery to save your images and videos in the cloud</p>
            <Link href='/app' className='bg-tertiary lg:px-8 lg:py-3 py-2 px-6 rounded-xl flex justify-center items-center text-lg lg:text-2xl'>
              Get started
            </Link>
          </div>
        </div>
        <div className='lg:flex hidden'>
          <Image
            src={illustration}
            width={520}
            alt="Illustration"
          />
        </div>
      </main>
    </>
  )
}
