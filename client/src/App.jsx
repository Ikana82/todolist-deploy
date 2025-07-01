import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

    useEffect(() => {
      async function fetchTodos() {
        try {
          const response = await fetch("http://localhost:3000/todos", {
            method: "GET",
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
      fetchTodos();
    }, []);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl">TODO App</a>
      </div>
      <div className="flex w-full flex-col lg:flex-row px-3">
        <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
          Form
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
          Content React
        </div>
      </div>
    </>
  );
}

export default App;
