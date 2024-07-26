import { NextResponse } from 'next/server'
import { interImage } from '@/services/image'
import { createServerClientHandle, deleteFile, favoriteFile } from '@/services/supabase'
import { type ExtendedFileType, type FileType, type resolutionType } from '@/type'
import { SP_TABLET } from '@/static/static'

export async function GET (request: Request) {
  const supabase = await createServerClientHandle()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from(SP_TABLET.PROFILES)
    .select('list_files')
    .eq('user_id', user?.id)

  if (data === null) return NextResponse.json({ error: 'is null data' }, { status: 500 })

  let list: FileType[] =
    data[0].list_files === null
      ? []
      : data[0].list_files.image

  if (list.length === 0) {
    console.log('cero')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  list = list.filter(img => img.fileType === 'image')

  const pathList = list
    .map(img => `${user?.id}/${img.fileName}`)

  const { data: listOfUrls } = await supabase.storage
    .from('image')
    .createSignedUrls(pathList, 10000)

  if (listOfUrls === null) return NextResponse.json({ error: 'is null listOfUrls' }, { status: 500 })

  const imageUrl: ExtendedFileType[] = list
    .filter((item, index) =>
      item.fileType === 'image' &&
      listOfUrls[index] !== undefined
    )
    .map((item, index) => ({
      ...item,
      url: listOfUrls[index].signedUrl
    }))

  return NextResponse.json({ list: imageUrl })
}

export async function POST (request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const resolution = JSON.parse(formData.get('resolution') as string) as resolutionType

    const { data, error } = await interImage(image, resolution)

    if (error !== null) {
      return NextResponse.json(
        { message: error.message, error: true },
        { status: error.status }
      )
    }
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE (request: Request) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const fileType = formData.get('fileType') as 'image'

  const { data, error } = await deleteFile(name, fileType)
  if (error !== null) return NextResponse.json(error)

  return NextResponse.json(data)
}

export async function PATCH (request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const favorite = searchParams.get('favorite')

  if (name === null) return
  if (favorite === null) return

  const res = favoriteFile(name, favorite)

  return NextResponse.json(res)
}
