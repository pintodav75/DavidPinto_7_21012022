import { useEffect, useState } from "react";
import { DeleteUserAPI, GetUserAPI, UpdateUserAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";


function User() {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
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

   useEffect(() => {
       async function GetUser(token, id) {
           try {
               let res = await GetUserAPI(token, id);
               if (res.status === 200) {
                   const userInfo = await res.json();
                   setUser(userInfo);
               }
           } catch (err) {
                console.log(err);
           }
       }
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

   async function UpdateUser() {
       try {
           await UpdateUserAPI(token, id, { firstName: firstNameValue, lastName: lastNameValue })
       } catch (err) {
           console.log(err);
       }
   }

   if (isEdit) {
       return (
           <form onSubmit={UpdateUser} >
               first name <input type="text" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} />
               last name <input type="text" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} />
               <button onClick={() => setIsEdit(false)}>Cancel</button>
               <button type="submit">Edit</button>
           </form>
       )
   }

   if (!user) {
       return null;
   }

   return (
       <div>
            <Link to="/">
                <h1>Groupomania</h1>
            </Link>
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
            <>
              <Link to="/profil">view my profil</Link>
              <button onClick={loggout} >Loggout</button>
            </>
          )
        } 
        </nav>
          <div> mon  email: {user.user.email}</div>
          <div>mon nom: {user.user.lastName}</div>
          <div>mon prenom: {user.user.firstName}</div>
          <div>compte cree: {user.user.createdAt}</div>
          <div>is admin ? { JSON.stringify(user.user.isAdmin) }</div>
          <button onClick={() => DeleteUser(token, id)}>Delete my account !</button>
          <button onClick={() => setIsEdit(true)}>Edit my account</button>
       </div>
   )
}
export default User;