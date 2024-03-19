// src/components/TaskList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import './TaskList.css'; // Import the CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <AddTaskForm onAdd={handleAddTask} />

      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className="todo-item">
            <input
              type="text"
              value={task.task}
              onChange={(e) => handleUpdateTask(task.id, { task: e.target.value })}
            />
            <button onClick={() => handleUpdateTask(task.id, { task: task.task })}>Update</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
