import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function TodoCard({ todo, toggleDone, deleteTodo, startEdit }) {
  return (
    <div className="bg-white text-gray-700 shadow-sm p-3 rounded-md mb-2 flex justify-between items-start">
      <div>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
          className="mr-2"
        />
        <span
          className={`font-semibold ${
            todo.done ? " text-gray-700 line-through" : ""
          }`}
        >
          {todo.task || "(No Title)"}
        </span>
        {todo.description && (
          <p className="text-sm text-gray-500">{todo.description}</p>
        )}
        {todo.dueDate && (
          <p className="text-xs text-gray-400">Due: {todo.dueDate}</p>
        )}
        {todo.time && (
          <p className="text-xs text-gray-400">Time: {todo.time}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={() => startEdit(todo)} className="text-blue-500">
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
