import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './SignUp.css';

function SignUp({ username, email, password, setUsername, setEmail, setPassword }) {


  const handleRegister = async () => {
    if (!username || !password || !email) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch("http://localhost:4004/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        alert('Registered Successfully');
        setUsername('');
        setPassword('');
        setEmail('');
      }
      else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Error in SignUp:", error);
      alert(`Error registering: ${error.message}`);
    }
  };


  const handleKeyDownForRegistration = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRegister();
    }
  };

  return (
    <div className="Registration-form">
      <h3>Please enter your personal details below:</h3>
      <div className="Reg-input-container">
        <FontAwesomeIcon icon={faUser} className="Reg-input-icon" />
        <input
          type="text"
          className="Reg-input-field"
          value={username}
          placeholder="Enter the User Name"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="Reg-input-container">
        <FontAwesomeIcon icon={faEnvelope} className="Reg-input-icon" />
        <input
          type="email"
          className="Reg-input-field"
          value={email}
          placeholder="Enter your Email-id"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="Reg-input-container">
        <FontAwesomeIcon icon={faLock} className="Reg-input-icon" />
        <input
          type="password"
          className="Reg-input-field"
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDownForRegistration}
        />
      </div>
      <button className="register-button" onClick={handleRegister}>Register</button>
      <h4>Start your Journey with us</h4>
    </div>
  );
}
export default SignUp;
