import { SORT_TYPE, type OrderParameter } from '@/static/static'
import { type ExtendedFileType } from '@/type'

export async function getResolutionImage (file: File): Promise<{ width: number, height: number }> {
  return await new Promise((resolve, reject) => {
    if (file !== null) {
      const lector = new FileReader()
      lector.readAsDataURL(file)
      lector.onload = function (e) {
        const img = new Image()
        img.onload = () => {
          const resolucion = {
            width: img.width,
            height: img.height
          }
          resolve(resolucion)
        }
        img.src = e.target?.result as string
      }
      lector.onerror = function () {
        reject(new Error('No se pudo leer la images'))
      }
    } else {
      reject(new Error('No se seleccionó ninguna imagen'))
    }
  })
}

export async function getResolutionVideo (file: File): Promise<{ width: number, height: number }> {
  return await new Promise((resolve, reject) => {
    if (file !== null) {
      const fileURL = URL.createObjectURL(file)
      // Crear un elemento de video
      const video = document.createElement('video')
      video.src = fileURL
      video.addEventListener('loadedmetadata', async () => {
        // Aquí ya se puede acceder a las propiedades de videoWidth y videoHeight
        const resolucion = {
          width: video.videoWidth,
          height: video.videoHeight
        }
        resolve(resolucion)
        // No olvides liberar la URL temporal después de usarla
        URL.revokeObjectURL(fileURL)
      }, { once: true })
    } else {
      reject(new Error('No se seleccionó ninguna imagen'))
    }
  })
}

// Definición de función exportada para incrementar un nombre en una lista
export function incrementedName (name: string, list: Array<{ name: string }>) {
  // Si la lista está vacía, devuelve el nombre sin cambios
  if (list.length === 0) return name
  // Comprueba si el nombre no está en la lista, si es así, devuelve el nombre sin cambios
  if (list.every(x => x.name !== name)) {
    return name
  }

  let count = 0
  const nameData = getNameAndFormat(name)

  // Si el nombre no se puede analizar correctamente, devuelve el nombre sin cambios
  if (typeof nameData === 'string') return name

  // Itera sobre la lista para contar la cantidad de nombres duplicados con el mismo formato
  for (const element of list) {
    if (
      element.name.startsWith(nameData.nameBefore) &&
      element.name.endsWith(nameData.format)
    ) {
      count += 1
    }
  }

  // Itera sobre la lista para encontrar si el nuevo nombre generado ya existe
  for (const element of list) {
    const newName = `${nameData.nameBefore}(${count}).${nameData.format}`
    // Si el nuevo nombre generado ya existe en la lista, incrementa el contador
    if (newName === element.name) {
      count += 1
    }
  }

  // Genera el nuevo nombre con el contador actualizado
  const newName = `${nameData.nameBefore}(${count}).${nameData.format}`
  // Si no se encontraron nombres duplicados, devuelve el nombre sin cambios
  if (count === 0) return name

  // Devuelve el nuevo nombre generado
  return newName
}

export function getNameAndFormat (text: string): { nameBefore: string, format: string } | string {
  // const regex = /(.+)(\(\d+\))/
  // const match = text.match(regex)

  // if (match !== null) {
  //   return { nameBefore: match[1], countParentheses: match[2] }
  // }

  const regexFormat = /^(.+)\.([^.]+)$/
  const matchFormat = text.match(regexFormat)

  if (matchFormat !== null) {
    return { nameBefore: matchFormat[1], format: matchFormat[2] }
  }
  return text
}

export async function importFileandPreview (file: File, revoke: boolean): Promise<string> {
  return await new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    window.URL = window.URL || window.webkitURL
    const preview = window.URL.createObjectURL(file)
    // remove reference
    if (revoke) {
      window.URL.revokeObjectURL(preview)
    }
    setTimeout(() => {
      resolve(preview)
    }, 100)
  })
}

export async function getVideoThumbnailUrl (file: File, videoTimeInSeconds: number): Promise<string> {
  return await new Promise((resolve, reject) => {
    if (file.type.match('video') !== null) {
      importFileandPreview(file, false)
        .then((urlOfFIle) => {
          const video = document.createElement('video')
          const timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate)
              video.pause()
            }
          }
          video.addEventListener('loadeddata', function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate)
            }
          })
          const snapImage = function () {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            if (context !== null) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height)
            }
            const image = canvas.toDataURL()
            const success = image.length > 100000
            if (success) {
              URL.revokeObjectURL(urlOfFIle)
              resolve(image)
            }
            return success
          }
          video.addEventListener('timeupdate', timeupdate)
          video.preload = 'metadata'
          video.src = urlOfFIle
          // Load video in Safari / IE11
          video.muted = true
          video.playsInline = true
          video.currentTime = videoTimeInSeconds
          video.play()
        })
    } else {
      reject(new Error('file not valid'))
    }
  })
}

export async function getVideoThumbnail (file: File, videoTimeInSeconds: number): Promise<File> {
  return await new Promise((resolve, reject) => {
    getVideoThumbnailUrl(file, videoTimeInSeconds)
      .then(url => {
        fetch(url)
          .then(async (res) => await res.blob())
          .then((blob) => {
            const NewFile = new File([blob], 'video_thumbnail', {
              type: 'image/png'
            })
            resolve(NewFile)
          })
      })
  })
}
export function sortList (list: ExtendedFileType[], order: OrderParameter): any[] {
  if (order === SORT_TYPE.RECENT) {
    return list
  } else if (order === SORT_TYPE.RECENT_INVERT) {
    return list.reverse()
  } else if (order === SORT_TYPE.A_Z) {
    return list.sort((a, b) => {
      const nombreA = a.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const nombreB = b.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

      if (nombreA < nombreB) return -1
      if (nombreA > nombreB) return 1

      return 0
    })
  } else if (order === SORT_TYPE.Z_A) {
    return list.sort((a, b) => {
      const nombreA = a.name.toUpperCase()
      const nombreB = b.name.toUpperCase()

      if (nombreA > nombreB) return -1
      if (nombreA < nombreB) return 1

      return 0
    })
  }

  return list
}

export async function changeResolution (image: string, transform: { width: number, height: number }): Promise<string> {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // Esto es necesario si la imagen está en otro dominio

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx === null) return
      canvas.width = transform.width
      canvas.height = transform.height
      ctx.drawImage(img, 0, 0, transform.width, transform.height)

      let format = 'image/png'
      if (image.endsWith('.jpg') || image.endsWith('.jpeg')) {
        format = 'image/jpeg'
      }

      const resizedImageUrl = canvas.toDataURL(format)
      resolve(resizedImageUrl)
    }
    img.onerror = function () {
      console.error('No se pudo cargar la imagen. Verifica la URL y el soporte CORS.')
    }
    img.src = image
  }
  )
}
