const publishPost = async (post) => {

    fetch(`http://localhost:3000/post`, {
        headers: {
             'Content-Type': 'application/json'
         },
        method: "POST",
        body: JSON.stringify({owner: post.owner, user: post.user, message: post.message, timestamp: post.timestamp}),
    })
}
 
export default publishPost
