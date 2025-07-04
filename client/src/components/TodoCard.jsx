import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoCard({ todo, toggleDone, deleteTodo, startEdit }) {
  return (
    <>
      <div className="bg-zinc-900 text-[#ebecf2] p-4 rounded-md shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
                className="accent-[#060ae2] w-4 h-4 mt-1"
              />
              <div>
                <p
                  className={`font-semibold mb-2 ${
                    todo.done ? "line-through text-[#ebecf2]" : ""
                  }`}
                >
                  {todo.task || "(No Title)"}
                </p>
                {todo.description && (
                  <p className="text-sm text-[#ebecf2] mb-3">{todo.description}</p>
                )}
                {(todo.date || todo.time) && (
                  <p className="text-xs text-[#ebecf2]">
                    {todo.date && `Date: ${todo.date}`}{" "}
                    {todo.time && `| Time: ${todo.time}`}
                  </p>
                )}
              </div>
            </label>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => startEdit(todo)}
              className="text-[#ebecf2] hover:text-[#ebecf2]"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-[#ebecf2] hover:text-red-300"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoCard;
