 import "./Welcome.css";
 import * as React from 'react';
//  import Button from '@mui/material/Button';
 import Login from "./Login";
//  import { Link } from "@mui/material";
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

 export default function Welcome () { 
  return<>
  <h1 className="h1welcome" style={{position:"relative", textAlign:"center"}}>ברוך שובך</h1>
     <Login />
     
      <br></br>
     
       <h3>לא רשום? עבור ל<Link to="/welcomeRegister">הרשמה</Link></h3>
       </>
   }