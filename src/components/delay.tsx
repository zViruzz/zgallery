import React from 'react'
import ImageContainer from './image-container'

async function Delay () {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(<ImageContainer />)
    }, 10000) // 2000 milisegundos = 2 segundos
  })
}

export default Delay
