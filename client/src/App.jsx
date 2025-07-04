import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const base_url = "http://localhost:3000/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter((t) => t.done).length;

  async function fetchTodos() {
    try {
      const res = await fetch(base_url);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  function resetForm() {
    setTask("");
    setDescription("");
    setDueDate("");
    setTime("");
    setEditId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const todoData = {
      task,
      description,
      dueDate,
      time,
      done: false,
    };

    try {
      if (editId) {
        await fetch(`${base_url}/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        });
      } else {
        todoData.id = String(Date.now());
        await fetch(base_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        });
      }

      await fetchTodos();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving todo:", err);
    }
  }

  async function toggleDone(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await fetch(`${base_url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !todo.done }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Error toggling done:", err);
    }
  }

  async function deleteTodo(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${base_url}/${id}`, {
          method: "DELETE",
        });
        await fetchTodos();

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error deleting todo:", err);
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    }
  }

  function startEdit(todo) {
    setTask(todo.task);
    setDescription(todo.description || "");
    setDueDate(todo.dueDate || "");
    setTime(todo.time || "");
    setEditId(todo.id);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Todo List</h1>
          <button
            onClick={() => {
              setShowModal(true);
              resetForm();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add New Task
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          <FontAwesomeIcon
            icon={faSquareCheck}
            className="text-green-600 mr-2"
          />
          {completedCount} of {todos.length} task(s) completed
        </p>

        <TodoList
          todos={todos}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />
      </div>

      {showModal && (
        <AddTask
          task={task}
          setTask={setTask}
          description={description}
          setDescription={setDescription}
          dueDate={dueDate}
          setDueDate={setDueDate}
          time={time}
          setTime={setTime}
          handleSubmit={handleSubmit}
          onCancel={() => {
            setShowModal(false);
            resetForm();
          }}
          editId={editId}
        />
      )}
    </div>
  );
}

export default App;
