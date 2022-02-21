import { useEffect, useState } from "react";
import { GetUserAPI } from "../api";

function User({ token, id }) {
    const [user, setUser] = useState(null);
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

   if (!user) {
       return null;
   }

   return (
       <div>
          <div> mon  email: {user.user.email}</div>
          <div>mon nom: {user.user.lastName}</div>
          <div>mon prenom: {user.user.firstName}</div>
          <div>comtpe cree: {user.user.createdAt}</div>
       </div>
   )
}
export default User;