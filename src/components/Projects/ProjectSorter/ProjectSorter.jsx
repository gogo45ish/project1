import React from 'react';
import './ProjectSorter.css';

const ProjectSorter = ({ sortOrder, setSortOrder, sortDirection, setSortDirection }) => {
  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    if (newSortOrder === sortOrder) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <div className="project-sorter">
      <h3>Sort Projects</h3>
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="completedTasks">Completed Tasks</option>
        <option value="createdAt">Date Created</option>
      </select>
      <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
        {sortDirection === 'asc' ? 'ASC' : 'DESC'}
      </button>
    </div>
  );
};

export default ProjectSorter;
