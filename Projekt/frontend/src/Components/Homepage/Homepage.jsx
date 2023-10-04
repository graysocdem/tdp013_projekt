import React from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"

const Homepage = () => {

    return (

        <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>Homepage</div>
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

export default Homepage