import logo from './logo.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login/Login'
// import Homepage from './Components/Homepage/Homepage'
// import Friendlist from './Components/Friendlist/Friendlist'
// import Search from './Components/Search/Search'
import MyRoutes from './Components/MyRoutes/MyRoutes'

import { useEffect, useState } from "react"

function App() {

  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user") != null)
  const navigate = useNavigate()
  const [comp, setComp] = useState(<Login />)
  let user = localStorage.getItem("user")
  
  // if (localStorage.getItem("user") != null) {
  //   setLoggedIn = true
  // }
  // else {
  //   setLoggedIn = false
  // }
  
  //Login
  //Homepage
  //Friend's page

  // const { friendName } = useParams();

  // TODO:
  // <Homepage>
  // <Friendpage>

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
