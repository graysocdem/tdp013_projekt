import Homepage from '../Homepage/Homepage'
import Userpage from '../Userpage/Userpage'
import Friendlist from '../Friendlist/Friendlist'
import Search from '../Search/Search'
import Error from '../Error/Error'

import { Route, Routes } from "react-router-dom"

const MyRoutes = () => {

    return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/friends" element={<Friendlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:username" element={<Userpage />} />
        <Route element={<Error />} />
    </Routes>
    )
}

export default MyRoutes