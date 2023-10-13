import { React, useState, useEffect } from 'react'
import "./Friendlist.css"
import Navbar from "../Navigation/Navbar"
import Friend from "../Friend/Friend"
import Request from "../Request/Request"

import fetchUser from "../../Scripts/fetchUser.js"

const Friendlist = () => {

    const ownerName = localStorage.getItem("user")
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const middle = async () => {
            setOwner(await fetchUser(ownerName))
        }
        middle()
        if (typeof owner !== Promise && owner !== null) { setLoading(false) }
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
                            <Request suitor={suitor} owner={ownerName}/>
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