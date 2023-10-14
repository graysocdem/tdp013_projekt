import Homepage from '../Homepage/Homepage'
import Userpage from '../Userpage/Userpage'
import Login from '../Login/Login'
import Friendlist from '../Friendlist/Friendlist'
import Search from '../Search/Search'
import Error from '../Error/Error'
import { useNavigate, Route, Routes } from "react-router-dom"

const MyRoutes = () => {

    const navigate = useNavigate()
    const user = localStorage.getItem("user")

    if (user !== null) {
        return (
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/friends" element={<Friendlist />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:username" element={<Userpage />} />
                <Route element={<Error />} />
            </Routes>
            )
    }
    else {
        return ( <Login /> )
    }

}

export default MyRoutes