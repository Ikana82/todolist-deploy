import TodoCard from "./TodoCard";

function TodoList({ todos, toggleDone, deleteTodo, startEdit }) {
  if (todos.length === 0)
    return <p className="text-center text-gray-500">No tasks found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
