import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import "../style/style.css";
import "../style/signup.css";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false);
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const resFinal = await res.json();
      if (res.status === 200) {
        setEmail("");
        setPassword(""); 
        setSucces(true);
        localStorage.setItem("token", resFinal.token);
        setMessage("User connected !");
        navigate("/");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginBox" style={{   width: "50%", display: "flex", p: 1,
    m: 1,
      textAlign: "center",
      justifyContent: "center",
      position: "relative",
      left: "50%",
      transform: "translate(-50%, 20%)",
      padding: "20px",
      backgroundColor: "white",
      boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.4)" }} >
        <Link to="/">
    <ArrowBackIcon  fontSize="large" style={{ color: "#1976d"}} ></ArrowBackIcon>
    </Link>
      <form  style={{ display: "flex", flexDirection: "column", width: 300, }} onSubmit={handleSubmit}>
        <TextField style={{ marginBottom: "5px" }}
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField style={{ marginBottom: "5px" }}
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button style={{ backgroundColor: "green" }} type="submit" variant="contained">LOGIN </Button>
        <div className="message">{message ? <p>{message}</p> : null}</div>

      </form>
      
    </div>


    // <div className="Login">
    //    {succes && <Navigate to="/" />}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={email}
    //       placeholder="Email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       placeholder="Password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>

    //     <div className="message">{message ? <p>{message}</p> : null}</div>
    //   </form>
    // </div>
  );
}

export default Login;
