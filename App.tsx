import React, { useState } from 'react';
import Layout from './components/Layout';
import RoleSelection from './components/RoleSelection';
import ScholarDashboard from './components/ScholarDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard';
import AiAssistant from './components/AiAssistant';
import { UserRole } from './types';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.GUEST);

  const handleRoleSelect = (role: UserRole) => {
    // In a real app, this would trigger authentication/registration flow
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentRole(UserRole.GUEST);
  };

  return (
    <Layout role={currentRole} onLogout={handleLogout}>
      {currentRole === UserRole.GUEST && (
        <RoleSelection onSelect={handleRoleSelect} />
      )}
      
      {currentRole === UserRole.SCHOLAR && (
        <>
          <ScholarDashboard onBack={() => {}} />
          <AiAssistant />
        </>
      )}

      {currentRole === UserRole.PROVIDER && (
        <>
          <ProviderDashboard />
          <AiAssistant />
        </>
      )}

      {currentRole === UserRole.ADMIN && (
        <AdminDashboard />
      )}
    </Layout>
  );
};

export default App;