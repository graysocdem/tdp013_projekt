import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Friendlist.css"
import Navbar from "../Navigation/Navbar"
import Friend from "../Friend/Friend"
import Request from "../Request/Request"

import fetchUser from "../../Scripts/fetchUser.js"

const Friendlist = () => {

    const navigate = useNavigate()

    const ownerName = localStorage.getItem("user")
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tokenExpired, setTokenExpired] = useState(false)

    useEffect(() => {
        if (tokenExpired) {
            localStorage.clear()
            navigate("/")
        }
    }, [tokenExpired])

    useEffect(() => {

        const middle = async () => {
            if (!owner) {
                const result = await fetchUser(ownerName, localStorage.getItem("token"))

                if (result) {
                    setOwner(result)
                }
                else {
                    setTokenExpired(true)
                }
            }
        }
        middle()
        if (owner !== null) { setLoading(false) }
    }, [owner])

    if (!loading) {
        console.log("loading:", loading)
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>Friends</div>
                    <div className='underline'></div>
                </div>

                <div className='friend-container'>
                    <div className='sub-container'>
                        <h1>Friends</h1>
                        {owner.friends.map((friend) => (
                            <Friend name={friend} />
                        ))}
                    </div>
                    <div className='sub-container'>
                        <h1>Requests</h1>
                        {owner.requests.map((suitor) => (
                            <Request suitor={suitor} ownerName={ownerName} />
                        ))}                     
                    </div>
                </div>
                
            </div>

        )
    }
    else {
        return ( <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>Friends</div>
                    <div className='underline'></div>
                </div>

                <h1> Loading... </h1>
                
            </div>)
    }
}

export default Friendlist