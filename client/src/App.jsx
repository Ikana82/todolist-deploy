// Import React Hooks
import { useState, useEffect, useRef } from "react";

// Import icon & style
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  // State management
  const [todos, setTodos] = useState([]); // Semua data todo
  const [task, setTask] = useState(""); // Input task
  const [editId, setEditId] = useState(null); // ID task yang sedang diedit
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const tasksPerPage = 6; // Jumlah task per halaman
  const inputRef = useRef(null); // Mengatur input untuk auto focus

  const base_url = "https://skitter-deeply-airbus.glitch.me/todos"; // URL API

  // Ambil data todo saat komponen pertama kali di-render
  useEffect(() => {
    fetchTodos();
  }, []);

  // Hitung jumlah task yang sudah selesai
  const completedCount = todos.filter((t) => t.done).length;

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = todos.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(todos.length / tasksPerPage);

  // Fetch semua task dari server
  async function fetchTodos() {
    try {
      const res = await fetch(base_url);
      const data = await res.json();
      console.log("Fetching todos:", data); // Mengecek apakah todos glitch berhasil atau tidak
      setTodos(data); // Simpan ke state
      setCurrentPage(1); // Reset ke halaman pertama
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  // Submit task (add atau update)
  async function handleSubmit(e) {
    e.preventDefault(); // Supaya tidak ke refresh

    // Cek jika input kosong
    if (!task.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Tell me what you have to do",
      }).then(() => {
        inputRef.current?.focus(); // Arahkan fokus kembali ke input setelah klik OK
      });
      return;
    }

    const todoData = {
      task,
      // description,
      // date,
      // time,
      done: false, // Task baru selalu belum selesai
    };

    try {
      if (editId) {
        // Edit task
        await fetch(`${base_url}/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        });
      } else {
        // Tambah task baru
        const lastId =
          todos.length > 0 ? Math.max(...todos.map((t) => +t.id)) : 0;
        todoData.id = String(lastId + 1);
        await fetch(base_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        });
      }

      await fetchTodos(); // Refresh data
      resetForm(); // Reset form
      setShowModal(false); // Tutup modal jika aktif
    } catch (err) {
      console.error("Error saving todo:", err);
    }
  }

  // Reset form input
  function resetForm() {
    setTask("");
    setDescription("");
    setDate("");
    setTime("");
    setEditId(null);
  }

  // Ubah status done dari task (toggle)
  async function toggleDone(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await fetch(`${base_url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !todo.done }),
      });
      fetchTodos(); // Refresh data
    } catch (err) {
      console.error("Error toggling done:", err);
    }
  }

  // Hapus semua task yang sudah dicentang (done)
  async function removeChecked() {
    try {
      const checkedTodos = todos.filter((todo) => todo.done);
      await Promise.all(
        checkedTodos.map((todo) =>
          fetch(`${base_url}/${todo.id}`, { method: "DELETE" })
        )
      );
      await fetchTodos(); // Refresh data
    } catch (err) {
      console.error("Error removing checked todos:", err);
    }
  }

  // Hapus task dengan konfirmasi SweetAlert
  async function deleteTodo(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4196bc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${base_url}/${id}`, {
          method: "DELETE",
        });
        await fetchTodos(); // Refresh data

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error deleting todo:", err);
        // <Alert severity="error">Error deleting todo</Alert> coba pakai alert
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    }
  }

  // Mulai mode edit task
  function startEdit(todo) {
    setTask(todo.task);
    setDescription(todo.description || "");
    setDate(todo.date || "");
    setTime(todo.time || "");
    setEditId(todo.id);
    setShowModal(true); // opsional, bisa diabaikan
  }

  // Pindah halaman task
  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-6 bg-[#4196bc]">
      <div className="max-w-4xl mx-auto bg-neutral-50 rounded-lg p-5 shadow">
        {/* Judul Aplikasi */}
        <h1 className="text-center text-2xl font-extrabold text-neutral-600 mb-4">
          TODO LIST
        </h1>

        {/* Form Input Task */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 mb-4"
        >
          <input
            type="text"
            ref={inputRef}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full border border-gray-300 rounded px-3 py-2 text-neutral-600"
          />
          <button
            type="submit"
            className="w-full md:w-auto bg-[#4196bc] text-white px-4 py-2 rounded hover:bg-[#3580a2]"
          >
            {editId ? "Update" : "+"} {/* Tombol untuk tambah / edit */}
          </button>
        </form>

        {/* Daftar Task */}
        <ul className="space-y-2 mb-4">
          {currentTasks.map((todo) => (
            <li
              key={todo.id}
              className={`p-2 rounded flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
                todo.done ? "bg-blue-100" : "bg-sky-50" // Warna berdasarkan status done
              }`}
            >
              <span
                className={`break-words w-full md:w-auto text-[#4196bc] ${
                  todo.done ? "line-through opacity-60" : "" // Style task selesai
                }`}
              >
                {todo.task}
              </span>

              {/* Tombol aksi: done, edit, delete */}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-[#4196bc] px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-300 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-[#4196bc] px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Footer: jumlah task selesai dan tombol hapus yang sudah selesai */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mt-4">
          <div className="bg-lime-400 px-4 py-2 rounded text-stone-700 text-sm font-medium">
            {completedCount} of {todos.length} task(s) completed
          </div>
          <button
            onClick={removeChecked}
            className="bg-[#4196bc] text-white px-4 py-2 rounded hover:bg-[#3580a2]"
          >
            Remove Checked
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
