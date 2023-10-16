const fetchUsers = async () => {

    const response = await fetch(`http://localhost:3000/users`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    const result = await response.json()
    return result
}

export default fetchUsers