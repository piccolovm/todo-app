import React, { useState, useEffect } from "react";
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './toDo.css';

function App() {
  const [tasks, setTasks] = useState([]); // tasks array
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (idToRemove) => {
    setTasks(tasks.filter(task => task.id !== idToRemove));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>
      <TodoForm addTask={addTask} />
      <div className="filter-buttons">
        <button 
          className={`filter-button ${filter === "All" ? "active" : ""}`} 
          onClick={() => setFilter("All")}>All
        </button>
        <button 
          className={`filter-button ${filter === "Active" ? "active" : ""}`} 
          onClick={() => setFilter("Active")}>Active
        </button>
        <button 
          className={`filter-button ${filter === "Completed" ? "active" : ""}`} 
          onClick={() => setFilter("Completed")}>Completed
        </button>
      </div>
      <ul className="task-list">
        {filteredTasks.map(task => (
          <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default App;