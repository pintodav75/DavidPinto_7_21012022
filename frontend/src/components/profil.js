import { useEffect, useState } from "react";
import { DeleteUserAPI, GetUserAPI, UpdateUserAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";
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
      <AppBar position="static" style={{ borderRadius: 10 }}>
        <Toolbar style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
          <HomeIcon style={{ color: 'white' }} sx={{ fontSize: 30 }}  >
          </HomeIcon>
          </Link>
          <Typography variant="h4" component="div" style={{ marginLeft: "40%" }} sx={{ flexGrow: 1 }}>
            Groupomania
          </Typography>
              <Box sx={{ display: 'flex',  }} style={{ gap: 20, width: 200 }} >
              <Link to="/profil" style={{ fontFamily: 'roboto', textDecoration: "none", color: "white", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", height: 25, border: "solid 1px #A6DBFF"  }} >
                My profil 
                </Link>
              <Link to="/" onClick={loggout} style={{  backgroundColor: "red", fontFamily: 'roboto', textDecoration: "none", color: "white", fontSize: "18px", borderRadius: 5, width: 200, textAlign: "center", height: 25, border: "solid 1px #A6DBFF" }} >
                Logout</Link>
            </Box>
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

    <Grid item xs={3} padding="200px" >
      <Card sx={{ maxWidth: 345, width: "345px" }}>
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
        <Button size="small">delete</Button>
        <Button onClick={() => setIsEdit(true)} size="small">Edit </Button>
      </CardActions>
    </Card>
    </Grid>      
 </Grid>
      </div>
   )
}
export default User;

        // <Button size="small">Delete</Button>
        // <Button size="small">Edit</Button>

{/* <div style={{ backgroundColor: "lightGrey", width: "auto", height: "auto", display: "flex", justifyContent: "center" }}>
<Avatar sx={{ width: "15%", height: "15%" }} alt="img profil" src={`http://localhost:3001/images/${User.imageUrl || 'no-image.png'}`} />    
</div> */}

          // <div> mon  email: {user.user.email}</div>
          // <div>mon nom: {user.user.lastName}</div>
          // <div>mon prenom: {user.user.firstName}</div>
          // <div>compte cree: {user.user.createdAt}</div>
          // <div>is admin ? { JSON.stringify(user.user.isAdmin) }</div>
          // <img width="200" height="200" src={`http://localhost:3001/images/${user.user.imageUrl}`} />
          // <button onClick={() => DeleteUser(token, id)}>Delete my account !</button>
          // <button onClick={() => setIsEdit(true)}>Edit my account</button>