import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import update from "immutability-helper";
import { HiMoon, HiSun } from "react-icons/hi";
import { TODOS } from "../../shared/constants";
import ITodo from "../interfaces/todo";
import Todo from "../components/Todo";

export const index = () => {
  const [theme, setTheme] = useState("white");
  const [todos, setTodos] = useState(TODOS);
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  const { tab } = router.query ?? "all";

  useEffect(() => {
    if (typeof window !== undefined) {
      let _theme = window.localStorage.getItem("theme");
      if (_theme === "dark") {
        document.documentElement.classList.add("dark");
      }
      setTheme(_theme ?? "white");
    }
  }, []);

  function toggleTodo(id: string) {
    let filteredTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(filteredTodos);
  }

  function clearCompletedTodos() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function toggleTheme() {
    if (typeof window !== undefined) {
      let _theme = theme === "white" ? "dark" : "white";
      window.localStorage.setItem("theme", _theme);
      if (_theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme(_theme);
    }
  }

  function addTodo(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!inputVal) return;
    let id = nanoid(8);
    let newTodo = { id, name: inputVal, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputVal("");
  }

  function removeTodo(id: string) {
    let filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  const moveTodo = useCallback(
    (dragIndex, hoverIndex) => {
      const dragTodo = todos[dragIndex];
      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragTodo],
          ],
        })
      );
    },
    [todos]
  );

  const renderTodo = (todo: ITodo, index: number) => (
    <Todo
      key={todo.id}
      id={todo.id}
      index={index}
      todo={todo}
      toggleTodo={toggleTodo}
      removeTodo={removeTodo}
      moveTodo={moveTodo}
    />
  );

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <main className="relative z-10 w-98% max-w-5xl mx-auto p-5">
        <div className="flex mt-10 justify-between items-center">
          <h1 className="font-bold text-3xl text-white uppercase tracking-wider">
            Todo
          </h1>
          <button className="p-2 text-xl text-white" onClick={toggleTheme}>
            <HiSun className="hidden dark:block" />
            <HiMoon className="block dark:hidden" />
          </button>
        </div>

        <form
          onSubmit={(e) => addTodo}
          className="px-5 py-3 bg-white shadow-lg mt-6 rounded-md font-bold flex gap-2 items-center text-gray-400 dark:bg-gray-800 dark:text-gray-500"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700" />
          <input
            type="text"
            maxLength={100}
            placeholder="Create a new todo..."
            onChange={(e) => setInputVal(e.target.value)}
            value={inputVal}
            className="flex-1 py-2 px-2 border-0 bg-transparent ml-1 focus:text-gray-700 dark:focus:text-gray-300"
          />
        </form>
        <div className="flex flex-col rounded-t-md mt-10 bg-white dark:bg-gray-800 shadow-lg">
          {(tab === "active"
            ? todos.filter((todo) => !todo.completed)
            : tab === "completed"
            ? todos.filter((todo) => todo.completed)
            : todos
          ).map((todo, index) => renderTodo(todo, index))}
        </div>
        <div className="p-5 flex justify-between items-center text-gray-400 bg-white dark:bg-gray-800 rounded-b-md shadow-lg b">
          <span>
            {
              (tab === "active"
                ? todos.filter((todo) => !todo.completed)
                : tab === "completed"
                ? todos.filter((todo) => todo.completed)
                : todos
              ).length
            }{" "}
            items left
          </span>
          <button onClick={clearCompletedTodos}>Clear Completed</button>
        </div>

        <div className="p-5 bg-white shadow-lg mt-6 rounded-md font-bold flex gap-2 items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500">
          <button
            className={`font-bold ${
              (tab === "all" || undefined) && "text-blue-500"
            }`}
            onClick={() => router.push("/?tab=all")}
          >
            All
          </button>
          <button
            className={`font-bold ${tab === "active" && "text-blue-500"}`}
            onClick={() => router.push("/?tab=active")}
          >
            Active
          </button>
          <button
            className={`font-bold ${tab === "completed" && "text-blue-500"}`}
            onClick={() => router.push("/?tab=completed")}
          >
            Completed
          </button>
        </div>
      </main>

      <div className="absolute top-0 left-0 right-0 h-2/6 bg-purple-400 bg-mobile-light dark:bg-mobile-dark lg:bg-desktop-light lg:dark:bg-desktop-dark bg-cover bg-center bg-no-repeat w-full z-0" />

      <footer className="pt-2 pb-5 w-full text-center text-gray-400">
        <span>Drag and drop to order list</span>
      </footer>
    </div>
  );
};

export default index;
