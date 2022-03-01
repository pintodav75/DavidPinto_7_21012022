import { useState } from 'react';
import { CreatePostAPI } from '../api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import FileUploadPage from "./file-upload";




function CreatePost({ refresh }) {
      const token = localStorage.getItem('token');
      const [message, setMessage] = useState("");
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
      
    let HandleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', title);
            formData.append('content', content);
            const newPost = await CreatePostAPI(token, formData);
          if (newPost.status === 201) {
            setTitle("");
            setContent("");
            refresh()
          } 
          else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <div className="CreatePost" style={{ border: "solid 2px #1976d2", borderStyle: "none none solid solid" ,borderRadius: "5px 5px 0 5px", padding: "25px" }} >
          <form onSubmit={HandleCreatePost}>
      <Box
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
      <div className="message">{message ? <p>{message}</p> : null}</div>

    </Box>
    <FileUploadPage setFile={(file) => { setSelectedFile(file) } } />
    <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Post !
      </Button>
    </form>
        </div>
    )
}
  export default CreatePost;