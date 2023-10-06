import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./Userpage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"

const Userpage = () => {
    const navigate = useNavigate()

    const ownerName = useParams().username
    const visitorName = localStorage.getItem("user")

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ownerObject, setOwner] = useState(null)
    const [friendStatus, setFriendStatus] = useState(null)

    if (ownerName === visitorName) {
        navigate("/")
    }

    const messageInputRef = useRef()

    const publishPost = async (e) => {
        e.preventDefault()

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

    const fetchPosts = () => {

        fetch(`http://localhost:3000/page/${ownerName}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { setPosts(response[0].posts.reverse()) })
            .finally(console.log("fetched posts"))
    }

    const fetchOwner = () => {

        fetch(`http://localhost:3000/user/${ownerName}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { setOwner(response[0]) })
            .finally(console.log("fetched owner"))
    }

    const handleFriends = async () => {
        
        const response = await fetch(`http://localhost:3000/${ownerName}/request`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({owner: ownerName, suitor: visitorName}),
            method: "POST"
        })

        console.log(response)

    }

    useEffect(() => {
        setOwner(fetchOwner())
        setPosts(fetchPosts())
    }, []);

    useEffect(() => {
        if (posts != null && ownerObject != null) { setLoading(false) }
    }, [posts, ownerObject])

    useEffect(() => {
        const interval = setInterval(() => fetchPosts(), 1000);
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
        return (

            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{ownerName}'s Page</div>
                    <div className='underline'></div>
                    <input className="friend-button" type="button" value="Friend? :)" onClick={() => handleFriends()} />
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