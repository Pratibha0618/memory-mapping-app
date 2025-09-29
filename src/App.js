import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapComponent from './components/Map';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

import Timeline from './components/Timeline';
import ViewToggle from './components/ViewToggle';

import SharedMemories from './components/SharedMemories';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation is now handled in AuthContext
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '10px',
        left: '50px',
        zIndex: 1000,
        backgroundColor: '#1976d2',
        color: 'white',
      }}
    >
      Logout
    </Button>
  );
}

function ProtectedMapView({ memories, onAddMemory, onEditMemory, onDeleteMemory, onClearAll }) {
  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <LogoutButton />
      <ViewToggle />
      <MapComponent
        memories={memories}
        onAddMemory={onAddMemory}
        onEditMemory={onEditMemory}
        onDeleteMemory={onDeleteMemory}
      />
      <button
        onClick={onClearAll}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '8px 16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        Clear All Memories
      </button>
    </Box>
  );
}

function AppContent() {
  const [memories, setMemories] = useState(() => {
    const savedMemories = localStorage.getItem('memories');
    return savedMemories ? JSON.parse(savedMemories) : [];
  });

  const [nextId, setNextId] = useState(() => {
    const savedNextId = localStorage.getItem('nextId');
    return savedNextId ? parseInt(savedNextId) : 1;
  });

  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('nextId', nextId.toString());
  }, [nextId]);

  const handleAddMemory = (memory) => {
    const newMemory = {
      ...memory,
      id: nextId,
      userId: user?.uid,
      createdAt: new Date().toISOString(),
    };
    setMemories([...memories, newMemory]);
    setNextId(nextId + 1);
  };

  const handleEditMemory = (id, updatedMemory) => {
    console.log('Editing memory: ', id, updatedMemory);
    setMemories(prevMemories => prevMemories.map(memory =>
      memory.id === id
        ? {
          ...memory,
          ...updatedMemory,
          id,
          updatedAt: new Date().toISOString()
        }
        : memory
    ));
  };


  const handleDeleteMemory = (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      setMemories(memories.filter(memory => memory.id !== id));
    }
  };

  const handleClearAllMemories = () => {
    if (window.confirm('Are you sure you want to delete all memories? This cannot be undone.')) {
      setMemories([]);
      setNextId(1);
      localStorage.removeItem('memories');
      localStorage.removeItem('nextId');
    }
  };

  const userMemories = memories.filter(memory => memory.userId === user?.uid);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <ProtectedMapView
              memories={userMemories}
              onAddMemory={handleAddMemory}
              onEditMemory={handleEditMemory}
              onDeleteMemory={handleDeleteMemory}
              onClearAll={handleClearAllMemories}
            />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <Timeline
              memories={userMemories}
              onEditMemory={handleEditMemory}
              onDeleteMemory={handleDeleteMemory}
            />
          </ProtectedRoute>
        }
      />



      <Route path="/shared-memories/:ids" element={<SharedMemories />} />




    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
