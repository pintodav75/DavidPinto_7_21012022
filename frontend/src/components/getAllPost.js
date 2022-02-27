import Post from './post';

function GetAllPost({ posts, refresh  }) {
    return (
        <div style={{ border: "solid 0px 2px 2px 2px blue", }}>
            {posts.reverse().map((post) => <Post key={post.id}  {...post} refresh={refresh} />)}
        </div>
    )
}
export default GetAllPost;