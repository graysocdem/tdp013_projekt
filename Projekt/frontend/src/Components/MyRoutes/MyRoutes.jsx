import Homepage from '../Homepage/Homepage'
import Userpage from '../Userpage/Userpage'
import Friendlist from '../Friendlist/Friendlist'
import Search from '../Search/Search'
import Error from '../Error/Error'
import { useNavigate } from 'react-router-dom'


import { Navigate, Route, Routes } from "react-router-dom"

const MyRoutes = () => {

    const navigate = useNavigate()


    return (
    <Routes>
        <Route path="/" onClick={() => {navigate("/homepage")}} element={<Homepage />}/>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/friends" element={<Friendlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:username" element={<Userpage />} />
        <Route element={<Error />} />
    </Routes>
    )
}

export default MyRoutes