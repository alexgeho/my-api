const todoElement = document.getElementById("todos");

const todoForm = document.getElementById("todo-form");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

/* RENDER TODOS TO DOM */

function renderEntities(data) {
  todoElement.innerHTML = data
    .map(
      (bitaw) => `
        <div>
          <p class="post-card">
            <span>${bitaw.date}</span>
             <span>${bitaw.title}</span>
            <span>${bitaw.author}</span>
           <span>
  ${
    bitaw.content.length > 100
      ? `${bitaw.content.slice(0, 100)}...`
      : bitaw.content
  }
</span>

${bitaw.content.length > 100 ? `<a href="#">Read more...</a>` : ""}
           
          </p>
        </div>
      `,
    )
    .join("");
}

/* Fetch todos from API */
async function fetchEntities(query = "") {
  try {
    const response = await fetch(`http://localhost:5001/posts${query}`);

    const data = await response.json();

    renderEntities(data);
  } catch (error) {
    todoElement.innerHTML = "Ops something went wrong. Please try again later";

    console.log(error);
  }
}

/* Handle form submit */

function submitBtn(event) {
  event.preventDefault();

  const searchValue = search.value;
  const sortValue = sort.value;

  const reqQuery = `?search=${searchValue}&sort=${sortValue}`;

  fetchEntities(reqQuery);
}

/* Event listener */

todoForm.addEventListener("submit", submitBtn);

/* Initial fetch */

fetchEntities();
