import DeletePost from "./deletePost"

export default function Post ({ id, title, content, userId }) {
    return (
        <div style={{border: "solid"}}>
            <div>postId: {id}</div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <div>By: {userId}</div>
            <button onClick={DeletePost(id, userId)}>Delete</button>
        </div>
    )
}