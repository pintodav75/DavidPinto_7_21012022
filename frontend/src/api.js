// Recuperation de tout les posts
export const GetAllPostAPI = async (token) => {
    let response = await fetch("http://localhost:3001/api/post", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
    let content = await response.json();

    return content;
}

// Creation d'un nouveau post
export const CreatePostAPI = async (token, title, content) => {
    let response = await fetch("http://localhost:3001/api/post/new", {
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
          return response;
}

// Suppression d'un post
export const DeletePostAPI = async(token, postId) => {
  let response = await fetch(`http://localhost:3001/api/post/${postId}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

// modification d'un post
export const UpdatePostAPI = async(token, postId, body) => {
  let response = await fetch(`http://localhost:3001/api/post/${postId}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
  return response;
}

// creation d'un commentaire
export const CreateCommentAPI = async(token, postId, content) => {
  let response = await fetch(`http://localhost:3001/api/comment/${postId}/new`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  return response;
}

// Recuperation des commentaires
export const GetAllCommentAPI = async (token, postId) => {
  let response = await fetch(`http://localhost:3001/api/comment/${postId}`, {
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
      let content = await response.json();
      return content;
}

// supresion d'un commentaire
export const DeleteCommentAPI = async(token, commentId) => {
  let response = await fetch(`http://localhost:3001/api/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}