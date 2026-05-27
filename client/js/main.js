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

const search =
  document.getElementById("search");

  