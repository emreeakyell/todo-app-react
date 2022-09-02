import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

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

    if (isEdit === true) {
      console.table(willUpdateTodo, "todo güncellenecek");
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };

      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };

      setTodos([...todos, newTodo]);
      setTodoText("");
      //console.log(newTodo);
      //console.log(todoText);
    }
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
          <button
            className={`btn btn-${isEdit === true ? "success" : "danger"}`}
            type="submit"
          >
            {isEdit === true ? "Edit" : "Add"}
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
                className={`alert alert-${
                  item.isDone === true ? "success" : "info"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                <p>{item.text}</p>
                <div>
                  <button
                    className="btn btn-success btn-sm mx-3 "
                    onClick={() => {
                      setIsEdit(true);
                      setWillUpdateTodo(item.id);
                      setTodoText(item.text);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => changeIsDone(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    {item.isDone === false ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
