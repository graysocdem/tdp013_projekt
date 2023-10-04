import logo from './logo.svg'
import './App.css'

import Login from './Components/Login/Login'
import Homepage from './Components/Homepage/Homepage'
import Friendlist from './Components/Friendlist/Friendlist'
import Search from './Components/Search/Search'
import { Route, Routes } from "react-router-dom"

function App() {
  
  let isLoggedIn = localStorage.getItem("user") != null

  //Login
  //Homepage
  //Friend's page

  // const { friendName } = useParams();
  
  // TODO:
  // <Homepage>
  // <Friendpage>

  return (
    <div>
      {isLoggedIn ? 
        // <Navbar />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/friends" element={<Friendlist />} />
          <Route path="/search" element={<Search />} />
          {/* <Friendpage /> */}
        </Routes>
      :
        <Login />
      }

    </div>
  );
}

export default App;
