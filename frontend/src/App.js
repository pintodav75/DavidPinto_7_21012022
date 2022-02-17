import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePost from "./components/createPost";
import GetAllPost from "./components/getAllPost";
import { GetAllPostAPI } from './api';

export default function App({ token }) {
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    if (token !== null) {
      setLogged(true)
    }
  }, [token])

  const loggout = () => {
    localStorage.clear();
    setLogged(false)
  }

  const [posts, setPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined);

  const fetchData = async () => {
    try {
        const allPosts = await GetAllPostAPI(token);
        setPosts(allPosts);
    } catch (err) {
        setErrorMessage(err);
    }
}
  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <div>
      <h1>Groupomania</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          textAlign: "right",
          marginRight: "2rem"
        }}
      >
        {
          !logged ? (
            <>
              <Link to="/Signup">Signup</Link>
              <Link to="/Login">Login</Link>
            </>
          ) : (
            <button onClick={loggout} >Loggout</button>
          )
        } 
        </nav>
        {logged === true &&
          <div>
            <CreatePost refresh={fetchData}   />
            <GetAllPost posts={posts} refresh={fetchData} />
          </div>
        }
        {errorMessage && <div>{errorMessage.toString()}</div>}
    </div>
  );
}