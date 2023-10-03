import React, { useState } from 'react'
import './Login.css'

const Login = () => {

    const [action, setAction] = useState("Login")

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input type="text" placeholder="Skriv ditt namn här ig"/>
                </div>
                <div className='input'>
                    <input type="password" placeholder="lösenord här tack :))" />
                </div>
            </div>
            {action==="Sign Up"?<div></div>:<div className="forgot-password" onClick={()=>{setAction("Sign Up")}}> Don't have an account? <span >Sign up here!</span></div>}
            {action==="Login"?<div></div>:<div className="forgot-password" onClick={()=>{setAction("Login")}}>Already have an account? <span >Log in here!</span></div>}
            <div className='submit-container'>
                {action==="Sign Up"}
                <div className="submit">{action}</div>
            </div>
        </div>
    )
}

export default Login