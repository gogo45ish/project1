import React from 'react';
import { useUser } from '../context/UserContext';
import { useProjects } from '../context/ProjectContext';


const UserProfile = () => {
  const { user } = useUser();
  const { completedTasks } = useProjects();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>User Name: {user.username}</p>
      <p>Number of Completed Tasks: {completedTasks}</p>
    </div>
  );
};

export default UserProfile;