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
    <h3>Фильтры задач</h3>
    <label>Фильтр по статусу: </label>
    <select
      className="task-filter-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">Все</option>
      <option value="completed">Выполненные</option>
      <option value="incomplete">Невыполненные</option>
    </select>

    {/* Search by Task Name */}
    <label>Поиск по названию: </label>
    <input
      className="task-filter-input"
      type="text"
      placeholder="Поиск по названию:"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* Date Range Filter */}
    <label>Диапазон дат: </label>
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



