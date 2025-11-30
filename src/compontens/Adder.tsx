import React, { useState } from "react";

interface Itask {
  completed : string
  task : string

}

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index : any) => {
    const newTasks = [...tasks];
    newTasks[index].completed  = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index :any) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>My To-Do List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{
                marginLeft: "8px",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              {task.text  }
            </span>
            <button
              onClick={() => removeTask(index)}
              style={{
                marginLeft: "12px",
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;


