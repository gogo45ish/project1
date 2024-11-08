// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  const { tasks, fetchTasks, addTask, deleteTask, updateTaskName, markTaskComplete} = useTasks();
  const { projects } = useProjects();

  const projectTasks = tasks.filter((task) => task.projectId === id);

  useEffect(() => {
    fetchTasks(id);
  }, []);
  
  const handleAddTask = () => {
    if (!newTask) return;
    addTask({ name: newTask, projectId: id, completed: false, createdAt: new Date().toISOString() });
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => deleteTask(taskId);

  const handleMarkTaskComplete = (taskId, completed) => markTaskComplete(taskId, !completed);

  const handleEditTask = (taskId, currentName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(currentName);
  };

  const handleSaveTaskEdit = (taskId) => {
    updateTaskName(taskId, { name: editedTaskName });
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
      <Link to={`/profile`}>
        <p>Профиль</p> {/* Показать количество выполненных задач */}
      </Link>
      <Link to={`/projects`}>
        <p>Проекты</p> {/* Показать количество выполненных задач */}
      </Link>
      {currentProject ? (
        <h2>Задачи для проекта: {currentProject.name} (ID: {id})</h2>
      ) : (
        <h2>Проект не найден</h2>
      )}
      
      <div className="task-list">
        <input
          type="text"
          placeholder="Новая задача"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Добавить задачу</button>
        
        {/* Элементы управления сортировкой и фильтрацией */}
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

        {/* Список задач */}
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
                  <button onClick={() => handleSaveTaskEdit(task.id)} className="edit-button">Сохранить</button>
                  <button onClick={() => setEditingTaskId(null)} className="edit-button">Отменить</button>
                </>
              ) : (
                <>
                  <span
                    className={task.completed ? "completed-task" : ""}
                  >
                    {task.name} (Создана: {new Date(task.createdAt).toLocaleDateString()})
                  </span>
                  <div className="task-actions">
                    <button 
                      onClick={() => handleMarkTaskComplete(task.id, task.completed)}
                      className={task.completed ? "delete-button" : "edit-button"}
                    >
                      {task.completed ? 'Отметить как незавершенную' : 'Отметить как завершенную'}
                    </button>
                    <button 
                      onClick={() => handleEditTask(task.id, task.name)}
                      className="edit-button"
                    >
                      Редактировать
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-button"
                    >
                      Удалить
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
