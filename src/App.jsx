import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProjectList from './components/Projects/ProjectList/ProjectList';
import TaskList from './components/Tasks/TaskList/TaskList';
import { ProjectsProvider } from './context/ProjectContext';
import { UserProvider } from './context/UserContext';
import { TasksProvider } from './context/TasksContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserProfile from './components/UserProfile';


const App = () => {
  return (
    <UserProvider>
      <ProjectsProvider>
        <TasksProvider>
          <Router>
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/projects" element={<ProtectedRoute element={<ProjectList />} />} />
              <Route path="/projects/:id/tasks" element={<ProtectedRoute element={<TaskList />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </TasksProvider>
      </ProjectsProvider>
    </UserProvider>
  );
};

export default App;
