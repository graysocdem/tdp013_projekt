import React, { useState, useRef } from 'react'
import bcrypt from 'bcryptjs'
import './Login.css'

const Login = () => {

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
                    console.log('win')
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
                    <input type="text" placeholder="Skriv ditt namn här ig" ref={usernameInputRef} />
                </div>
                <div className='input'>
                    <input type="password" placeholder="lösenord här tack :))" ref={passwordInputRef} />
                </div>
            </div>

            {action === "Sign Up"
                ?
                <div className="forgot-password" onClick={() => { setAction("Login") }}> Already have an account? <span> Log in here! </span> </div>
                :
                <div className="forgot-password" onClick={() => { setAction("Sign Up") }}> Don't have an account? <span> Sign up here! </span> </div>
            }

            <div className='submit-container'>
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