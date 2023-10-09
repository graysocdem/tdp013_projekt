import { React, useRef, useState, useEffect } from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"
import { Navigate } from 'react-router-dom'

const Homepage = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)

    const messageInputRef = useRef()
    const publishPost = async (e) => {
        e.preventDefault()
        
        const user = localStorage.getItem("user")
        const owner = user
        const message = messageInputRef.current.value
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'GMT'})

        messageInputRef.current.value = ""

        if (message.length === 0 || message.length > 140) {
            alert("Invalid message length")
            return
        }
        
        await fetch(`http://localhost:3000/post`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({owner: owner, user: user, message: message, timestamp: timestamp}),
            method: "POST"
        })
    }

    const fetchPosts = () => {
        const owner = localStorage.getItem("user")
        
        fetch(`http://localhost:3000/page/${owner}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"})
            .then(response => response.json())
            .then(response => {setPosts(response[0].posts.reverse())})
            .finally(console.log("sent the request :))"))
    }

    useEffect(() => {
        setPosts(fetchPosts())
    }, []);

    useEffect(() => {
        if (posts != null) {setLoading(false)}
    }, [posts])

    useEffect(() => {
        const interval = setInterval(() => fetchPosts(), 1000);
        return () => {clearInterval(interval)} 
    }, []);

    const user = localStorage.getItem("user")

    if (loading) {
        return (
            <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>{user}'s Homepage</div>
                <div className='underline'></div>
            </div>

            <div className='wrapper'>
                <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef}/>
                <input className="button" type="button" onClick={(e) => {publishPost(e)}} value="Post" />

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
                    <div className='text'>{user}'s Homepage</div>
                    <div className='underline'></div>
                </div>
    
                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef}/>
                    <input className="button" type="button" onClick={(e) => {publishPost(e)}} value="Post" />
    
                    <hr />
    
                    { posts.map((post) => (
                     <Post name={post.user} message={post.message} timestamp={post.timestamp} />
                    ))} 
                    
                </div>

            </div>
        )
    }


}

export default Homepage