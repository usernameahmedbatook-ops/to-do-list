import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Heading from './compontens/heading'
import Taskadder from './compontens/Taskadder'
import Ending from './compontens/Ending'
import Addtask from './compontens/Addtask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Heading/>
        <Addtask/>
        <Taskadder/>
        <Ending/>
       </div>
    </>
  )
}

export default App
