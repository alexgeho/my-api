const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const postId = params.get("id");

console.log(postId);

async function fetchPost() {
  const response = await fetch(`http://localhost:5001/posts/${postId}`

  );


const post = await response.json();

document.getElementById('post').innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.author}</p>
    <p>${post.date}</p>
    <p>${post.content}</p>
`
console.log(post.title);
console.log(post.content);

}

fetchPost()


