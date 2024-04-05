import Header from '@/components/header-home'
import logo from '../../public/logo.svg'
import illustration from '../../public/ilu.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <Header />
      <main className="min-h-screen justify-items-center items-center grid grid-cols-2">
        <div className='w-[40rem] text-2xl'>
          <Image
            src={logo}
            width={350}
            alt="Logo"
          />
          <div className='flex flex-col gap-9'>
            <p className='w-[27rem]'>Lorem Ipsum es simplemente el texto de relleno de las imprentas</p>
            <Link href='/app' className='bg-tertiary w-[12rem] h-[3.5rem] rounded-xl flex justify-center items-center'>
              Get started
            </Link>
          </div>
        </div>
        <div>
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
