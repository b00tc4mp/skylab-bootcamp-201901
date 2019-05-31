import React from 'react'
import Modal from "../Modal"
import useCustomHook from '../CustomHook'

export default function ModalExample(){
  const {isShowing, toggle} = useCustomHook()
  
  return (
    <div>
      <button onClick={toggle}>Show Modal</button>
      <Modal isShowing={isShowing} hide={toggle}/>
    </div>
  )
}
