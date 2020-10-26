import clsx from 'clsx'
import React from 'react'

export const FieldContainer = ({ children, classes, ...props }) => {
  return (
    <div className={clsx('mv3', classes)} {...props}>
      {children}
    </div>
  )
}

export const Button = ({ children, classes, ...props }) => {
  return (
    <button className={clsx('f6 link grow br3 ba ph3 pv2 mb2 dib black bg-white', classes)} {...props}>
      {children}
    </button>
  )
}
