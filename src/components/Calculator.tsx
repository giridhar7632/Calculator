import React, { useState } from 'react'
import Button from './Button'
import * as math from 'mathjs'
import './Calculator.scss'

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('0')
  const [prevInput, setPrevInput] = useState<string>('0')
  const [formula, setFormula] = useState<string>('')
  const [evaluated, setEvaluated] = useState<boolean>(false)

  const isOperator = /[x/+‑]/
  const endsWithOperator = /[x+‑/]$/
  const endsWithNegativeSign = /\d[x/+‑]{1}‑$/

  const maxDigitWarning = () => {
    setInput('Max digit limit reached')
    setPrevInput(input)

    setTimeout(() => {
      setInput(prevInput)
    }, 1500)
  }
  const handleEvaluate = () => {
    if (!input.includes('limit') && !formula.includes('=')) {
      let expression = formula
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1)
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/-/g, '-')
        .replace('--', '+0+0+0+0+0+0+')
      let answer = math.evaluate(expression)
      answer = Math.round(1000000000000 * answer) / 1000000000000
      setInput(answer.toString())
      setFormula(
        `${expression
          .replace(/\*/g, '⋅')
          .replace(/-/g, '-')
          .replace('+0+0+0+0+0+0+', '--')
          .replace(/(x|\/|\+)‑/, '$1-')
          .replace(/^‑/, '-')} = ${answer}`
      )
      setPrevInput(answer)
      setEvaluated(true)
    }
  }
  const handleOperater = (val: string) => {
    if (!input.includes('limit')) {
      setInput(val)
      setEvaluated(false)
      if (evaluated) {
        setFormula(prevInput + val)
      } else if (!endsWithOperator.test(formula)) {
        setPrevInput(formula)
        setFormula(formula + val)
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula(
          (endsWithNegativeSign.test(formula + val) ? formula : prevInput) + val
        )
      } else if (val !== '-') {
        setFormula(prevInput + val)
      }
    }
  }
  const handleInput = (val: string) => {
    if (!input.includes('limit')) {
      setEvaluated(false)
      if (input.length > 17) {
        maxDigitWarning()
      } else if (evaluated) {
        setInput(val)
        setFormula(val !== '0' ? val : '')
      } else {
        setInput(input === '0' || isOperator.test(input) ? val : input + val)
        setFormula(
          input === '0' && val === '0'
            ? formula === ''
              ? val
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + val
            : formula + val
        )
      }
    }
  }
  const handleDecimal = () => {
    if (evaluated === true) {
      setInput('0.')
      setFormula('0.')
      setEvaluated(false)
    } else if (!input.includes('.') && !input.includes('limit')) {
      setEvaluated(false)
      if (input.length > 17) {
        maxDigitWarning()
      } else if (
        endsWithOperator.test(formula) ||
        (input === '0' && formula === '')
      ) {
        setInput('0.')
        setFormula(formula + '0.')
      } else {
        setInput(
          formula.match(/(-?\d+\.?\d*)$/)
            ? `${formula.match(/(-?\d+\.?\d*)$/)[0]}.`
            : '0.'
        )
        setFormula(
          endsWithOperator.test(input) ? `${formula}.` : `${formula}0.`
        )
      }
    }
  }
  const handleClear = () => {
    setInput('0')
    setPrevInput('')
    setFormula('')
    setEvaluated(false)
  }
  const handleDel = () => {
    if (input === '0') {
      return
    } else if (input.length === 1) {
      setInput('0')
    } else {
      setInput(input.slice(0, -1))
    }
  }

  return (
    <div className="calculator-container">
      <div id="display" className="display">
        <div className="prev-input">{formula.replace(/x/g, '⋅')}</div>
        <div className="input">{input}</div>
      </div>
      <div className="btn-pad">
        <div className="row">
          <Button onClick={handleClear}>AC</Button>
          <Button onClick={handleDel}>C</Button>
          <Button onClick={handleOperater}>/</Button>
        </div>
        <div className="row">
          <Button onClick={handleInput}>7</Button>
          <Button onClick={handleInput}>8</Button>
          <Button onClick={handleInput}>9</Button>
          <Button onClick={handleOperater}>+</Button>
        </div>
        <div className="row">
          <Button onClick={handleInput}>4</Button>
          <Button onClick={handleInput}>5</Button>
          <Button onClick={handleInput}>6</Button>
          <Button onClick={handleOperater}>-</Button>
        </div>
        <div className="row">
          <Button onClick={handleInput}>1</Button>
          <Button onClick={handleInput}>2</Button>
          <Button onClick={handleInput}>3</Button>
          <Button onClick={handleOperater}>x</Button>
        </div>
        <div className="row">
          <Button onClick={handleDecimal}>.</Button>
          <Button onClick={handleInput}>0</Button>
          <Button onClick={handleInput}>+/-</Button>
          <Button onClick={handleEvaluate}>=</Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
