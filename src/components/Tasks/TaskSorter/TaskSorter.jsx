// TaskSorter.js
import React from 'react';
import './TaskSorter.css'; // Assuming your CSS file is named TaskSorter.css

const TaskSorter = ({ sortOrder, setSortOrder, sortDirection, toggleSortDirection }) => (
  <div className="task-sorter">
    <h3>Sort Tasks</h3>

    {/* Sort by dropdown */}
    <label>Sort by: </label>
    <select
      className="task-sorter-select"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="name">Name</option>
      <option value="createdAt">Date Created</option>
    </select>

    {/* Toggle Sort Direction button */}
    <button
      className="task-sorter-button"
      onClick={toggleSortDirection}
    >
      {sortDirection === 'asc' ? 'ASC' : 'DESC'}
    </button>
  </div>
);

export default TaskSorter;
