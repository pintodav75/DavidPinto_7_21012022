import { useState } from 'react';
import { CreatePostAPI } from '../api';

    function CreatePost() {
        const token = localStorage.getItem('token');
        const [errorMessage, setErrorMessage] = useState("");
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        
    let HandleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const newPost = await CreatePostAPI(token, title, content);
          if (newPost.status === 201) {
            setTitle("");
            setContent("");
          } 
        } catch (err) {
          setErrorMessage(err);    
        }
      };
    return (
        <div className="CreatePost">
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
        <button type="submit">Create !</button>
        </form>
        {errorMessage && <div>{errorMessage.toString()}</div>}

        </div>
    )
}
  export default CreatePost;