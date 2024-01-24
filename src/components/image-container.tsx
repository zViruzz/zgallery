import React from 'react'
import ViewImage from './view-image'
import authUser from '@/util/authUser'

async function ImageContainer () {
  const { supabase } = await authUser()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('data_image')
    .select('list_image')
    .eq('user_id', user?.id)

  const imageUrl = []
  const list = data[0].list_image === null ? [] : data[0].list_image.image

  for (const { name, id, height, width } of list) {
    const { data } = await supabase.storage
      .from('image')
      .createSignedUrl(`${user?.id}/${name}`, 3600)

    if (data === null) continue
    const url = data.signedUrl

    imageUrl.push({ id, name, url, height, width })
  }

  return (
    <>
      <ViewImage list={imageUrl} />
    </>
  )
}

export default ImageContainer
