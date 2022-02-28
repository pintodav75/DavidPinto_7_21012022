import { useState } from 'react';
import { CreateCommentAPI } from '../api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';



function    CreateComment (props) {
    const token = localStorage.getItem('token');
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    let HandleCreateComment = async (e) => {
        try {
            const newComment = await CreateCommentAPI(token, props.postId, content);
            if (newComment.status === 201) {
                setContent("");
            }
        } catch (err) {
          setErrorMessage(err);
        }
    };
    return (
        <div className="CreateComment">
            <form onSubmit={HandleCreateComment}>
            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: 250, border: "solid 2px #1976d2" }}>
                    <Input placeholder="  comment here..." type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}  />
                    <Button type='submit' variant="text" endIcon={<ModeCommentIcon />}></Button>
                </div>
            </Box>
            </form>
            {errorMessage && <div>{errorMessage.toString()}</div>}
        </div>
    )
}
export default CreateComment;