/* eslint-disable  react/prop-types */
import ToDoItem from "./ToDoItem";
import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./ToDoList.module.css";

const defaultState = [
  Object.freeze({ title: "get groceries", isChecked: true, uuid: uuidv4() }),
];

const ToDoList = ({ username }) => {
  const [todos, setTodos] = useState(username ? [] : defaultState);
  const [loading, setLoading] = useState(username ? true : false);

  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(0);

  // Method 3b)
  // const [prevUsername, setPrevUsername] = useState(username);
  // if (prevUsername !== username) {
  //   setPrevUsername(username);
  //   setTodos(defaultState);
  // }

  // Method 3a)
  // console.log("username:", username, todos);
  // useEffect(() => {
  //   setTodos(defaultState);
  // }, [username]);

  const numChecked = useMemo(() => {
    let innerCount = 0;
    todos.forEach((todo) => {
      if (todo.isChecked) {
        innerCount += 1;
      }
    });

    return innerCount;
  }, [todos]);

  let filteredTodos;
  if (filter === "all") {
    filteredTodos = todos;
  } else if (filter === "done") {
    filteredTodos = todos.filter((todo) => todo.isChecked);
  } else if (filter === "todo") {
    filteredTodos = todos.filter((todo) => !todo.isChecked);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      if (username) {
        const result = await fetch(
          `https://64dd28c2e64a8525a0f7af4a.mockapi.io/todos/${username}`
        );
        if (result.status === 404) {
          setTodos(defaultState);
        } else {
          const json = await result.json();
          setTodos(json);
        }
        setLoading(false);
      }
    };

    fetchTodos();
  }, [username]);

  console.log("render");

  return (
    <div className={styles.container}>
      <h4>{`${username ? `${username}'s ` : ""}Task Tracker`}</h4>

      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}

      <div style={{ display: "flex", gap: "8px" }}>
        Filters:
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("done")}
          style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
        >
          Done
        </button>
        <button
          onClick={() => setFilter("todo")}
          style={{ fontWeight: filter === "todo" ? "bold" : "normal" }}
        >
          To-do
        </button>
      </div>

      <div className={styles.toDoList}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredTodos.map(({ title, isChecked, uuid }) => (
            <ToDoItem
              key={uuid}
              title={title}
              isChecked={isChecked}
              setIsChecked={(newIsChecked) => {
                const copyOfTodos = [...todos];
                const index = copyOfTodos.findIndex(
                  (todo) => todo.uuid === uuid
                );

                copyOfTodos[index] = {
                  ...copyOfTodos[index],
                  isChecked: newIsChecked,
                };

                setTodos(copyOfTodos);
              }}
              setTitle={(newTitle) => {
                const copyOfTodos = [...todos];
                const index = copyOfTodos.findIndex(
                  (todo) => todo.uuid === uuid
                );

                copyOfTodos[index] = { ...copyOfTodos[index] };
                copyOfTodos[index].title = newTitle;

                setTodos(copyOfTodos);
              }}
              handleRemove={() => {
                const copyOfTodos = [...todos];
                const index = copyOfTodos.findIndex(
                  (todo) => todo.uuid === uuid
                );
                copyOfTodos.splice(index, 1);
                setTodos(copyOfTodos);
              }}
            />
          ))
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setTodos([
              ...todos,
              { title: "", isChecked: false, uuid: uuidv4() },
            ]);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            const copyOfTodos = [...todos];
            copyOfTodos.pop();
            setTodos(copyOfTodos);
          }}
        >
          Remove
        </button>
      </div>
      <div>
        {numChecked} out of {todos.length} tasks completed.
        {numChecked === todos.length ? " Great job!" : ""}
      </div>
    </div>
  );
};

export default ToDoList;
