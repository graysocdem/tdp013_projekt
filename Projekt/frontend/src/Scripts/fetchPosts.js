const fetchPosts = async (user, token, navigate) => {

    const response = await fetch(`http://localhost:3000/page/${user}`, {
         headers: {
             'Content-Type': 'application/json',
             'x-access-token': token
         },
         method: "GET"
     })
     if (response.status === 401) {
        console.log("invalid token")
        return null
    }
    console.log(response)
     const result = await response.json()
     console.log(result)
     return result
 }
 
 export default fetchPosts