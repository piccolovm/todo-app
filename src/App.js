import React, { useState, useEffect } from "react";
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

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
    <div>
      <h1>Todo App</h1>
      <TodoForm addTask={addTask} />
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default App;