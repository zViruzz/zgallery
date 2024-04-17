import { getStringAndNumberBeforeParentheses, incrementedName } from '@/util/utils'

describe('Test incrementedName', () => {
  it('comprobar si no devuelve un elemento item de la lista', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' }
    ]
    const listNameArray = listName.map(item => item.name)
    const resultName = incrementedName('panda.png', listName)

    expect(listNameArray).not.toEqual(expect.arrayContaining([resultName]))
  })

  it('----------------------', () => {
    const listName = [
      { name: 'gato.png' },
      { name: 'dog.jpg' },
      { name: 'panda.png' }
    ]

    const name = 'panda.jpg'
    const resultUniqueName = incrementedName(name, listName) // panda(1).jpg
    console.log('🚀 ~ it ~ resultUniqueName:', resultUniqueName)
    const resultMatch = getStringAndNumberBeforeParentheses(name)

    if (resultMatch === null) { console.log('resultMatch null'); return }
    const { nameBefore, extension } = resultMatch

    const nameOnlyOfList = listName.find(item => item.name.includes(nameBefore))
    console.log('🚀 ~ it ~ nameOnlyOfList:', nameOnlyOfList)

    if (extension === undefined) { console.log('extension undefined'); return }
    const isName = nameOnlyOfList?.name.includes(nameBefore)
    const isFormat = nameOnlyOfList?.name.includes(extension)
    // console.log('🚀 ~ it ~ isName:', nameBefore, isName)
    // console.log('🚀 ~ it ~ isFormat:', extension, isFormat)

    if (isName === true && isFormat === false) {
      const regex = /\(\d+\)/
      console.log('🚀 ~ it ~ regex.test(name):', regex.test(resultUniqueName))
      if (regex.test(resultUniqueName)) {
        console.error('contiene un numero adentro con parentesis', resultUniqueName, listName)
      }
    } else {
      console.log('Todo correcto', name, nameOnlyOfList)
    }
    // const resultMatch = getStringAndNumberBeforeParentheses(name)
    // expect(listNameArray).not.toEqual(expect.arrayContaining([resultName]))
  })

  // it('does not match if received does not contain expected elements', () => {
  //   expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected))
  // })
})
