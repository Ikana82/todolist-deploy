import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import TodoCard from "./components/TodoCard";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const base_url = "http://localhost:3000/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  function startEdit(todo) {
    setTask(todo.task);
    setEditId(todo.id);
  }

  async function fetchTodos() {
    try {
      const response = await fetch(base_url);
      const result = await response.json();
      setTodos(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      // UPDATE MODE
      try {
        await fetch(`${base_url}/${editId}`, {
          method: "PATCH",
          body: JSON.stringify({ task }),
        });
        await fetchTodos();
        setEditId(null);
        setTask(""); // reset input
      } catch (error) {
        console.error("Failed to update:", error);
      }
    } else {
      // CREATE MODE
      const newTodo = {
        id: todos.length > 0 ? String(+todos.at(-1).id + 1) : "1",
        task,
        done: false,
      };

      await fetch(base_url, {
        method: "POST",
        body: JSON.stringify(newTodo),
      });

      setTodos([...todos, newTodo]);
      setTask("");
    }
  }

  async function toggleDone(id) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedStatus = !todoToUpdate.done;

    await fetch(`${base_url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: updatedStatus }),
    });

    fetchTodos(); // refresh list
  }

  async function deleteTodo(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${base_url}/${id}`, {
          method: "DELETE",
        });
        fetchTodos();
      }
    });
  }

  async function removeChecked() {
    const completed = todos.filter((todo) => todo.done);
    for (let todo of completed) {
      await fetch(`${base_url}/${todo.id}`, {
        method: "DELETE",
      });
    }
    fetchTodos();
  }

  return (
    <>
      <TodoApp
        todos={todos}
        task={task}
        setTask={setTask}
        handleSubmit={handleSubmit} // Ganti dari createTodo
        toggleDone={toggleDone}
        deleteTodo={deleteTodo}
        removeChecked={removeChecked}
        editId={editId}
        startEdit={startEdit}
      />
    </>
  );
}

export default App;
