import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProjects } from './ProjectContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { projects  } = useProjects();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      console.log(API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}/tasks`);
      console.log(response.url);
      
      
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    const newTask = {
      name: task.name,
      createdAt: new Date().toISOString(),
      projectId: task.projectId,
      completed: task.completed,
      id: parseInt(task.id) // Convert id to integer
    };
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const addedTask = await response.json();
      console.log(addedTask);
      
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      const response = await fetch(`${API_BASE_URL}/projects/${taskToDelete.projectId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const project = await response.json();
      
      console.log(project);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      if (taskToDelete.completed) {
        await fetch(`${API_BASE_URL}/projects/${project.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completedTasks: project.completedTasks - 1 }),
        });

        window.location.reload();

        console.log("All good");
        
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Update a task
  const updateTask = async (taskId, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? updatedTask : task
          )
        );
        const projectId = updatedTask.projectId;
        const project = projects.find((project) => project.id == projectId);
        console.log(project);
        
        if (project) {
          const completedTasks = project.completedTasks + (updatedTask.completed ? 1 : -1);
          await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completedTasks }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
          
            window.location.reload();
        }
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, updateTask, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
