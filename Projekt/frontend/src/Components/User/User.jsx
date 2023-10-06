import { React } from 'react'
import "./User.css"

const User = (props) => {

    return (
        <div className="user-container">
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