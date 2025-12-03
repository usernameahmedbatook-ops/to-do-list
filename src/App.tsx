import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Heading from './compontens/heading'
import Taskadder from './compontens/Taskadder'
import Ending from './compontens/Ending'
import Addtask from './compontens/Addtask'
import Adder from './compontens/Adder'
import Forms from './compontens/Forms'
import Pagination from './compontens/pagination'


function App() {

  return (
    <>
      <div>
        <Heading />
        <Forms />
        <Addtask />
        <Adder />
        <Taskadder />
        <Ending />
        <Pagination />
      
      
      </div>


    </>
  )
}










export default App
