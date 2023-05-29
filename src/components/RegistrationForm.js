import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if any required field is empty
    if (!fullName || !username || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = {
      fullName,
      username,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        toast.success('Registration successful');
        navigate('/');
      } else if (response.status === 409) {
        if (data.error === 'DuplicateUsername') {
          toast.error('Username already taken');
        } else if (data.error === 'DuplicateEmail') {
          toast.error('Email already taken');
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="registration-form-container">
      <div className="form-container">
        <h1 className="logo">DK</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button type="submit">Register</button>
          </div>
          <p>
            Already have an account? <Link to="/">Back to Login</Link>
          </p>
        </form>

        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      </div>
    </div>
  );
};

export default RegistrationForm;
