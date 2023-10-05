import "./Post.css"

const Post = () => {

    const name = "namePlaceholder"
    const message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma"
    const time = "timePlaceholder"

    return (
        <div className="post-container">
            <div className="name">
                Name: {name}
            </div>
            <div className="message">
                {message}
            </div>
            <div className="time">
                {time}
            </div>
        </div>
    )

}

export default Post