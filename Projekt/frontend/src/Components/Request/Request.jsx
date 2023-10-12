import { React } from 'react'
import './Request.css'

const Request = (props) => {
    
    const handleAccept = () => {
        props.update()
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