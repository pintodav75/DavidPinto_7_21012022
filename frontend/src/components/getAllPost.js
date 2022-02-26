import Post from './post';

function GetAllPost({ posts, refresh  }) {
    return (
        <div style={{  }}>
            {posts.reverse().map((post) => <Post key={post.id}  {...post} refresh={refresh} />)}
        </div>
    )
}
export default GetAllPost;