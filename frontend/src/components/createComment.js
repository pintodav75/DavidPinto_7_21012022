import { useState } from 'react';
import { CreateCommentAPI } from '../api';

function CreateComment (props) {
    const token = localStorage.getItem('token');
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    let HandleCreateComment = async (e) => {
        e.preventDefault();
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
                <input
                    type="text"
                    value={content}
                    placeholder="votre commentaire!"
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">comment !</button>
            </form>
            {errorMessage && <div>{errorMessage.toString()}</div>}
        </div>
    )
}
export default CreateComment;