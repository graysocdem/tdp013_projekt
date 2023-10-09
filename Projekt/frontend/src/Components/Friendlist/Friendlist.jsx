import { React, useState, useEffect } from 'react'
import "./Friendlist.css"
import Navbar from "../Navigation/Navbar"
import Friend from "../Friend/Friend"
import Request from "../Request/Request"

const Friendlist = () => {

    const ownerName = localStorage.getItem("user")
    const [owner, setOwner] = useState(null)

    const fetchOwner = () => {

        fetch(`http://localhost:3000/user/${ownerName}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { setOwner(response[0]) })
            .finally(response => console.log("fetched owner", response))
    }


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        setUser(fetchOwner())
    }, [])

    useEffect(() => {
        console.log("useEffect owner", owner)
        if (owner !== null) { setLoading(false) }
    }, [owner])

    if (!loading) {
        console.log("owner här här hej hej", owner)
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
                            <Request suitor={suitor} owner={ownerName} />
                        ))}                     
                    </div>
                </div>
            </div>

        )
    }
    else {
        return ("Loading...")
    }
}

export default Friendlist