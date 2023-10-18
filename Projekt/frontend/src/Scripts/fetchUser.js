const fetchUser = async (user, token) => {

   const response = await fetch(`http://localhost:3000/user/${user}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        method: "GET"
    })
    const result = await response.json()
    return result
}

export default fetchUser