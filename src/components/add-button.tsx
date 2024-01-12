'use client'
import AddIcon from '@/components/Icons/AddIcon'
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
        <AddIcon width={38} height={38} />
      </label>
    </form>
  )
}

export default AddButton
