export async function uploadImageSB (file: File, resolution: { width: number, height: number }) {
  const apiUrl = 'http://localhost:3000/api/image' // Reemplaza con la URL de tu API

  const formData = new FormData()
  formData.append('image', file) // 'archivo' es el nombre del campo en tu API
  formData.append('resolution', JSON.stringify(resolution)) // 'archivo' es el nombre del campo en tu API

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.log('Archivo enviado correctamente.')
    } else {
      console.error('Error al enviar el archivo:', response.statusText)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}

export async function uploadVideoSB (video: File, thumbnail: File, resolution: { width: number, height: number }) {
  const apiUrl = 'http://localhost:3000/api/video' // Reemplaza con la URL de tu API

  const formData = new FormData()
  formData.append('video', video) // 'archivo' es el nombre del campo en tu API
  formData.append('thumbnail', thumbnail) // 'archivo' es el nombre del campo en tu API
  formData.append('resolution', JSON.stringify(resolution)) // 'archivo' es el nombre del campo en tu API

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.log('Archivo enviado correctamente.')
    } else {
      console.error('Error al enviar el archivo:', response.statusText)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}

export async function uploadRemoveSB (name: string, fileType: 'image' | 'video') {
  const apiUrl = 'http://localhost:3000/api/video' // Reemplaza con la URL de tu API

  const formData = new FormData()
  formData.append('name', name) // 'archivo' es el nombre del campo en tu API
  formData.append('fileType', fileType) // 'archivo' es el nombre del campo en tu API

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      body: formData
    })

    if (response.ok) {
      console.log('Archivo enviado correctamente.')
    } else {
      console.error('Error al enviar el archivo:', response.statusText)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}

export async function updatingFileFavorites (name: string) {
  const params = new URLSearchParams()
  params.append('name', name)

  const apiUrl = 'http://localhost:3000/api/image?' + params.toString()

  console.log('🚀 ~ updatingFileFavorites ~ apiUrl:', apiUrl)
  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH'
    })

    if (response.ok) {
      console.log('Does')
    } else {
      console.error('Error', response.statusText)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}
