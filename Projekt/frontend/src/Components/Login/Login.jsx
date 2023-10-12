import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

import './Login.css'
import fetchUser from '../../Scripts/fetchUser'

const Login = () => {
    
    const navigate = useNavigate()

    const [action, setAction] = useState("Login")
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/homepage")
        }
    })


    const handleSignup = async (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        if (username.length === 0 || password.length === 0) {
            alert("Please fill out both forms.")
            usernameInputRef.current.value = ""
            passwordInputRef.current.value = ""
            return
        }
        if (username.indexOf(' ') >= 0) {
            alert("Invalid character in username. or something, prolly a blankspace #tswift")
            usernameInputRef.current.value = ""
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        let user = await fetchUser(username)

        console.log("user:", user)
        if (user.length === 0) {
            console.log("USER DOES NOT EXIST")
            
            const response = await fetch(`http://localhost:3000/user`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: username, password: hashedPassword }),
                method: "POST"
            })
                .then(response => response.json())
            
            alert("You have been signed up!")

        }

        else {
            alert("User already exists!")
            //TODO visa användaren user already exists 
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        if ( username === "" || password === "" ) {
            alert("Please fill out both forms.")
            return
        }

        // let user = null
        let user = await fetchUser(username)

        console.log("user", user)

        if (user.length === 0) {
            alert("User does not exist")
        }
        else {
            console.log("JAG HAMNAR HÄR")
            bcrypt.compare(password, user.password, (err, result) => {
                console.log("result of comparison:", err, result)
                if (err) {
                    console.log("oops")
                }
                if (result) {
                    localStorage.setItem("user", username)
                    navigate("/homepage")
                }
                else {
                    alert("Wrong username and/or password")
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