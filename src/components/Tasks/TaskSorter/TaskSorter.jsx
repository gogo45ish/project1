// src/components/TaskSorter.js
import React from 'react';
import './TaskSorter.css'; // Assuming your CSS file is named TaskSorter.css

const TaskSorter = ({ sortOrder, setSortOrder, sortDirection, toggleSortDirection }) => (
  <div className="task-sorter">
    <h3>Сортировка задач</h3>

    {/* Sort by dropdown */}
    <label>Сортировать по: </label>
    <select
      className="task-sorter-select"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="name">Имя</option>
      <option value="createdAt">Дата создания</option>
    </select>

    {/* Toggle Sort Direction button */}
    <button
      className="task-sorter-button"
      onClick={toggleSortDirection}
    >
      {sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию'}
    </button>
  </div>
);

export default TaskSorter;
