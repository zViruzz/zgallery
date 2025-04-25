import { useRouter } from 'next/navigation'
import React, { type FormEvent, useRef } from 'react'
import SearchIcon from './icons/SearchIcon'

interface Props {
  setHiddenSearch: (bol: boolean) => void
  isHiddenSearch: boolean
}
function SearchBar({ setHiddenSearch, isHiddenSearch }: Props) {
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleClickButton = () => {
    setTimeout(() => {
      if (searchRef.current !== null) searchRef.current.focus()
    }, 200)
    setHiddenSearch(false)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setHiddenSearch(true)
    }, 200)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchRef.current === null) return
    const value = searchRef.current.value
    router.push(`?name=${value}`)
  }

  return (
    <>
      <section className={`${isHiddenSearch ? 'invisible origin-right opacity-0' : 'visible '} grid absolute md:static h-full w-full md:w-auto place-content-center grid-cols-1 transition-all`}>
        <form
          className="focus-within:shadow-search focus-within:border-transparent ease-in-out transition-all duration-300 rounded-3xl border dark:border-[#ffffff2a] border-[#0000002a] dark:text-white"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <div
            className='flex'
          >
            <input
              ref={searchRef}
              className="w-full rounded-l-3xl p-2 px-4 mr-0 0 outline-none bg-[var(--background-start-rgb)]" placeholder="Buscar"
            />
            <button className="rounded-r-3xl p-2 text-[var(--foreground-rgb)] uppercase" type='submit'>
              <SearchIcon width={27} height={27} />
            </button>
          </div>
        </form>
      </section>
      <div className={`${isHiddenSearch ? 'md:w-10  md:opacity-100' : 'hidden md:grid md:w-0 md:opacity-0'} grid place-content-center`}>
        <button
          type='button'
          className={'grid h-10 w-10 place-content-center rounded-full'}
          onClick={handleClickButton}
        >
          <SearchIcon className='w-[23px] h-[23px] md:w-[27px] md:h-[27px]' />
        </button>
      </div>
    </>
  )
}

export default SearchBar
