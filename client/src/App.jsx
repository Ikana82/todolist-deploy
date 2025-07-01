import { useState, useEffect } from "react";
import "./App.css";
import TodoCard from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "GET",
        });
        const result = await response.json();
        console.log(result);
        setTodos(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodos();
  }, []);

  return (
    <>
      <div className="p-2">
        <div className="navbar bg-base-100 shadow-sm">
          <a className="btn btn-ghost text-xl">TODO App</a>
        </div>
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
            <form action="" className="flex flex-col gap-3">
              <h2>Create Todo</h2>
              <label className="input">
                <span className="label">Task</span>
                <input type="text" placeholder="Type your task here..." />
              </label>
              <label className="select">
                <span className="label">Status</span>
                <select>
                  <option selected disabled>Please select the task status</option>
                  <option>OPEN</option>
                  <option>ONGOING</option>
                  <option>COMPLETED</option>
                </select>
              </label>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid grow place-items-center p-3">
            <div className="flex flex-wrap gap-10 max-w-[990px]">
              {todos.map((t) => (
                <TodoCard key={t.id} task={t.task} status={t.status} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
