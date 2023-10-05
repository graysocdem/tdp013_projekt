import { React, useRef} from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"

const Homepage = () => {

    

    const messageInputRef = useRef()

    const publishPost = async (e) => {
        e.preventDefault()

        
        const user = localStorage.getItem("user")
        const owner = user
        const message = messageInputRef.current.value
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'GMT'})
        
        if (message.length === 0 || message.length > 140) {
            alert("Invalid message length")
            messageInputRef.current.value = ""
        }
        
        await fetch(`http://localhost:3000/post`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({owner: owner, user: user, message: message, timestamp: timestamp}),
            method: "POST"
        })

    }

    const getPosts = async () => {
        
        const owner = localStorage.getItem(user)

        const page = fetch(`http://localhost:3000/page/${owner}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
        
        console.log(page)

        return await fetch(`http://localhost:3000/page/${owner}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
    }

    const user = localStorage.getItem("user")

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

                {getPosts()}

            </div>

        {/* script */}


        </div>
    )

}

export default Homepage