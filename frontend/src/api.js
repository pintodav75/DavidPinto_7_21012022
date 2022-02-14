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