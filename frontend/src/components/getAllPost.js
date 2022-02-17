import Post from './post';

function GetAllPost({ posts, refresh  }) {
    return (
        <div>
            {posts.reverse().map((post, i) => <Post key={i}  {...post} refresh={refresh} />)}
        </div>
    )
}
export default GetAllPost;