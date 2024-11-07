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
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <Link to={`/projects/${project.id}/tasks`}>
            <p className='project-name'>{project.name} </p> {/* Display task count */}
          </Link>
          (Completed Tasks: {completedTaskCount})
          <div className='project-actions'>
            <button className='edit-button' onClick={handleEdit}>Edit</button>
            <button
              className='delete-button'
              onClick={(e) => {
                e.stopPropagation(); // Prevent link click when deleting
                onDelete(project.id);
              }}
            >
              Delete
            </button>
          </div>
          
        </>
      )}
    </li>
  );
};

export default Project;
