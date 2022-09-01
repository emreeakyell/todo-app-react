import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const changeIsDone = (id) => {
    // console.log(id);
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text cant be empty");
      return;
    }

    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos != undefined) {
      alert("You have this todo already");
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      isDone: false,
      text: todoText,
      date: new Date(),
    };
    setTodos([newTodo, ...todos]);
    setTodoText("");
    //console.log(newTodo);
    //console.log(todoText);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Type Your Todo"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-danger" type="submit">
            Add
          </button>
        </div>
      </form>
      <div>
        {todos.length <= 0 ? (
          <p className="text-center my-5 mx-5 fs-1 badge bg-warning text-wrap px-5">
            !!List Is Empty!!
          </p>
        ) : (
          <>
            {todos.map((item) => (
              <div
                className="alert alert-secondary d-flex justify-content-between align-items-center"
                role="alert"
              >
                <p>{item.text}</p>
                <button
                  onClick={() => changeIsDone(item.id)}
                  className="btn btn-sm btn-danger"
                >
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
