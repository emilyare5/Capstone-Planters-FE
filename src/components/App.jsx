import React, { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import '../style/index.css'
import Inventory from './Inventory'

const App = () => {


  return (
    <div>

      <div>
        <Link to="/"> <button>Home</button> </Link>
      </div>


      <Routes>
        <Route path="/" element={<Inventory/>} />
      </Routes>
    </div>
  )
}



export default App
