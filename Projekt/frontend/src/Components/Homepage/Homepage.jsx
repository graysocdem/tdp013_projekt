import React from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"

const Homepage = () => {

    const user = localStorage.getItem("user")

    return (

        <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>{user}'s Homepage</div>
                <div className='underline'></div>
            </div>

            <div className='wrapper'>
                <textarea />
                <input className="button" type="button" value="Post" />

                <hr />

                <Post />

            </div>

        {/* script */}


        </div>
    )

}

export default Homepage