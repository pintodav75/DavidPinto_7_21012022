import { useEffect, useState } from "react";
import { DeleteCommentAPI, GetAllCommentAPI } from "../api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone';



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
            <div key={ `${e.id}-${e.postId}`} style={{ display: "flex", justifyContent: "space-between", borderStyle: "outset"  }} >
                <div>{e.id} {e.content}</div>
                <HighlightOffIcon fontSize="inherit" onClick={() =>  DeleteComment(e.id)} style={{ cursor: "pointer" }} />
            </div>
        ))}
    </div>
    )
};

export default Comment;