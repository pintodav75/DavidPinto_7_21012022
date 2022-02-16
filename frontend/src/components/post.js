import { DeletePostAPI } from "../api";
import { decodeToken } from "react-jwt";


export default function Post ({ id, title, content, userId, refresh }) {

    const token = localStorage.getItem('token');
    const myDecodedToken = decodeToken(token);

    async function DeletePost(postId) {
        try{
            await DeletePostAPI(token, postId);
            refresh()
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div style={{border: "solid"}}>
            <div>postId: {id}</div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <div>By: {userId}</div>
            <button disabled={myDecodedToken.userId !== userId} onClick={() => DeletePost(id)}>Delete</button>
        </div>
    )
}