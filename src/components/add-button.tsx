'use client'
import AddIcon from '@/components/Icons/add-icon'
import useUser from '@/hook/useUser'

interface Props {
  type: 'image' | 'video'
}

function AddButton ({ type }: Props) {
  const { uploadImage, uploadVideo } = useUser()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    const file = event.target.files[0]

    if (type === 'image') {
      await uploadImage(file)
    } else {
      await uploadVideo(file)
    }
  }

  return (
    <form>
      <input
        className='hidden'
        type="file"
        id='file-upload'
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={handleChange}
      />
      <label
        className='cursor-pointer'
        htmlFor='file-upload'
      >
        <AddIcon className='w-[28px] h-[28px] md:w-[38px] md:h-[38px]'/>
      </label>
    </form>
  )
}

export default AddButton
