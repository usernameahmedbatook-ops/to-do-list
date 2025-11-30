import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ITask {
  id?: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => toast.error("Error fetching tasks!"));
  }, []);

  const remainingCount = tasks.filter((task) => !task.completed).length;

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((saved) =>
        toast.success(`Task "${saved.text}" added successfully!`)
      )
      .catch(() => toast.error("Error creating task!"));
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    const removedTask = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    toast.info(`Task "${removedTask.text}" removed successfully!`);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          📝 My To-Do List
        </h2>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#444",
            fontWeight: 500,
            fontSize: "1.1rem",
          }}
        >
          Remaining Tasks:{" "}
          <span style={{ color: "#007bff" }}>{remainingCount}</span>
        </h3>

        {/* Responsive Input Section */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new task..."
            style={{
              flex: "1 1 250px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <button
            onClick={addTask}
            style={{
              flex: "0 0 auto",
              background: "#28a745",
              color: "white",
              padding: "12px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f9fafb",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                fontSize: "15px",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />

              <span
                style={{
                  marginLeft: "12px",
                  flex: 1,
                  color: task.completed ? "#888" : "#333",
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              <button
                onClick={() => removeTask(index)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          transition={Bounce}
        />
      </div>

      {/* 🔥 Mobile & tablet responsive styles */}
      <style>
        {`
          @media (max-width: 600px) {
            div {
              padding: 10px !important;
            }

            input {
              font-size: 14px !important;
              padding: 10px !important;
            }

            button {
              font-size: 14px !important;
              padding: 10px !important;
            }

            li {
              padding: 10px !important;
            }

            h2 {
              font-size: 22px !important;
            }

            h3 {
              font-size: 16px !important;
            }
          }

          @media (max-width: 400px) {
            button {
              width: 100% !important;
            }

            div[style*="flex-wrap"] {
              flex-direction: column !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TodoApp;
