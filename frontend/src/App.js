import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  let handleCreatePost = async (e) => {
    const [message, setMessage] = useState("");
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/api/post/new", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      await res.json();
      if (res.status === 201) {
        setMessage("post cree !");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <div className="createPost">

      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          
          placeholder="Titre"
        />
        <input
          type="text"
          
          placeholder="content"
        />
        <button type="submit">Create !</button>
        </form>
          </div>
    </div>
  );
}