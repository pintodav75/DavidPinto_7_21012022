import { useState } from 'react';
import { CreatePostAPI } from '../api';
import FileUploadPage from './file-upload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';



function CreatePost({ refresh }) {
      const token = localStorage.getItem('token');
      const [errorMessage, setErrorMessage] = useState("");
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      // const [file, setFile] = useState(null);
      
    let HandleCreatePost = async (e) => {
        e.preventDefault();
        try {
          const newPost = await CreatePostAPI(token, title, content);
          if (newPost.status === 201) {
            setTitle("");
            setContent("");
            refresh()
          } 
        } catch (err) {
          setErrorMessage(err);    
        }
      };
    return (
        <div className="CreatePost" style={{ border: "solid 2px red", padding: "25px" }} >
          {/* <FileUploadPage setFile={(file) => setFile(file)} /> */}
          <form onSubmit={HandleCreatePost}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
          noValidate
          autoComplete="off"
        >
      <TextField
        id="outlined-name"
        label="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> <br></br>
      <TextField
        id="outlined-name"
        label="your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /> <br></br>
    </Box>
    <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        submit
      </Button>
    </form>
        </div>
    )
}
  export default CreatePost;