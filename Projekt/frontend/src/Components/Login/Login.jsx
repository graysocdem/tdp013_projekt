import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

import './Login.css'

const Login = () => {
    const navigate = useNavigate()

    const [action, setAction] = useState("Login")
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    const handleSignup = async (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        // const salt = "DaveIsTheGOAT"
        const hashedPassword = bcrypt.hashSync(password, 10)

        let user = []
        await fetch(`http://localhost:3000/user/${username}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { user = response })


        console.log("user:", user)
        if (user.length === 0) {
            console.log("USER DOES NOT EXIST")

            await fetch(`http://localhost:3000/user`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username: username, password: hashedPassword}),
                method: "POST"
            })
                .then(response => response.json())
                .then(response => console.log(response))

                alert("You have been signed up!")

            }


        else {
            console.log("User already exists")
            //TODO visa användaren user already exists 
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        if (username === "" || password === "") {
            alert("Please fill out both forms.")
        }

        let user = []
        await fetch(`http://localhost:3000/user/${username}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { user = response })

        if (user.length === 0) {
            //TODO visa user does not exist
        }
        else {
            console.log("user:", password, user[0].password)
            bcrypt.compare(password, user[0].password, (err, result) => {
                console.log("result of comparison:", err, result)
                if (err) {
                    console.log("oops")
                }
                if (result) {
                    localStorage.setItem("user", username)
                    navigate("/")
                }
                else {
                    console.log("fail")
                }
            })
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            
            <div className='inputs'>
                <div className='input'>
                    <input type="text" placeholder="skriv ditt namn här eller nåt. upp till dig" ref={usernameInputRef} />
                </div>
                <div className='input'>
                    <input type="password" placeholder="lösenord här. om du känner för det" ref={passwordInputRef} />
                </div>

                {action === "Sign Up"
                    ?
                    <div className="forgot-password"> Already have an account? <span onClick={() => { setAction("Login") }}> Log in here! </span> </div>
                    :
                    <div className="forgot-password"> Don't have an account? <span onClick={() => { setAction("Sign Up") }}> Sign up here! </span> </div>
                }

                {action === "Sign Up"
                    ?
                    <div className="submit" onClick={(e) => handleSignup(e)}>{action}</div>
                    :
                    <div className="submit" onClick={(e) => handleLogin(e)}>{action}</div>
                }
            </div>
        </div>
    )
}

export default Login