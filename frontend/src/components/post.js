export default function Post ({ id, title, content, userId }) {
    return (
        <div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <div>By: {userId}</div>
        </div>
    )
}