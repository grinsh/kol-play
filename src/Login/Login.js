import './Login.css';
import Button from '@mui/material/Button';
import axios from 'axios';

// import { Form, set } from 'react-hook-form';
// import { Route, Routes } from 'react-router-dom';
// import RegistrationForm from './RegistrationForm';
// import User from '../screens/User';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserLoggedIn } from '../Redux toolkit/features/User/UserSlice';
import { useDispatch } from 'react-redux';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  let dispatch = useDispatch()



  const handleLogin = () => {

//  console.log("arriveToLogin")

    axios.post("http://localhost:8000/User/Login", { email: email, password: password }).then(res => {

      // console.log(res.data);
      if (res.data.user == null)
        alert("אחד הפרטים שהוזנו שגוי");
      else {
        dispatch(onUserLoggedIn(res.data.user))
        alert("ברוך שובך " + res.data.user.name);
        nav("/Songs");
      }
      ;
    }).catch(err => { throw err; })
    console.log('Logging in with email:', email, 'and password:', password);
  };

  return (
    <div className='a'>
      <input
        type="text"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <br></br>

      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* {/* <button onClick={handleLogin}>Login</button> */}
      <br></br>
      <br></br>
      <Button variant="contained" color="success" onClick={() => { handleLogin() }}>
      <ArrowBackIcon/> התחברות
      </Button>
    </div>
  );
};


export default Login;