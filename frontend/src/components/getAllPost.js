import { useState } from 'react'
function GetAllPost() {
        const token = localStorage.getItem('token');
        const [message, setMessage] = useState("");
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
    let HandleAllPost = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3001/api/post/",{
                method: "GET",
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
            if (res.status === 200) {
                setTitle("");
                setContent("");
                setMessage("tout les posts ont ete recupere !");
            } else {
                setMessage("some error occured");
            }
        } catch (err) {
            console.log(err);
        } 
    };
    return (
        <div className="GetAllPost">

        </div>
    )
}
export default GetAllPost;