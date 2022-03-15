import { useEffect, useState } from "react";
import { DeleteCommentAPI, GetAllCommentAPI } from "../api";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';



const Comment = ({ token, postId, User }) => {
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
            <div key={ `${e.id}-${e.postId}`} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#8BD8D6", borderRadius: 5, border: "solid 1px #1976d2" }} >
                <div style={{ fontSize: "15px", fontFamily: "sans-serif" }} > {e.content}</div>
                <DeleteSweepOutlinedIcon fontSize="medium" onClick={() =>  DeleteComment(e.id)} style={{ cursor: "pointer" }} />
            </div>
        ))}
    </div>
    )
};

export default Comment;