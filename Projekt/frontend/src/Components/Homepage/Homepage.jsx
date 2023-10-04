import React from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"

const Homepage = () => {

    const user = localStorage.getItem("user")

    if (user === null) {
        return (
            <div>
                <h1> NOT ALLOWED!!! </h1>
            </div>
        )
    }
    else {

        return (

            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{user}'s homepage</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input type="text" placeholder="Skriv ditt namn här ig" />
                    </div>
                    <div className='input'>
                        <input type="password" placeholder="lösenord här tack :))" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage