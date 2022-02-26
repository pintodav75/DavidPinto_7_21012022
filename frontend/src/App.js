import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePost from "./components/createPost";
import GetAllPost from "./components/getAllPost";
import { GetAllPostAPI } from './api';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { height } from "@mui/system";
import { SvgIcon } from "@mui/material";


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

  const [posts, setPosts] = useState([]);
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
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ borderRadius: 10 }}>
        <Toolbar>
          <SvgIcon valu >
            <Link to="/" >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </Link>
          </SvgIcon>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Groupomania
          </Typography>
          {
            !logged ? (
            <Box sx={{ display: 'flex',  }} style={{ gap: 20, width: 200 }} >
            <Link to="/Signup"  style={{ fontFamily: 'roboto', textDecoration: "none", backgroundColor: "white", color: "#1976d2", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", alignItems: "center", height: 25, border: "solid 1px #A6DBFF",  }} >
                Sign up 
            </Link>
            <Link to="/Login" style={{  fontFamily: 'roboto', textDecoration: "none", color: "white", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", height: 25, border: "solid 1px #A6DBFF"  }} >
                Login 
            </Link>
            </Box>
            ) : (
              <Box sx={{ display: 'flex',  }} style={{ gap: 20, width: 200 }} >
              <Link to="/profil" style={{ fontFamily: 'roboto', textDecoration: "none", color: "white", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", height: 25, border: "solid 1px #A6DBFF"  }} >
                My profil 
                </Link>
              <Link to="/" onClick={loggout} style={{ fontFamily: 'roboto', textDecoration: "none", color: "white", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", height: 25, border: "solid 1px #A6DBFF" }} >
                Logout</Link>
            </Box>
            )
          }
        </Toolbar>
      </AppBar>
    </Box> 
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