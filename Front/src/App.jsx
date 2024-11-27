//import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import ContextUser from './controllers/ContextUser'
import { useState } from 'react'

function App() {
const [jwt, setJwt] = useState("");
const [points, setPoints] = useState(0);
const [pfp, setPfp] = useState("");
const [userName, setUserName] = useState("");



const contextValues = {
  jwt,
  setJwt,
  points,
  setPoints,
  pfp,
  setPfp,
  userName,
  setUserName
}


  return (
    <>
    <ContextUser.Provider value={contextValues}>

    <Outlet />
    </ContextUser.Provider>
    </>
  )
}

export default App
