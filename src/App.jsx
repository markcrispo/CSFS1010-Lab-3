import ToDoList from "./ToDoList";

import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    const name = prompt("What is your name?");
    setUsername(name);
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>
        {username ? "Switch users" : "Login"}
      </button>
      {/* Method 3c) */}
      <ToDoList username={username} key={username} />
    </div>
  );
};

export default App;
