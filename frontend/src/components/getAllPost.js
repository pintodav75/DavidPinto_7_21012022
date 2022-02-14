import { useEffect, useState } from 'react'
import Post from './post';
import { GetAllPostAPI } from '../api';

function GetAllPost() {
    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState(undefined);
    useEffect(async () => {
        try
        {
            const allPosts = await GetAllPostAPI(token);
            setPosts(allPosts);
        }
        catch (err) {
            setErrorMessage(err);
        }
    }, [])

    return (
        <div>
            {errorMessage && <div>{errorMessage.toString()}</div>}
            {posts.reverse().map((post, i) => <Post key={i} {...post} />)}
        </div>
    )
}
export default GetAllPost;