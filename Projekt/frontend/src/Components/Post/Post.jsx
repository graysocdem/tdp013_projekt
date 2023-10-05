import "./Post.css"

const Post = (props) => {

    const name = "namePlaceholder"
    const message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma"
    const time = "timePlaceholder"

    return (
        <div className="post-container">
            <div className="name">
                Name: { props.name }
            </div>
            <div className="message">
                { props.message }
            </div>
            <div className="time">
                { props.timestamp }
            </div>
        </div>
    )

}

export default Post