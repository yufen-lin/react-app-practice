import React from "react";
import { ReactComponent as CheckedIcon } from "./images/icon_checked.svg";
import { ReactComponent as DeleteIcon } from "./images/icon_delete.svg";

const TodoItem = ({ className, key, todo, handleDelete, handleChecked }) => (
  <li className={className}>
    <label className="checkbox" htmlFor={key}>
      <input
        type="checkbox"
        id={key}
        checked={todo.isChecked}
        onChange={() => {
          handleChecked(todo);
        }}
      />
      <CheckedIcon className="checked-icon" />
      <span>{todo.content}</span>
    </label>
    <button
      type="button"
      className="delete"
      onClick={() => {
        handleDelete(todo.id);
      }}
    >
      <DeleteIcon />
    </button>
  </li>
);

export default TodoItem;
