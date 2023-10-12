const fetchUser = async (user) => {

   const response = await fetch(`http://localhost:3000/user/${user}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    const result = await response.json()
    return result
}

export default fetchUser