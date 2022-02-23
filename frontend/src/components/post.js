import { DeletePostAPI, UpdatePostAPI } from "../api";
import { decodeToken } from "react-jwt";
import { useState } from "react";
import CreateComment from "./createComment";
import Comment from "./comment";
import FileUploadPage from "./file-upload";



export default function Post ({ id, title, content, userId, refresh }) {
    const [titleValue, setTitleValue] = useState(title);
    const [contentValue, setContentValue] = useState(content);
    const [isEdit, setIsEdit] = useState(false);

    const token = localStorage.getItem('token');
    const myDecodedToken = decodeToken(token);
    const isAdmin = myDecodedToken.isAdmin

    const shouldDisabled = (isAdmin, userId, userIdPost) => {
        console.log({ isAdmin, userId, userIdPost  })
        if (isAdmin) return (false);
        
        return userId !== userIdPost;
    }

    async function DeletePost(postId) {
        try{
            await DeletePostAPI(token, postId);
            refresh()
        }catch(err){
            console.log(err);
        }
    }

    const OnEdit = async () => {
        try {
            await UpdatePostAPI(token, id, { title: titleValue, content: contentValue });
        } catch (err) {
            console.log(err);
        }
    }

    if (isEdit) {
        return (
            <form onSubmit={OnEdit}>
                Title <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                Content <input type="text" value={contentValue}  onChange={(e) => setContentValue(e.target.value)} />
                <button onClick={() => setIsEdit(false)}>Cancel</button>
                <button type="submit">Edit</button>
            </form>
        )
    }

    return (
        <div style={{border: "solid"}}>
            <div>postId: {id}</div>
            <div>Title: {titleValue}</div>
            <div>Content: {contentValue}</div>
            <div>By: {userId}</div>
            <Comment token={token} postId={id} />
            <CreateComment postId={id}/>
            <button disabled={shouldDisabled(myDecodedToken.isAdmin, myDecodedToken.userId, userId)} onClick={() => DeletePost(id)}>Delete POST</button>
            <button disabled={shouldDisabled(myDecodedToken.isAdmin, myDecodedToken.userId, userId)} onClick={() => setIsEdit(true)}>Edit</button>
        </div>
    )
}