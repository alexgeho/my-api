const todoElement = document.getElementById("todos");

const todoForm = document.getElementById("todo-form");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

/* RENDER TODOS TO DOM */

function renderTodos(data) {
  todoElement.innerHTML = data
    .map(
      (todo) => `
        <div>
          <p>
            <span>${todo.date}</span>
            <span>${todo.content}</span>
          </p>
        </div>
      `,
    )
    .join("");
}

/* Fetch todos from API */
async function fetchTodos(query = "") {
  try {
    const response = await fetch(`http://localhost:5001/todos${query}`);

    const data = await response.json();

    renderTodos(data);
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

  fetchTodos(reqQuery);
}

/* Event listener */

todoForm.addEventListener("submit", submitBtn);

/* Initial fetch */

fetchTodos();
