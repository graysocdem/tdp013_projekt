import { React, useState, useEffect, useRef } from 'react'
import "./Search.css"
import Navbar from "../Navigation/Navbar"
import User from "../User/User"
import fetchUsers from '../../Scripts/fethUsers'

const Search = () => {

    const [users, setUsers] = useState(null)
    const [displayUsers, setDisplayUsers] = useState(null)
    const [loading, setLoading] = useState(true)

    const queryInputRef = useRef()

    useEffect(() => {
        const middle = async () => {
            setUsers(await fetchUsers())
        }
        middle()
    }, []);

    useEffect(() => {
        if (users !== null) { setDisplayUsers(users) }
    }, [users])

    useEffect(() => {
        if (displayUsers !== null) { setLoading(false) }
    }, [displayUsers])

    const handleSearch = () => {
                
        setLoading(true)
                
        const query = queryInputRef.current.value

        if (query.length === 0) {
            setDisplayUsers(users)
        }

        const re = new RegExp(query);
        const results = users.filter((user) => {
            return re.test(user.username)
        })
            
        setDisplayUsers(results)
    }

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
                    <input type="text" placeholder="Vem letar du efter?" ref={queryInputRef}/>
                </div>
                <div className='search-button' onClick={() => handleSearch()}>Sök</div>
            </div>

            <hr />

            <div className='wrapper'>
                {displayUsers.map((user) => (
                    <User key={user.timestamp} name={user.username} friendAmount={user.friends.length}/>
                ))}
            </div>

        </div>
    )
}

export default Search