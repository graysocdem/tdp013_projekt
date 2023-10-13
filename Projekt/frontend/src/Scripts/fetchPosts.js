const fetchPosts = async (user) => {

    const response = await fetch(`http://localhost:3000/page/${user}`, {
         headers: {
             'Content-Type': 'application/json'
         },
         method: "GET"
     })
     console.log("response:", response)
     const result = await response.json()
     return result
 }
 
 export default fetchPosts