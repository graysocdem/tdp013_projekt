import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./Userpage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"

import fetchUser from "../../Scripts/fetchUser.js"
import fetchPosts from "../../Scripts/fetchPosts.js"


const Userpage = () => {

    const navigate = useNavigate()

    const ownerName = useParams().username
    const visitorName = localStorage.getItem("user")

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ownerObject, setOwner] = useState(null)
    const [friendStatus, setFriendStatus] = useState(null)

    if (ownerName === visitorName) {
        console.log("equal:", ownerName, visitorName)
        navigate("/homepage")
    }

    const messageInputRef = useRef()
    const friendButtonRef = useRef()

    const publishPost = async (e) => {
        e.preventDefault()

        if (!ownerObject.friends.includes(visitorName)) {
            alert("only friends can post !!!!!!!")
            return
        }

        const message = messageInputRef.current.value
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'GMT' })

        messageInputRef.current.value = ""

        if (message.length === 0 || message.length > 140) {
            alert("Invalid message length")
            return
        }

        await fetch(`http://localhost:3000/post`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ owner: ownerName, user: visitorName, message: message, timestamp: timestamp }),
            method: "POST"
        })
    }

    const fetchFriendStatus = () => {
        
        if (ownerObject.requests.includes(visitorName)) {
            console.log("friendButtonRef", friendButtonRef)
            return "pending"
        }
        else if (ownerObject.friends.includes(visitorName)) {
            {
                return "accepted"
            }
        }
        else {
            return "unsent"
        }
    }

    const handleRequest = () => {

        if (friendStatus === "unsent") {
            fetch(`http://localhost:3000/${ownerName}/request`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({owner: ownerName, suitor: visitorName}),
                method: "POST"
            })
            setFriendStatus("pending")
        }

        //skickas som sträng pga osäkert om setFriendStatus hinner klart tills den kommer hit
        setFriendButtonColor("pending")

    }

    const setFriendButtonColor = (status) => {
        if (status === "pending") {
            friendButtonRef.current.style.backgroundColor = "yellow"
            friendButtonRef.current.value = "Request pending"
        }
        else if (status === "accepted") {
            friendButtonRef.current.style.backgroundColor = "green"
            friendButtonRef.current.value = "Friend"
        }
        else {
            friendButtonRef.current.value = "Send friend request"
        }
    }

    useEffect(() => {
        const middle = async () => {
            setOwner(await fetchUser(ownerName))
            setPosts(await fetchPosts(ownerName))
        }
        middle()
    }, []);

    useEffect(() => {
        if (ownerObject !== null) {setFriendStatus(fetchFriendStatus())}
    }, [ownerObject])

    useEffect(() => {
        if (posts != null && ownerObject != null) { setLoading(false) }
        if (!loading) {
            setFriendButtonColor(friendStatus)
        }
    }, [posts, ownerObject])

    useEffect(() => {
        const interval = setInterval(async () => await fetchPosts(ownerName), 1000);
        return () => { clearInterval(interval) }
    }, []);
        
    if (loading) {
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{ownerName}'s Page</div>
                    <div className='underline'></div>
                </div>

                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef} />
                    <input className="button" type="button" onClick={(e) => { publishPost(e) }} value="Post" />

                    <hr />

                    <h1>Loading...</h1>

                </div>
            </div>
        )
    }
    else {

        if (ownerObject.friends.includes(visitorName)) {
            
        }
        console.log("posts", posts)
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{ownerName}'s Page</div>
                    <div className='underline'></div>

                            <input className="friend-button" type="button" onClick={ () => handleRequest() } ref={ friendButtonRef }></input>                    
                </div>

                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef} />
                    <input className="button" type="button" onClick={(e) => { publishPost(e) }} value="Post" />

                    <hr />

                    {posts.map((post) => (
                        <Post name={post.user} message={post.message} timestamp={post.timestamp} />
                    ))}

                </div>

            </div>
        )
    }


}

export default Userpage