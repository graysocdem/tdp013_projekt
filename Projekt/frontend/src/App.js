import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Friendpage from './Components/Friendspage';

import { Route, Routes } from "react-router-dom"

function App() {
  
  let isLoggedIn = false

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
        <Routes>
          <Route path="/" element={<h1>Homepage placeholder</h1>} />
          <Route path="/u/:friendName" element={<Friendpage />} />
        </Routes>
      :
        <Login/>
      }

    </div>
  );
}

export default App;
