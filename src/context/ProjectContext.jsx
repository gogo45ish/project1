import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
const ProjectsContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const { user } = useUser();

  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        const response = await fetch(`${API_BASE_URL}/projects?userId=${user.id}`);
        if (!response.ok) {
          console.error('Failed to fetch projects:', response.statusText);
          return;
        }
        const data = await response.json();
        setProjects(data);
      }
    };

    const fetchTasks = async () => {
      if (user) {
        const response = await fetch(`${API_BASE_URL}/tasks?userId=${user.id}`); // Assuming tasks are user-specific
        if (!response.ok) {
          console.error('Failed to fetch tasks:', response.statusText);
          return;
        }
        const data = await response.json();
        setTasks(data);
      }
    };

    fetchProjects();
    fetchTasks();
  }, [user]);


  const addProject = async (project) => {
    console.log(project);
    
    try {
      const newProject = {
        name: project.name,
        createdAt: new Date().toISOString(),
        userId: user.id,
        completedTasks: 0,
        id: uuidv4()// Convert id to integer
      };

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const addedProject = await response.json();
        setProjects((prev) => [...prev, addedProject]);
      } else {
        console.error('Failed to add project:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      // Delete tasks associated with the project
      const tasksResponse = await fetch(`${API_BASE_URL}/tasks`);
      const tasks = await tasksResponse.json();
      const tasksToDelete = tasks.filter((task) => task.projectId === projectId);
  
      tasksToDelete.forEach((task) => {
        fetch(`${API_BASE_URL}/tasks/${task.id}`, {
          method: 'DELETE',
        });
      });
  
      // Delete the project
      const projectResponse = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (projectResponse.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.projectId !== projectId)
        );
        window.location.reload();
      } else {
        console.error('Failed to delete project:', projectResponse.statusText);
      }
    } catch (error) {
      console.error('Error deleting project and tasks:', error);
    }
  };

  const updateProject = async (projectId, updatedProjectFields) => {
    try {
      console.log(updatedProjectFields);
      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: updatedProjectFields }),
        }
      );

      

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId ? updatedProject : project
          )
        );
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

 
  

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      addProject, 
      deleteProject, 
      updateProject}}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
