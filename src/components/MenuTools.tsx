import { SORT_TYPE } from '@/static/static'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

interface Props {
  isHiddenMenu: boolean
  setHiddenMenu: (value: boolean) => void
}

const options = [
  {
    value: SORT_TYPE.RECENT,
    label: 'Date created (descending)'
  },
  {
    value: SORT_TYPE.RECENT_INVERT,
    label: 'Date created (ascending)'
  },
  {
    value: SORT_TYPE.A_Z,
    label: 'Name (A to Z)'
  },
  {
    value: SORT_TYPE.Z_A,
    label: 'Name (Z to A)'
  }
]

function MenuTools({ isHiddenMenu, setHiddenMenu }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current !== null &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHiddenMenu(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sort)
    router.push(`${pathname}?${params.toString()}`)
    // router.refresh()
  }

  return (
    <div
      ref={containerRef}
      className={`${isHiddenMenu ? 'invisible origin-top-right  opacity-0 scale-75' : 'visible opacity-100 '} flex flex-col absolute bg-neutral-800 w-80 rounded-2xl right-0 z-50 border border-neutral-600 transition-all ease-in-out`}

    >
      <h3 className='py-2 px-5'>Sort by</h3>
      <ul className='[&>li>button]:py-2 [&>li>button]:px-5 [&>li>button]:w-full [&>li>button]:flex text-left'>
        {options.map(({ value, label }) => {
          return (
            <li key={value}>
              <button type='button' onClick={() => { handleClickSort(value) }}>
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>)
}

export default MenuTools
