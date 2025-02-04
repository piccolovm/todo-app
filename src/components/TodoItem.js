import React from "react";

function TodoItem({ task, toggleTaskCompletion, deleteTask }) {
  return (
    <li className="task-item">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTaskCompletion(task.id)} 
      />
      <span className={`task-text ${task.completed ? "completed" : ""}`}>{task.text}</span>
      <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;