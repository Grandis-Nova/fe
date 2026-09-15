import { useState } from 'react'
import reactLogo from '../shared/assets/react.svg'
import viteLogo from '../shared/assets/vite.svg'
import * as styles from './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.card}>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </a>
      <h1>Vite + React + Vanilla Extract</h1>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App
