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
    const nameBefore = resultMatch === null ? name : resultMatch.nameBefore
    const isexist = resultUniqueName.includes(nameBefore)
    console.log('🚀 ~ it ~ isexist:', isexist)
    // const resultMatch = getStringAndNumberBeforeParentheses(name)

    const isInclude = listName.find(item => item.name === name)
    console.log('🚀 ~ it ~ isInclude:', isInclude)
    // expect(listNameArray).not.toEqual(expect.arrayContaining([resultName]))
  })

  // it('does not match if received does not contain expected elements', () => {
  //   expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected))
  // })
})
