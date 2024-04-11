import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.css";

const App = () => {
  const [todos, setTodos] = useState([
    { title: "get groceries", isChecked: true, uuid: uuidv4() },
    { title: "walk the dog", isChecked: false, uuid: uuidv4() },
    { title: "do laundry", isChecked: true, uuid: uuidv4() },
    { title: "clean the house", isChecked: false, uuid: uuidv4() },
  ]);

  const [filter, setFilter] = useState("all");

  let numChecked = 0;

  todos.forEach((todo) => {
    if (todo.isChecked) {
      numChecked += 1;
    }
  });

  let filteredTodos;
  if (filter === "all") {
    filteredTodos = todos;
  } else if (filter === "done") {
    filteredTodos = todos.filter((todo) => todo.isChecked);
  } else if (filter === "todo") {
    filteredTodos = todos.filter((todo) => !todo.isChecked);
  }

  return (
    <div className={styles.container}>
      <h4>Task Tracker</h4>

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
        {filteredTodos.map(({ title, isChecked, uuid }) => (
          <ToDoItem
            key={uuid}
            title={title}
            isChecked={isChecked}
            setIsChecked={(newIsChecked) => {
              const copyOfTodos = [...todos];
              const index = copyOfTodos.findIndex((todo) => todo.uuid === uuid);
              copyOfTodos[index].isChecked = newIsChecked;

              setTodos(copyOfTodos);
            }}
            setTitle={(newTitle) => {
              const copyOfTodos = [...todos];
              const index = copyOfTodos.findIndex((todo) => todo.uuid === uuid);
              copyOfTodos[index].title = newTitle;
              setTodos(copyOfTodos);
            }}
            handleRemove={() => {
              const copyOfTodos = [...todos];
              const index = copyOfTodos.findIndex((todo) => todo.uuid === uuid);
              copyOfTodos.splice(index, 1);
              setTodos(copyOfTodos);
            }}
          />
        ))}
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

export default App;
