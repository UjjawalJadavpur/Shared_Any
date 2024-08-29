import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const socket = io("http://localhost:4004/");

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setisSignIn] = useState(true);

  return (
    <div className="App">
      <div className='form-container'>

        <div className='Button-container'>
          <button className={`button ${isSignIn ? 'active' : ''}`} onClick={() => setisSignIn(true)} >Sign In</button>
          <button className={`button ${!isSignIn ? 'active' : ''}`} onClick={() => setisSignIn(false)} >Sign Up</button>

        </div>
        {isSignIn ? <SignIn
          setUsername={setUsername}
          email={email} password={password}
          setEmail={setEmail} setPassword={setPassword}
          socket={socket}
        /> :
          <SignUp
            username={username} email={email} password={password}
            setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} />}
      </div>
    </div>
  );
}
export default App;
