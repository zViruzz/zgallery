import React, { type RefObject } from 'react'

interface Props {
  placeholder: string
  inputRef: RefObject<HTMLInputElement>
}

export default function InputResolution({ placeholder, inputRef }: Props) {
  return (
    <input
      ref={inputRef}
      type="number"
      id="success"
      placeholder={placeholder}
      className="w-20 h-7 bg-transparent border-b-2 border-white focus:border-tertiary focus:outline-0 placeholder:text-neutral-500"
    />
  )
}
