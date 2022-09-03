import React from "react";

const TodoForm = (props) => {
  const { handleSubmit, todoText, setTodoText, isEdit } = props;
  return (
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
  );
};
export default TodoForm;
