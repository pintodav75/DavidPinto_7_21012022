import { useState } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./style.css";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }),
      });
      await res.json();
      if (res.status === 201) {
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setSucces(true);
        setMessage("User created successfully");
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
        {succes && <Navigate to="/" />}
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
        <TextField style={{ marginBottom: "5px" }}
          name="first name"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField style={{ marginBottom: "5px" }}
          name="last name"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />
        <Button  type="submit" variant="contained">CREATE ACCOUNT </Button>
      </form>
      
    </div>

    
  );
}

export default Signup;
