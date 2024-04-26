import FileContainer from '@/components/file-container'
import AddIcon from '@/components/Icons/add-icon'
import { SORT_TYPE, SP_TABLET } from '@/static/static'
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
    .from(SP_TABLET.PROFILES)
    .select('list_files')
    .eq('user_id', user?.id)

  if (data === null) return

  let list: FileType[] =
    data[0].list_files === null
      ? []
      : data[0].list_files.image

  if (list.length === 0) {
    return (
      <div className='grid place-content-center md:text-2xl'>
        <div>
          Upload images with the <AddIcon className='inline mb-1 md:w-7 md:h-7 h-5 w-5' /> button
        </div>
      </div>
    )
  }

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
