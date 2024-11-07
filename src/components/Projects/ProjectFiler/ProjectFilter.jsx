import React from 'react';
import './ProjectFilter.css';

const ProjectFilter = ({
  taskMinCount,
  setTaskMinCount,
  taskMaxCount,
  setTaskMaxCount,
  searchName,
  setSearchName,
  dateRange,
  setDateRange
}) => {
  return (
    <div className="project-filter">
      <h3>Filters</h3>
  
      {/* Filter by Task Completion Count */}
      <label>
        Completed Tasks Range:
        <input
          type="number"
          placeholder="Min"
          value={taskMinCount}
          onChange={(e) => setTaskMinCount(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max"
          value={taskMaxCount === Infinity ? '' : taskMaxCount}
          onChange={(e) => setTaskMaxCount(e.target.value ? Number(e.target.value) : Infinity)}
        />
      </label>
  
      {/* Filter by Project Name */}
      <label>
        Project Name:
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
  
      {/* Filter by Creation Date Range */}
      <label>
        Date Range:
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
        />
      </label>
    </div>
  );
};

export default ProjectFilter;
