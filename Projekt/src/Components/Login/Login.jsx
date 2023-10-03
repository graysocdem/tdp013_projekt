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
            {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost password? <span>Oops!</span></div>}

            <div className='submit-container'>
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default Login