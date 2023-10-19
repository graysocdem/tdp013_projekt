import { React } from 'react'
import './Request.css'

const Request = (props) => {
    const handleAccept = () => {
        fetch(`http://localhost:3000/accept`, {
            headers: {
                "content-type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ owner: props.ownerName, suitor: props.suitor }),
            method: "PATCH"
        })
        console.log("PROPS". props)
        // props.setOwner(null)
        // props.setLoading(true)
    }

    return (
        <div className="request-container">
            <div className='name'>{props.suitor}</div>
            <div className='accept-button' type="button">
                <input type="button" value="Accept request" onClick={() => {handleAccept()}}></input>
            </div>
        </div>
    )
}
export default Request