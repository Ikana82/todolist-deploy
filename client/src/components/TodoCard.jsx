import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoCard({ todo, toggleDone, deleteTodo, startEdit }) {
  return (
    <li className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
        />
        <span className={`${todo.done ? "line-through text-gray-400" : ""}`}>
          {todo.task}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => startEdit(todo)}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-500 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
}

export default TodoCard;
