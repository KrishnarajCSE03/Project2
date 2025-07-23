import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './hooks/ProtectedRoute';

import Dashboard from './pages/Admin/Dashboard/Dashboard'; // 👈 Make sure this is your new dashboard page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin protected routes */}
        <Route
          path="/admin/*"
          element={
            // You can wrap with ProtectedRoute if it's implemented, else keep it simple for now
            <AdminLayout />
          }
        >
          <Route index element={<Dashboard />} />
          {/* More admin routes can be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
