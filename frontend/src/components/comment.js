import { buildTimeValue } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { DeleteCommentAPI, GetAllCommentAPI } from "../api";


const Comment = ({ token, postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getComment() {
            try {
                const res =  await GetAllCommentAPI(token, postId);
                setComments(res);
            } catch(err) {
                console.log(err);
            }
        }
        getComment();
    },[postId])

    async function DeleteComment(id) {
        try{
            await DeleteCommentAPI(token, id);
        }catch(err){
            console.log(err);
        }
    }

    return (
    <div>
        {comments.reverse().map((e, i) => (
            <>
                <div>{e.content}</div>
                <button onClick={() => DeleteComment(e.id)}>Delete</button>
            </>
        ))}
    </div>
    )
};

export default Comment;