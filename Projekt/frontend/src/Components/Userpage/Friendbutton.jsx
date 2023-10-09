// import { React } from 'react'
// import '../Friendbutton/Friendbutton.css'

// const handleRequest = () => {

//     if (friendStatus === "unsent") {
//         fetch(`http://localhost:3000/${ownerName}/request`, {
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({owner: ownerName, suitor: visitorName}),
//             method: "POST"
//         })
//     }
// }

// const Friendbutton = (props) => {
//     return (<input className="unfriend-button" type="button" value={props.state} onClick={() => handleRequest()} />)
// }

// export default Friendbutton