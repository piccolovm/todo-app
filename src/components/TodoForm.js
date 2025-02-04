import React, { useState } from "react";

function TodoForm({addTask}) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (taskText.trim() === '') return; // Ignore empty input
    addTask(taskText); // Pass task text to parent
    setTaskText(''); // Clear input
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input className="task-input"
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
      />
      <button className="add-button" type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;