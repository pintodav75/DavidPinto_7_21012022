import { useEffect, useState } from "react";
import { DeleteUserAPI, GetUserAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

function User() {
    const [user, setUser] = useState(null);
    let history = useNavigate();
    const token = localStorage.getItem('token');
    const myDecodedToken = decodeToken(token);
    const id = myDecodedToken.userId


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

   if (!user) {
       return null;
   }

   return (
       <div>
          <div> mon  email: {user.user.email}</div>
          <div>mon nom: {user.user.lastName}</div>
          <div>mon prenom: {user.user.firstName}</div>
          <div>comtpe cree: {user.user.createdAt}</div>
          <button  onClick={() => DeleteUser(token, id)}>Delete my account !</button>
       </div>
   )
}
export default User;