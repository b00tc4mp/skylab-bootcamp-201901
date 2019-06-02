import React from 'react'
import { RegisterForm } from '../../components/RegisterForm'

export function Register ({ onRegister }) {
  return (
    <section className='g-Layout'>
      <h1 className='title'>Register!</h1>
      <RegisterForm />
    </section>
  )
}
