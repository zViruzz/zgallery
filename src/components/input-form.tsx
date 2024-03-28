interface Props {
  id: string
  type: string
  placeholder: string
  required?: boolean
}

function InputForm ({ id, type, required, placeholder }: Props) {
  return (
    <input
      id={id}
      type={type}
      required={required ?? false}
      placeholder={placeholder}
      className="
        w-full
        rounded-lg
        bg-neutral-900
        p-3
        hover:bg-neutral-800
        focus:outline-none
        focus:ring
        focus:ring-neutral-300
        active:ring
        active:ring-tertiary"
    />
  )
}

export default InputForm
