const handleRequest = (ownerName, visitorName) => {

    if (friendStatus === "unsent") {
        fetch(`http://localhost:3000/${ownerName}/request`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({owner: ownerName, suitor: visitorName}),
            method: "POST"
        })
    }
}