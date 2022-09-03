import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  const deleteTodo = (id) => {
    //console.log(id);
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const changeIsDone = (id) => {
    // console.log(id);
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem(
      "todos",
      JSON.stringify([updatedTodo, ...filteredTodos])
    );
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
      localStorage.setItem(
        "todos",
        JSON.stringify([...filteredTodos, updatedTodo])
      );
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
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTodoText("");
      //console.log(newTodo);
      //console.log(todoText);
    }
  };

  return (
    <div className="container ">
      <h1 className="text-center my-5">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />

      <div>
        {todos.length <= 0 ? (
          <p className="text-center my-5 mx-5 fs-1 bg-warning  px-5 rounded-pill">
            !!List Is Empty!!
          </p>
        ) : (
          <>
            {todos.map((item) => (
              <Todo
                item={item}
                deleteTodo={deleteTodo}
                setIsEdit={setIsEdit}
                setWillUpdateTodo={setWillUpdateTodo}
                setTodoText={setTodoText}
                changeIsDone={changeIsDone}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
