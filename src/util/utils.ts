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
        reject(new Error('No se pudo leer la imagen'))
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

export function incrementedName (name: string, list: Array<{ name: string }>) {
  if (list.length === 0) return name

  let count = 0
  const result = getStringAndNumberBeforeParentheses(name)

  const nameBefore = result === null ? name : result.nameBefore

  for (const element of list) {
    if (element.name.startsWith(nameBefore)) {
      count += 1
    }
  }

  const arrayName = name.split('.')
  const extension = arrayName[arrayName.length - 1]
  const newName = `${nameBefore}(${count}).${extension}`

  if (count === 0) return name

  return newName
}

export function getStringAndNumberBeforeParentheses (text: string): { nameBefore: string, countParentheses?: string, extension?: string } | null {
  const regex = /(.+)(\(\d+\))/
  const match = text.match(regex)

  if (match !== null) {
    return { nameBefore: match[1], countParentheses: match[2] }
  }

  const regexFormat = /^(.+)\.([^.]+)$/
  const matchFormat = text.match(regexFormat)

  if (matchFormat !== null) {
    return { nameBefore: matchFormat[1], extension: matchFormat[2] }
  }

  return null
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
      const nombreA = a.name.toUpperCase()
      const nombreB = b.name.toUpperCase()

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
