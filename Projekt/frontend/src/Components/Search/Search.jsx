import { React, useState, useEffect, useRef } from 'react'
import "./Search.css"
import Navbar from "../Navigation/Navbar"
import User from "../User/User"

const Search = () => {

    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)

    const queryInputRef = useRef()

    const handleSearch = () => {
                
        setLoading(true)

        const query = queryInputRef.current.value
        if (query.length === 0) {
            setUsers(fetchUsers())
            return
        }

        const re = new RegExp(query);
        const results = users.filter((user) => {
            return re.test(user.username)
        })
            
        setUsers(results)
    }

    const fetchUsers = () => {
        fetch(`http://localhost:3000/users`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => { setUsers(response) })
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    useEffect(() => {
        if (users != null) { setLoading(false) }
    }, [users])

    if (loading) {
        return( 
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>Search</div>
                    <div className='underline'></div>
                </div>

                <h1>Loading...</h1>

            </div>
        )
    }
    return (
        <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>Search</div>
                <div className='underline'></div>
            </div>
            <div className='search-container'>
                <div className='input'>
                    <input type="text" placeholder="vem letar du efter? vi är ingen jävla upplysningstjänst 118800 my ass" ref={queryInputRef}/>
                </div>
                <div className='search-button' onClick={() => handleSearch()}>Sök</div>
            </div>

            <hr />

            <div className='wrapper'>
                {users.map((user) => (
                    <User key={user.timestamp} name={user.username} friendAmount={user.friends.length}/>
                ))}
            </div>

        </div>
    )
}

export default Search