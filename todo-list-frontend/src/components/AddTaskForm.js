// src/components/AddTaskForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tasks', { task });
      onAdd(response.data);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter task" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
