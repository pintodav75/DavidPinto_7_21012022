import { useState } from 'react';

    function CreatePost() {
        const token = localStorage.getItem('token');
        const [message, setMessage] = useState("");
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        
    let HandleCreatePost = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:3001/api/post/new", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
              title: title,
              content: content,
            }),
          });
          await res.json();
          if (res.status === 201) {
            setTitle("");
            setContent("");
            setMessage("post cree !");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
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
        <div>{message}</div>
        </div>
    )
}
  export default CreatePost;