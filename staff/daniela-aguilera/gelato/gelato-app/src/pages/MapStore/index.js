import React from 'react'
import Maps from '../../components/Maps'

export function MapStore () {
  return (
    <div className='content'>
      <article className='g-Order2'>
        <h1>Time to go for your <span>GELATO!</span> Choose your nearest store</h1>
        <div className='container-map'>
          <Maps />
        </div>
      </article>
    </div>
  )
}
