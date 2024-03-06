import FileContainer from '@/components/file-container'
import { type FileType, type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'

interface Props {
  searchParams: {
    name: string
  }
}

async function page ({ searchParams }: Props) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()
  const { name } = searchParams

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  if (data === null) return

  let list: FileType[] =
    data[0].list_image === null
      ? []
      : data[0].list_image.image

  if (name !== undefined) {
    list = list.filter(img => img.name.includes(name))
  }

  const pathList = list
    .filter(img => img.fileType === 'image')
    .map(img => `${user?.id}/${img.fileName}`)

  const { data: listOfUrls } = await supabase.storage
    .from('image')
    .createSignedUrls(pathList, 10000)

  if (listOfUrls === null) return

  const imageUrl: ExtendedFileType[] = list
    .filter((item, index) =>
      item.fileType === 'image' &&
      listOfUrls[index] !== undefined
    )
    .map((item, index) => ({
      ...item,
      url: listOfUrls[index].signedUrl
    }))

  return (
    <FileContainer list={imageUrl} />
  )
}

export default page
