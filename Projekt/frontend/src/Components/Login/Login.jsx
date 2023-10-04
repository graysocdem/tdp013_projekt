import React, { useState, useRef } from 'react'
import bcrypt from 'bcryptjs'
import './Login.css'

const Login = () => {

    const [action, setAction] = useState("Login")
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    const handleSignup = (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        const hashedPassword = bcrypt.hashSync(password, 10)

        let user = null
        fetch(`http://localhost:3000/user/${username}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(data => user = data)


            //POST http://localhost:3001/127.0.0.1:3000/user 404 (Not Found)
        console.log(user)
        if (user) {
            console.log("aja baja")
            if (username === user.username && hashedPassword === user.password) {
                console.log("USER ALREADY EXISTS")
                //TODO
            }
        }
        else {
            console.log("USER DOES NOT EXIST")
            
            fetch("http://localhost:3000/user", {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username: username, password: hashedPassword}),
                method: "POST"
            })
                .then(response => response.json())
                .then(response => console.log(response))
            //TODO
        }
    
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        const hashedPassword = bcrypt.hashSync(password, 10)

    }


    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input type="text" placeholder="Skriv ditt namn här ig" ref={usernameInputRef}/>
                </div>
                <div className='input'>
                    <input type="password" placeholder="lösenord här tack :))" ref={passwordInputRef}/>
                </div>
            </div>

                {action === "Sign Up" 
                ? 
                    <div className="forgot-password" onClick={()=>{setAction("Login")}}> Already have an account? <span> Log in here! </span> </div>
                : 
                    <div className="forgot-password" onClick={()=>{setAction("Sign Up")}}> Don't have an account? <span> Sign up here! </span> </div>
                } 

            <div className='submit-container'>
                {action==="Sign Up"
                ?
                    <div className="submit" onClick={(e)=>handleSignup(e)}>{action}</div>
                :   
                    <div className="submit" onClick={(e)=>handleLogin(e)}>{action}</div>
                }

            </div>
        </div>
    )
}

export default Login