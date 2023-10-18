const fetchPosts = async (user, token) => {
    console.log("hej!!")
    const response = await fetch(`http://localhost:3000/page/${user}`, {
         headers: {
             'Content-Type': 'application/json',
             'x-access-token': token
         },
         method: "GET"
     })
     console.log("response:", response)
     const result = await response.json()
     return result
 }
 
 export default fetchPosts