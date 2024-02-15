import { NextResponse } from 'next/server'
import { interImage } from '@/services/image'
import { deleteFile } from '@/services/supabase'

export async function POST (request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const resolution = JSON.parse(formData.get('resolution') as string) as { width: number, height: number }

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
