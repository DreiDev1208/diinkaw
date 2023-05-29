import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Main from './components/Main';
import AccountSettings from './components/AccountSettings';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
