import React, { type RefObject } from 'react'

interface Props {
  placeholder: string
  inputRef: RefObject<HTMLInputElement>
}

export default function InputResolution ({ placeholder, inputRef }: Props) {
  return (
    <input
      ref={inputRef}
      type="number"
      id="success"
      placeholder={placeholder}
      className="bg-primary border border-tertiary text-green-900 dark:text-inherit placeholder-tertiary dark:placeholder-tertiary text-sm rounded-lg ring-tertiary ring-offset-transparent focus:outline-none focus:ring-1 ring-offset-1 focus:border-tertiary block w-16 h-12 px-3 dark:bg-primary dark:border-tertiary"
    />

  )
}
