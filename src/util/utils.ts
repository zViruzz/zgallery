export const getResolutionImage = async (file: File): Promise<{ width: number, height: number }> => {
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

export const incrementedName = (name: string, list: Array<{ name: string }>) => {
  if (list.length === 0) return name

  let count = 0
  const result = getStringAndNumberBeforeParentheses(name)

  const nameBefore = result === null ? name : result.nameBefore
  console.log('🚀 ~ incrementedName ~ nameBefore:', nameBefore)

  for (const element of list) {
    if (element.name.startsWith(nameBefore)) {
      count += 1
    }
  }
  console.log('🚀 ~ incrementedName ~ count:', count)

  const arrayName = name.split('.')
  const extension = arrayName[arrayName.length - 1]
  const newName = `${nameBefore}(${count}).${extension}`

  console.log('🚀 ~ incrementedName ~ newName:', newName)
  return newName
}

function getStringAndNumberBeforeParentheses (text: string): { nameBefore: string, countParentheses?: string, extension?: string } | null {
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
