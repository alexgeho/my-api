const todoElement =
  document.getElementById("todos");

const fetchTodos = async () => {
  try {
    const response = await fetch(
      "http://localhost:5001/todos"
    );

    const data = await response.json();

    todoElement.innerHTML = data
      .map((todo) => `
        <div>
          <p>
            <span>${todo.date}</span>
            <span>${todo.content}</span>
          </p>
        </div>
      `)
      .join("");
  } catch (error) {
    todoElement.innerHTML =
      "Ops something went wrong. Please try again later";

    console.log(error);
  }
};

fetchTodos();

/* SEND REQ TO API */

const todoForm = document.getElementById("todo-form");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const submit = document.getElementById("submit");


todoForm.addEventListener('submit', submitBtn)

function submitBtn(event) {

event.preventDefault();



const searchVaule = search.value
const sortVaule = sort.value

const reqQuery = `?search=${searchVaule}&sort=${sortVaule}`; 

fetch(`http://localhost:5001/todos${reqQuery}`);

}