import React from 'react'
import cx from 'classnames'

import './index.scss'

export default function Button ({ children, disabled, onClick, secondary, tertiary, light }) {
  const className = cx('g-Button', {
    'g-Button--secondary': secondary,
    'g-Button--tertiary': tertiary,
    'g-Button--light': light,
    'g-Button--disabled': disabled
  })

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  )
}
