import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [expandedTasks, setExpandedTasks] = useState([]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const toggleTaskExpansion = (index) => {
    if (expandedTasks.includes(index)) {
      setExpandedTasks(expandedTasks.filter(item => item !== index));
    } else {
      setExpandedTasks([...expandedTasks, index]);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setExpandedTasks(expandedTasks.filter(item => item !== index));
  };




  return (
    <div className="App">
      <div className="container">
        <h1 className="header">ToDo App</h1>
        <div className="input-container">
          <input
            className="task-input"
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              
              <span
                className="task-text"
                onClick={() => toggleTaskExpansion(index)}
              >
                {task}
              </span>
              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
