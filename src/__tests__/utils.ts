import { type ExtendedFileType } from '@/type'
import { incrementedName, sortList } from '@/util/utils'

describe('Test incrementedName', () => {
  test('check if it does not return a list item', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' }
    ]
    const listNameArray = listName.map(item => item.name)
    const resultName = incrementedName('panda.png', listName)

    expect(listNameArray).not.toEqual(expect.arrayContaining([resultName]))
  })

  test('check that it does not increment the name if it has different formatting', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' }
    ]

    // Manejar errores si la función incrementedName() lanza una excepción
    expect(() => incrementedName('panda.jpg', listName)).not.toThrow()

    // Prueba con diferentes extensiones
    expect(incrementedName('panda.jpg', listName)).toBe('panda.jpg')
    expect(incrementedName('panda.jpeg', listName)).toBe('panda.jpeg')

    // Prueba con nombres que ya existen en la lista
    expect(incrementedName('gato.jpg', listName)).toBe('gato.jpg')

    // Prueba con nombres que contienen caracteres especiales
    expect(incrementedName('pepé.jpg', listName)).toBe('pepé.jpg')
  })

  test('check that the name increments in number depending on whether the name is repeated', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' }
    ]

    // Manejar errores si la función incrementedName() lanza una excepción
    expect(() => incrementedName('panda.png', listName)).not.toThrow()
    // Prueba que incremente el contador del nombre
    expect(incrementedName('panda.png', listName)).toBe('panda(1).png')

    const listName2 = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' },
      { name: 'panda(1).png' }
    ]

    // Manejar errores si la función incrementedName() lanza una excepción
    expect(() => incrementedName('panda.png', listName2)).not.toThrow()
    // Prueba que incremente el contador del nombre
    expect(incrementedName('panda.png', listName2)).toBe('panda(2).png')

    const listName3 = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' },
      { name: 'panda(1).png' },
      { name: 'panda(2).png' }
    ]

    // Manejar errores si la función incrementedName() lanza una excepción
    expect(() => incrementedName('panda.png', listName3)).not.toThrow()
    // Prueba que incremente el contador del nombre
    expect(incrementedName('panda.png', listName3)).toBe('panda(3).png')
  })

  test('check  not to increment the name if there is no value equal to it ', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda(1).png' }
    ]

    expect(() => incrementedName('panda.png', listName)).not.toThrow()
    expect(incrementedName('panda.png', listName)).toBe('panda.png')
  })

  test('check that the name is not repeated if there are already other incremental names in the list', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' },
      { name: 'panda(1).png' },
      { name: 'panda(3).png' }
    ]

    expect(incrementedName('panda.png', listName)).toBe('panda(4).png')
    const listName2 = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' },
      { name: 'panda(1).png' },
      { name: 'panda(4).png' },
      { name: 'panda(3).png' }
    ]

    expect(incrementedName('panda.png', listName2)).toBe('panda(5).png')
  })
})

describe('Test sortList', () => {
  test('Order from a-z', () => {
    const data: ExtendedFileType[] = [
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ]

    expect(sortList(data, 'A-Z')).toEqual([
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ])
  })
  test('Order from z-a', () => {
    const data: ExtendedFileType[] = [
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ]

    expect(sortList(data, 'Z-A')).toEqual([
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }, {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ])
  })

  test('Order from RECENT', () => {
    const data: ExtendedFileType[] = [
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ]

    expect(sortList(data, 'RECENT')).toEqual([
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Cocodrilo.jpg',
        fileName: 'Cocodrilo.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Alacran.jpg',
        fileName: 'Alacrán.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      },
      {
        id: '2A8875782',
        fileType: 'image',
        favorite: false,
        name: 'Ballena.jpg',
        fileName: 'Ballena.jpg',
        height: 222,
        width: 222,
        size: 1200,
        url: 'http://web/panda.jpg',
        thumbnailUrl: 'http://web/panda.jpg'
      }
    ])
  })
})
