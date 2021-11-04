import { ReactComponent as DeleteIcon } from "./images/icon_delete.svg";

const TodoItem = ({ className, key, todo, handleDelete, handleChecked }) => {
  return (
    <li className={className}>
      <label className="checkbox">
        <input
          type="checkbox"
          id={key}
          checked={todo.isChecked}
          onChange={() => {
            handleChecked(todo);
          }}
        />
        <span>{todo.content}</span>
      </label>
      <button
        className="delete"
        onClick={() => {
          handleDelete(todo.id);
        }}
      >
        <DeleteIcon />
      </button>
    </li>
  );
};

export default TodoItem;
