import FileContainer from '@/components/file-container'
import { SORT_TYPE } from '@/static/static'
import { type FileType, type ExtendedFileType } from '@/type'
import authUser from '@/util/auth-user'
import { sortList } from '@/util/utils'

interface Props {
  searchParams: {
    name: string
    sort: string
  }
}
async function page ({ searchParams }: Props) {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()
  const { name, sort } = searchParams

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  if (data === null) return

  let list: FileType[] =
    data[0].list_image === null
      ? []
      : data[0].list_image.image

  list = list.filter(img => img.fileType === 'image')

  if (name !== undefined) {
    list = list.filter(img => img.name.includes(name))
  }

  const pathList = list
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

  if (sort !== undefined) {
    if (
      sort !== SORT_TYPE.RECENT &&
      sort !== SORT_TYPE.RECENT_INVERT &&
      sort !== SORT_TYPE.A_Z &&
      sort !== SORT_TYPE.Z_A
    ) return

    const newList = sortList(imageUrl, sort)
    return (
      <FileContainer list={newList} />
    )
  }

  return (
    <FileContainer list={imageUrl} />
  )
}

export default page
