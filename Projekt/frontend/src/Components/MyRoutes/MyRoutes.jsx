import Login from '../Login/Login'
import Homepage from '../Homepage/Homepage'
import Friendlist from '../Friendlist/Friendlist'
import Search from '../Search/Search'
import Error from '../Error/Error'

import { Route, Routes } from "react-router-dom"

const MyRoutes = () => {
    const isLoggedIn = null

    return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/friends" element={<Friendlist />} />
        <Route path="/search" element={<Search />} />
        <Route element={<Error />} />
    </Routes>
    )
}

export default MyRoutes