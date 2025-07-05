// src/components/TodoList.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoList({ todos, toggleDone, startEdit, deleteTodo }) {
  return (
    <ul className="space-y-2 mb-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-2 rounded flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
            todo.done ? "bg-blue-100" : "bg-sky-50"
          }`}
        >
          <span
            className={`break-words w-full md:w-auto text-[#4196bc] ${
              todo.done ? "line-through opacity-60" : ""
            }`}
          >
            {todo.task}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => toggleDone(todo.id)}
              className="text-green-600 hover:text-green-800"
              title="Mark as Done"
            >
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
            <button
              onClick={() => startEdit(todo)}
              className="text-yellow-600 hover:text-yellow-800"
              title="Edit"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
