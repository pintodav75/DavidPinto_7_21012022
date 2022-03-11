
// Recuperation de tout les posts
export const GetAllPostAPI = async () => {
    const token = localStorage.getItem("token");
    let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/post`, {
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
export const CreatePostAPI = async (token, body) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/post/new`, {
          method: "POST",
          headers: {
              'Authorization': `Bearer ${token}`
            },
          body: body,
        });
        return response;
}

// Suppression d'un post
export const DeletePostAPI = async(token, postId) => {
  console.log(postId);
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/post/${postId}`, {
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
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/post/${postId}`, {
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
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/comment/${postId}/new`, {
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
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/comment/${postId}`, {
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
      return response;
}

// supresion d'un commentaire
export const DeleteCommentAPI = async(token, commentId) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

//Recuperation des informaitons d'un user
export const GetUserAPI = async (token, id) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/user/${id}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

// Suppression d'un utilisateur
export const DeleteUserAPI = async(token, id) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/user/${id}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

// Modification d'un user
export const UpdateUserAPI = async(token, id, body) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/user/${id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: body,
  });
  return response;
}