const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const postId = params.get("id");

console.log(postId);


fetch(`http://localhost:5001/posts/${postId}`)