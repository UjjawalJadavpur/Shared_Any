import React from 'react';
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function SignIn({ setUsername, email, password, setEmail, setPassword, socket }) {

    const handleKeyDownForLogin = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleLogin = async () => {
        if (email.trim() !== '' && password) {
            try {
                console.log("Entered in TRY block in SignIn");
                const response = await fetch("http://localhost:4004/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                console.log("just before response data.username :-  ", data.username);
                localStorage.setItem("user", JSON.stringify(data));
                
                if (response.ok) {
                    socket.emit('set_email', email);
                    setUsername(data.username);
                    console.log("inside response data.username :-  ", data.username);
                    alert(`Welcome ${data.username}`);
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.log("catch error in SignIn");
                alert('Error logging in');
            }
        } else {
            alert("Please Enter your Details");
        }
    };


    return (
        <div className="Login-form">
            <h3>Discover the Joy of Travelling on <strong>WanderTales</strong>!</h3><br></br>
            <div className="Login-input-container">
                <FontAwesomeIcon icon={faEnvelope} className="Login-input-icon" />
                <input
                    type="text"
                    className="Login-input-field"
                    value={email}
                    placeholder="Enter your Email-id"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="Login-input-container">
                <FontAwesomeIcon icon={faLock} className="Login-input-icon" />
                <input
                    type="password"
                    className="Login-input-field"
                    value={password}
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDownForLogin}
                />
            </div>
            <button className="login-button" onClick={handleLogin}>Log in</button>
            <h4>Take only memories, leave only footprints</h4>
        </div>
    );
}
export default SignIn;
