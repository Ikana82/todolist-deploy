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
  const [date, setDate] = useState("");
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
    setDate("");
    setTime("");
    setEditId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const todoData = {
      task,
      description,
      date,
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

  async function removeChecked() {
    try {
      const checkedTodos = todos.filter((todo) => todo.done);
      await Promise.all(
        checkedTodos.map((todo) =>
          fetch(`${base_url}/${todo.id}`, { method: "DELETE" })
        )
      );
      await fetchTodos();
    } catch (err) {
      console.error("Error removing checked todos:", err);
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
    setDate(todo.date || "");
    setTime(todo.time || "");
    setEditId(todo.id);
    setShowModal(true);
  }

  return (
    <>
      <div className="min-h-screen  bg-black text-[#ebecf2] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#ebecf2]">Todo List</h1>
            <button
              onClick={() => {
                setShowModal(true);
                resetForm();
              }}
              className="bg-[#060ae2] text-[#ebecf2] px-4 py-2 rounded hover:bg-[#3539fb]"
            >
              + Add New Task
            </button>
          </div>

          {todos.length > 0 && completedCount > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-6">
              <div className="w-full md:w-3/4 bg-gray-700 rounded h-8 overflow-hidden">
                <div
                  className="bg-[#060ae2] h-full text-[#ebecf2] text-sm flex items-center justify-center transition-all duration-300"
                  style={{
                    width: `${(completedCount / todos.length) * 100}%`,
                  }}
                >
                  {completedCount} of {todos.length} task(s) completed
                </div>
              </div>

              <button
                onClick={removeChecked}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Remove Checked
              </button>
            </div>
          )}

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
            date={date}
            setDate={setDate}
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
    </>
  );
}

export default App;
