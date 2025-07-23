import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import AdminLayout from './layouts/AdminLayout';


import ProtectedRoute from './hooks/ProtectedRoute';

// Admin pages
const Dashboard = () => <div>Welcome to Dashboard</div>;
function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            
              <AdminLayout PageComponent={Dashboard} />
            
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
