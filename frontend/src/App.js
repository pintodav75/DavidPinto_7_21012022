import { useEffect, useState } from "react";
import CreatePost from "./components/createPost";
import GetAllPost from "./components/getAllPost";
import { GetAllPostAPI } from './api';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./style/style.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


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
  },[])
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="http://localhost:3000/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groupomania
          </Typography>
          {
            !logged ? (
              <>
              <Button color="inherit" href="/Signup" >Sign Up</Button>
              <Button  href="/login" color="success" >Login</Button>
              </>
            ) : (
              <>
              <Button color="inherit" href="/profil" >Profil</Button>
              <Button  onClick={loggout} color="error" >Logout</Button>
              </>
            )
            }
        </Toolbar>
      </AppBar>
    </Box>
        {logged === true &&
          <div>
            <CreatePost refresh={fetchData}   />
            <GetAllPost posts={posts} refresh={fetchData} />
            <footer style={{ backgroundColor: "#1976d2", alignItems: "center", justifyContent: "center", display: "flex", width: "100%", border: "solid 2px black", borderRadius: 5 }} >
      <div class="footer__disclaimer">
        <div class="lost-container">
            <h1 style={{ color: "white", fontFamily: "Roboto" }} >GROUPOMANIA</h1>
            <p>© 2022 -  Reseau social d'entreprise</p>
              <span>Contact:</span>
              <span style={{ borderBottom: "solid 1px black" }} > groupomania@gmail.com</span>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
              <InstagramIcon></InstagramIcon>
              <TwitterIcon></TwitterIcon>
              <FacebookIcon></FacebookIcon>
              <LinkedInIcon></LinkedInIcon>
              </div>
        </div>
      </div>
    </footer>
          </div>
        }
        {errorMessage && <div>{errorMessage.toString()}</div>}
        
    </div>
  );
}