import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

const Project = ({ project, completedTaskCount, onEdit, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(project.id, editedName);
    setIsEditing(false);
  };

  return (
    <li className='project'>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отменить</button>
        </>
      ) : (
        <>
          <Link to={`/projects/${project.id}/tasks`}>
            <p className='project-name'>{project.name} </p> {/* Показать количество выполненных задач */}
          </Link>
          (Выполненные задачи: {completedTaskCount})
          <div className='project-actions'>
            <button className='edit-button' onClick={handleEdit}>Редактировать</button>
            <button
              className='delete-button'
              onClick={(e) => {
                e.stopPropagation(); // Предотвратить клик по ссылке при удалении
                onDelete(project.id);
              }}
            >
              Удалить
            </button>
          </div>
          
        </>
      )}
    </li>
  );
};

export default Project;

