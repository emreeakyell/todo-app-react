import React from "react";

const Todo = (props) => {
  const {
    item,
    deleteTodo,
    setIsEdit,
    setWillUpdateTodo,
    setTodoText,
    changeIsDone,
  } = props;
  return (
    <div
      className={`alert alert-${
        props.item.isDone === true ? "success" : "info"
      } d-flex justify-content-between align-items-center`}
      role="alert"
    >
      <p>{item.text}</p>
      <div>
        <button
          onClick={() => deleteTodo(item.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
        <button
          className="btn btn-primary btn-sm mx-3 "
          onClick={() => {
            setIsEdit(true);
            setWillUpdateTodo(props.item.id);
            setTodoText(props.item.text);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => changeIsDone(props.item.id)}
          className="btn btn-sm btn-success"
        >
          {props.item.isDone === false ? "Done" : "Undone"}
        </button>
      </div>
    </div>
  );
};
export default Todo;
