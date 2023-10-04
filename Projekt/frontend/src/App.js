import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Homepage from './Components/Homepage/Homepage';

import Friendpage from './Components/Friendspage';

import { Route, Routes } from "react-router-dom"

function App() {
  
  let isLoggedIn = true

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
          <Route path="/" element={<Homepage />} />
          <Route path="/u/:friendName" element={<h1>Friendpage placeholder</h1>} />
          {/* <Friendpage /> */}
        </Routes>
      :
        <Login />
      }

    </div>
  );
}

export default App;
