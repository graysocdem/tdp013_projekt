import { React } from 'react'
import './Request.css'

const Request = (props) => {
    const handleAccept = () => {
        fetch(`http://localhost:3000/accept`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ owner: props.owner, suitor: props.suitor }),
            method: "PATCH"
        })
    }

    return (
        <div className="request-container">
            <div className='name'>{props.suitor}</div>
            <div className='accept-button' type="button" value="knapp">
                <input type="button" value="Accept request" onClick={() => {handleAccept()}}></input>
            </div>
        </div>
    )
}
export default Request