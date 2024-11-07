import React, { useState, useCallback } from 'react';
import { useProjects } from '../../../context/ProjectContext';
import LogoutButton from '../../Auth/LogoutButton';
import Project from '../Project/Project';
import './ProjectList.css';
import ProjectSorter from '../ProjectSorter/ProjectSorter';
import ProjectFilter from '../ProjectFiler/ProjectFilter';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const { projects, addProject, deleteProject, updateProject } = useProjects();
  const [newProject, setNewProject] = useState('');
  
  // Sorting states
  const [sortOrder, setSortOrder] = useState('name'); // default sort order
  const [sortDirection, setSortDirection] = useState('asc'); // default sort direction
  
  // Filtering states
  const [taskMinCount, setTaskMinCount] = useState(0);
  const [taskMaxCount, setTaskMaxCount] = useState(Infinity);
  const [searchName, setSearchName] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleAddProject = () => {
    if (!newProject) return;
    addProject({
      name: newProject,
      createdAt: new Date().toLocaleString(),
    });
    setNewProject('');
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
  };

  const sortedAndFilteredProjects = useCallback(() => {
    let filteredProjects = [...projects];

    // Apply task completion range filter
    filteredProjects = filteredProjects.filter(project =>
      project.completedTasks >= taskMinCount &&
      (taskMaxCount === Infinity || project.completedTasks <= taskMaxCount)
    );

    // Apply project name search filter
    if (searchName) {
      filteredProjects = filteredProjects.filter(project =>
        project.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Apply date range filter
    if (dateRange.start) {
      filteredProjects = filteredProjects.filter(project =>
        new Date(project.createdAt) >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filteredProjects = filteredProjects.filter(project =>
        new Date(project.createdAt) <= new Date(dateRange.end)
      );
    }

    // Sort projects
    switch (sortOrder) {
      case 'name':
        filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'completedTasks':
        filteredProjects.sort((a, b) => a.completedTasks - b.completedTasks);
        break;
      case 'createdAt':
        filteredProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    if (sortDirection === 'desc') {
      filteredProjects.reverse();
    }
    return filteredProjects;
  }, [projects, sortOrder, sortDirection, taskMinCount, taskMaxCount, searchName, dateRange]);

  return (
    <div>
      <LogoutButton />
      <Link to={`/profile`}>
        <p>Профиль</p> {/* Показать количество выполненных задач */}
      </Link>
      <h2>Ваши проекты</h2>
      
      {/* Project Addition */}
      <input
        type="text"
        placeholder="Новый проект"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
      />
      <button onClick={handleAddProject}>Добавить проект</button>

      {/* Sorting */}
      <ProjectSorter
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      {/* Filtering */}
      <ProjectFilter
        taskMinCount={taskMinCount}
        setTaskMinCount={setTaskMinCount}
        taskMaxCount={taskMaxCount}
        setTaskMaxCount={setTaskMaxCount}
        searchName={searchName}
        setSearchName={setSearchName}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Project List */}
      <ul>
        {sortedAndFilteredProjects().map((project) => (
          <Project
            key={project.id}
            project={project}
            completedTaskCount={project.completedTasks}
            onDelete={() => handleDeleteProject(project.id)}
            onSave={updateProject}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

