import './styles.scss'
import Calculator from './components/Calculator'

export default function App() {
  return (
    <div className="App">
      <h1>
        Calculator{' '}
        <span role="img" aria-label="abacus">
          🧮
        </span>
      </h1>
      <Calculator />
    </div>
  )
}
