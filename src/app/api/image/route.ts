import { NextResponse } from 'next/server'
import { interImage } from '@/services/image'
import { deleteFile, favoriteFile } from '@/services/supabase'
import { type resolutionType } from '@/type'

export async function POST (request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const resolution = JSON.parse(formData.get('resolution') as string) as resolutionType

    const { data, error } = await interImage(image, resolution)

    if (error !== null) return NextResponse.json(error)

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

  if (name === null) return
  const res = favoriteFile(name)

  return NextResponse.json(res)
}
