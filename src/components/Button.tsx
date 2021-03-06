import React from 'react'
import './Button.scss'

type Props = {
  children: string
  onClick: (children: string) => void
}

interface CustomObject {
  [key: string]: any
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  const operatorId: CustomObject = {
    '+': 'add',
    '-': 'subtract',
    x: 'multiply',
    '/': 'divide',
    '.': 'decimal',
    '=': 'equals',
    '%': 'percent',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
    AC: 'all-clear',
    C: 'clear'
  }

  return (
    <div
      id={operatorId[children]}
      className={`button ${operatorId[children]}`}
      onClick={() => onClick(children)}
    >
      {children}
    </div>
  )
}

export default Button
