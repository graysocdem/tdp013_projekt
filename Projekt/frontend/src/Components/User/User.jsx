import { React } from 'react'
import { useNavigate } from 'react-router-dom'

import "./User.css"

const User = (props) => {
    const navigate = useNavigate()

    console.log(encodeURIComponent(props.name))
    return (
        <div className="user-container" onClick={() => navigate(`/${props.name}`)} >
            <div className="name">
                Name: {props.name}
            </div>
            <div className='friend-amount'>
                Friends: {props.friendAmount}
            </div>
        </div>
    )
}

export default User