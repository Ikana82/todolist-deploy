import React from "react";
import TodoCard from "./TodoCard";

function TodoApp({
  todos,
  task,
  setTask,
  handleSubmit,
  toggleDone,
  deleteTodo,
  removeChecked,
  editId,
  startEdit,
}) {
  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-md shadow-lg p-6 w-[400px]">
        <h1 className="text-gray-600 text-2xl font-bold text-center mb-4">
          TODOLIST
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="what needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
            required
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-3 rounded hover:bg-blue-500"
          >
            {editId ? "Update" : "+"}
          </button>
        </form>

        <ul className="space-y-2 mb-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
              startEdit={startEdit}
            />
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="bg-green-400 text-white px-2 py-1 rounded">
              {completedCount} of {todos.length} tasks done
            </span>
          </div>
          <button
            onClick={removeChecked}
            className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
          >
            Remove checked
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
