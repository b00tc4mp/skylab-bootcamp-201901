import React from 'react'

import { LoginForm } from '../../components/LoginForm'

export function Login ({ onLogin }) {
  return (
    <section className='g-Layout'>
      <h1 className='title'>Log in to enjoy our gelatos!</h1>
      <LoginForm />
    </section>
  )
}
