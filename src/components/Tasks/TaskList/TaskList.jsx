// TaskList.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoutButton from '../../Auth/LogoutButton';
import { useTasks } from '../../../context/TasksContext';
import { useProjects } from '../../../context/ProjectContext';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskSorter from '../TaskSorter/TaskSorter';
import './TaskList.css';

const TaskList = () => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [sortOrder, setSortOrder] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { tasks, addTask, deleteTask, updateTask } = useTasks();
  const { projects } = useProjects();

  const projectTasks = tasks.filter((task) => task.projectId === id);

  const handleAddTask = () => {
    if (!newTask) return;
    addTask({ name: newTask, projectId: id, completed: false, createdAt: new Date().toISOString() });
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => deleteTask(taskId);

  const handleMarkTaskComplete = (taskId, completed) => updateTask(taskId, { completed: !completed });

  const handleEditTask = (taskId, currentName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(currentName);
  };

  const handleSaveTaskEdit = (taskId) => {
    updateTask(taskId, { name: editedTaskName });
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  const currentProject = projects.find((project) => String(project.id) === String(id));

  // Filtered, Sorted Tasks
  const filteredTasks = projectTasks
    .filter((task) => {
      if (statusFilter === 'completed' && !task.completed) return false;
      if (statusFilter === 'incomplete' && task.completed) return false;
      return true;
    })
    .filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => {
      const createdDate = new Date(task.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && createdDate < start) return false;
      if (end && createdDate > end) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortOrder === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  return (
    <div>
      <LogoutButton />
      {currentProject ? (
        <h2>Tasks for Project: {currentProject.name} (ID: {id})</h2>
      ) : (
        <h2>Project not found</h2>
      )}
      
      <div className="task-list">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
        
        {/* Sorting and Filtering Controls */}
        <TaskSorter
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortDirection={sortDirection}
          toggleSortDirection={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        />
        
        <TaskFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {/* Task List */}
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li className="task-item" key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <button onClick={() => handleSaveTaskEdit(task.id)} className="edit-button">Save</button>
                  <button onClick={() => setEditingTaskId(null)} className="edit-button">Cancel</button>
                </>
              ) : (
                <>
                  <span
                    className={task.completed ? "completed-task" : ""}
                  >
                    {task.name} (Created on: {new Date(task.createdAt).toLocaleDateString()})
                  </span>
                  <div className="task-actions">
                    <button 
                      onClick={() => handleMarkTaskComplete(task.id, task.completed)}
                      className={task.completed ? "delete-button" : "edit-button"}
                    >
                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button 
                      onClick={() => handleEditTask(task.id, task.name)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
