'use client'
import AddIcon from '@/components/icons/AddIcon'
import useUser from '@/hook/useUser'
import NotificationLayout from './NotificationLayout'

interface Props {
  type: 'image' | 'video'
}

function AddButton({ type }: Props) {
  const { uploadImage, uploadVideo } = useUser()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    const file = event.target.files[0]

    if (type === 'image') {
      await uploadImage(file)
    } else {
      await uploadVideo(file)
    }
    // * No sie usa el router.refresh() porque da conflicto con al metodo afterOpen de componente file-container, acumulando llamadas
    // location.reload()
  }

  return (
    <>
      <NotificationLayout />
      <form>
        <input
          className='hidden'
          type="file"
          id='file-upload'
          accept={type === 'image' ? 'image/*' : 'video/*'}
          onChange={handleChange}
        />
        <label
          className='h-10 w-10  grid place-content-center cursor-pointer'
          htmlFor='file-upload'
        >
          <AddIcon className='w-[28px] h-[28px] md:w-[35px] md:h-[35px]' />
        </label>
      </form>
    </>
  )
}

export default AddButton
