import { useState, useEffect } from "react";
import "./App.css";
import TodoCard from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("OPEN");

 
    async function fetchTodos() {
      try {
        const response = await fetch(`http://localhost:3000/todos`, {
          method: "GET",
        });
        const result = await response.json();
        console.log(result);
        setTodos(result);
      } catch (error) {
        console.log(error);
      }
    }
     useEffect(() => {
    fetchTodos();
  }, []);

  async function createTodo(event) {
    event.preventDefault();
    console.log(task, status);
    const newTodo = {
      id: String(+todos.at(-1).id + 1) ?? "1", // bisa juga ditulis +todos.at(-1).id + 1) ?? 1
      task: task,
      status: status,
    };
    await fetch("http://localhost:3000/todos", {
      // const response =  bisa ditaruh didepan untuk pemanggilan
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    // fetch data lagi
    // setTodo lagi dengan data terbaru
    console.log(newTodo); // {}
    console.log(todos); // []
    setTodos([...todos, newTodo]);
  }

  async function deleteTodo(id) {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "GET"
      });
      const foundTodo = await response.json();
      console.log(foundTodo);

      await fetch(`http://localhost:3000/todos/${foundTodo.id}`, {
        method: "DELETE"
      });

      await fetchTodos();
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div className="p-2">
        <div className="navbar bg-base-100 shadow-sm">
          <a className="btn btn-ghost text-xl">TODO App</a>
        </div>
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
            {/* FORM CREATE */}
            <form
              onSubmit={createTodo}
              action=""
              className="flex flex-col gap-3"
            >
              <h2>Create Todo </h2>
              <label className="input">
                <span className="label">Task</span>
                <input
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                  type="text"
                  placeholder="Type your task here..."
                />
              </label>
              <label className="select">
                <span className="label">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="ONGOING">ONGOING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </label>
              <button className="btn btn-primary">Submit</button>
            </form>
            {/* FORM CREATE END */}
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
            <div className="flex flex-wrap gap-10 max-w-[990px]">
              {todos.map((t) => (
                <TodoCard
                  key={t.id}
                  task={t.task}
                  status={t.status}
                  onDelete={() => deleteTodo(t.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
