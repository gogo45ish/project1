// TaskFilter.js
import React from 'react';
import './TaskFilter.css'; // Assuming your CSS file is named TaskFilter.css

const TaskFilter = ({
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => (
  <div className="task-filter">
    {/* Status Filter */}
    <h3>Filter Tasks</h3>
    <label>Filter by Status: </label>
    <select
      className="task-filter-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="completed">Completed Only</option>
      <option value="incomplete">Incomplete Only</option>
    </select>

    {/* Search by Task Name */}
    <label>Search Task: </label>
    <input
      className="task-filter-input"
      type="text"
      placeholder="Search by Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* Date Range Filter */}
    <label>Created Between: </label>
    <input
      className="task-filter-date"
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
    <input
      className="task-filter-date"
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>
);

export default TaskFilter;
