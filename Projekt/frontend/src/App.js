import './App.css'
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login/Login'
import MyRoutes from './Components/MyRoutes/MyRoutes'

import { useEffect, useState } from "react"

function App() {

  const navigate = useNavigate()
  const [comp, setComp] = useState(<Login />)

  let user = localStorage.getItem("user")

  useEffect(() => {
      if (user != null ) {
        setComp(<MyRoutes />)
      }
      else {
        navigate("/")
        setComp(<Login />)
      }
  }, [user])
  
  return (
    comp
  )

}

export default App;
