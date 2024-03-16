async function layout ({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      {children}
    </main>
  )
}

export default layout
