//Returns first in array of search results from owner
const fetchUser = async (user) => {

    return await fetch(`http://localhost:3000/user/${user}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
        .then(res => res.json())
}

export default fetchUser