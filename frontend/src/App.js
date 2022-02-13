import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreatePost from "./components/createPost";
import GetAllPost from "./components/getAllPost";

export default function App(props) {
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) setLogged(true)
  }, [])

  const loggout = () => {
    localStorage.clear();
    setLogged(false)
  }

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
            <CreatePost/>
            <GetAllPost/>
          </div>
        }   
    </div>
  );
}