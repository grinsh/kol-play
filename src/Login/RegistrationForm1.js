import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './RegistrationForm1.css';
import Takanon from '../generalScreens/Takanon';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

const RegistrationForm = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [tz, setTz] = useState('');
  const [phone, setPhone] = useState('');
  // const [password, setPassword] = useState('');
  
  // const handleRegistration = () => {
  //   //?API איך מבצעים כאן קריאת
  //   console.log('Registering new user with username:', username, ', email:', email, 'and password:', password);
  // };
  const navigate = useNavigate();
  const save=() =>{
    console.log(name + ' ' + email)
  
  axios.post("http://localhost:8000/User/addUser", { name: name, email: email, tz: tz, phone: phone }).then(res => {
    alert("נשלחה סיסמה למייל אנא המתן ובדוק בתיבת האימייל שלך האם קיבלת סיסמה")
    navigate("/welcomeLogin")
    console.log(res.data);
    
  
  }).catch(err => { throw err; })}
  return (
    <div className='textbox'>
      <div className='enter'>
      <input
        type="text"
        placeholder="שם משתמש"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <br></br>
      <br></br>
      <input
        type="email"
        placeholder="הכנס מייל ואנו נשלח לך סיסמה"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <br></br>
      <input
        type="tz"
        placeholder="הכנס מספר תעודת זהות"
        value={tz}
        onChange={(e) => setTz(e.target.value)}
      /> 
      <br></br>
      <br></br>
      <input
        type="phone"
        placeholder="הכנס מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /> 
      <br></br>
      <br></br>
      <Button style={{marginRight: "15px"}} variant="contained" color="success" endIcon={<MarkEmailUnreadIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }}/>} onClick={()=>{save()}}>
        שלח לי סיסמה למייל
      </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;