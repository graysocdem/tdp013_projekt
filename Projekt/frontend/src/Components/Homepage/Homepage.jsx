import React from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"

const Homepage = () => {

    const user = localStorage.getItem("user")

    return (

        <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>{user}'s Homepage</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input type="input" placeholder="Skriv ditt namn här ig" />
                </div>
            </div>
        </div>
    )

}

export default Homepage