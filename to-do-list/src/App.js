import React, { useState } from "react";
import "./styles/App.css";
import "./styles/footer.css";
import "./styles/header.css";
import "./styles/pagination.css";
import "./styles/content.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const startingNumber = (currentPage - 1) * tasksPerPage + 1;

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = { id: Date.now(), text: newTask };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setNewTask("");

      if (
        (currentPage - 1) * tasksPerPage + 1 + tasksPerPage <=
        updatedTasks.length
      ) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const toggleTaskExpansion = (id) => {
    if (expandedTasks.includes(id)) {
      setExpandedTasks(expandedTasks.filter((item) => item !== id));
    } else {
      setExpandedTasks([...expandedTasks, id]);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setExpandedTasks(expandedTasks.filter((item) => item !== id));

    const maxPages = Math.ceil(updatedTasks.length / tasksPerPage);
    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTask.trim() !== "") {
      addTask();
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <header>
        <nav className="nav">
          <div className="nav__logo">Logo</div>
          <div className="nav__toggle">
            <span className="nav__icon" />
            <span className="nav__icon" />
            <span className="nav__icon" />
          </div>
          <ul className="nav__menu">
            <li className="nav__item">
              <a href="#home" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item" />
            <a href="#home" className="nav__link">
              About
            </a>
            <li className="nav__item" />
            <a href="#portfolio" className="nav__link">
              Portfolio
            </a>
            <li className="nav__item" />
            <a href="#contact" className="nav__link">
              Contact
            </a>
          </ul>
        </nav>
      </header>

      <div className="container">
        <h1 className="header">ToDo App</h1>
        <div className="input-container">
          <input
            className="task-input"
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
        </div>
        <div className="total-tasks">Total Tasks: {tasks.length}</div>
        <ul className="task-list">
          {currentTasks.map((task, index) => (
            <li key={task.id} className="task-item">
              <span className="task-number">{index + startingNumber}</span>
              <span
                className="task-text"
                onClick={() => toggleTaskExpansion(task.id)}
              >
                {task.text}
              </span>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="footer">
        <p>Copyright © 2023 Your ToDo App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
