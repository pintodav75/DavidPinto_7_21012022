import { useEffect, useState } from "react";
import { DeleteCommentAPI, GetAllCommentAPI } from "../api";


const Comment = ({ token, postId}) => {
    const [comments, setComments] = useState([]);

    async function getComment() {
        try {
            const res =  await GetAllCommentAPI(token, postId);
            if (res.status === 200) {
                const tab = await res.json();
                setComments(tab);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        getComment();
    },[postId])

    async function DeleteComment(id) {
        try{
            await DeleteCommentAPI(token, id);
            const res =  await GetAllCommentAPI(token, postId);
            if (res.status === 200) {
                const tab = await res.json();
                setComments(tab);
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
    <div>
        {comments.map((e) => (
            <div key={ `${e.id}-${e.postId}`}>
                <div>{e.content}</div>
                <button onClick={() =>  DeleteComment(e.id)}>Delete</button>
            </div>
        ))}
    </div>
    )
};

export default Comment;