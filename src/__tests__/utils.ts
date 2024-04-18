import { incrementedName } from '@/util/utils'

describe('Test incrementedName', () => {
  test('comprobar si no devuelve un elemento item de la lista', () => {
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
})
