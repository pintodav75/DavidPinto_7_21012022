import { useEffect, useState } from "react";
import { DeleteUserAPI, GetUserAPI, UpdateUserAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import FileUploadPage from "./file-upload";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import '@fontsource/roboto/400.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function User() {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");


    const [selectedFile, setSelectedFile] = useState(null);

    let history = useNavigate();
    const token = localStorage.getItem('token');
    const myDecodedToken = decodeToken(token);
    const id = myDecodedToken.userId

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

    async function GetUser(token, id) {
      try {
          let res = await GetUserAPI(token, id);
          if (res.status === 200) {
              const userInfo = await res.json();
              console.log(userInfo);
              if (!userInfo.user.imageUrl)
                userInfo.user.imageUrl = "no-image.png"
              setUser(userInfo);
          }
      } catch (err) {
           console.log(err);
      }
  }

   useEffect(() => {
       GetUser(token, id);
   }, [])

   async function DeleteUser(token, id) {
       try {
            await DeleteUserAPI(token, id);
            localStorage.clear();
            history("/")
       } catch (err){
           console.log(err);
       }
   }

   async function UpdateUser(e) {
       try {
         		const formData = new FormData();
		        formData.append('file', selectedFile);
		        formData.append('firstName', firstNameValue);
		        formData.append('lastName', lastNameValue);
           await UpdateUserAPI(token, id, formData)
       } catch (err) {
           console.log(err);
       }
   }

   if (isEdit) {
       return (
        <div className="UpdateUser" style={{ border: "solid 2px red", padding: "25px" }} >
        <form onSubmit={UpdateUser}>
      <Box
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
          noValidate
          autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="first name"
          value={firstNameValue}
          onChange={(e) => setFirstNameValue(e.target.value)}
        /> <br></br>
        <TextField
          id="outlined-name"
          label="last name"
          value={lastNameValue}
          onChange={(e) => setLastNameValue(e.target.value)}
        /> <br></br>
      </Box>
      <FileUploadPage setFile={(file) =>  { setSelectedFile(file) } } />
      <Button type='submit' variant="contained" endIcon={<SendIcon />}>
          Update !
        </Button>
      </form>
      </div>
          //  <form onSubmit={UpdateUser} >
          //      first name <input type="text" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} />
          //      last name <input type="text" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} />
          //      <button onClick={() => setIsEdit(false)}>Cancel</button> < br />
          //      <FileUploadPage setFile={(file) =>  { setSelectedFile(file) } } />
          //      <button type="submit">Edit</button>
          //  </form>
       )
   }

   if (!user) {
       return null;
   }

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
              <Button color="inherit" href="/login" color="success" >Login</Button>
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

    <Grid item xs={3} padding="100px" >
      <Card sx={{  }}>
      <CardMedia
        component="img"
        height="170"
        alt="img profil"
        image={`http://localhost:3001/images/${user.user.imageUrl}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {user.user.lastName} {user.user.firstName}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button onClick={() => DeleteUser(token, id)} size="small">delete</Button>
        <Button onClick={() => setIsEdit(true)} size="small">Edit </Button>
      </CardActions>
    </Card>
    </Grid>      
 </Grid>
 <div style={{ left: 0, bottom: 0, right: 0, position: "relative" }} >
            <footer style={{ backgroundColor: "#1976d2", alignItems: "center", justifyContent: "center", display: "flex", width: "100%", border: "solid 2px black", borderRadius: 5 }} >
      <div className="footer__disclaimer">
        <div className="lost-container">
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
      </div>
   )
}
export default User;

       