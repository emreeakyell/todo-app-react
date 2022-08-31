import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text cant be empty");
      return;
    }
    console.log(todoText);
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
    </div>
  );
}

export default App;
