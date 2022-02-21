import { useState } from 'react';
import { CreatePostAPI } from '../api';
import FileUploadPage from './file-upload';

function CreatePost({ refresh }) {
      const token = localStorage.getItem('token');
      const [errorMessage, setErrorMessage] = useState("");
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [file, setFile] = useState(null);
      
    let HandleCreatePost = async (e) => {
        e.preventDefault();
        try {
          const newPost = await CreatePostAPI(token, title, content, file);
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
        <div className="CreatePost">
          <FileUploadPage setFile={(file) => setFile(file)} />
      <form onSubmit={HandleCreatePost}>
        <input
          type="text"
          value={title}
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create post !</button>
        </form>
        {errorMessage && <div>{errorMessage.toString()}</div>}

        </div>
    )
}
  export default CreatePost;