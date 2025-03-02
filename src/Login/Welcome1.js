import "./Welcome1.css";
import * as React from 'react';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RegistrationForm1 from "./RegistrationForm1";

// import { useNavigate } from 'react-router-dom';
// const nav = useNavigate();

export default function Welcome1 (){
    
    return<>
    <div className="h1">
        <h1 className="h1welcome1">ברוכים הבאים לאתר Kol-Play</h1>
        </div>
        <RegistrationForm1 />
        {/* <div className="h3"> */}
        {/* <h3 className="h3welcome1">כבר רשום? עבור ל<Link to="/welcomeLogin" className="Adi-Amir">התחברות</Link></h3> */}
        <h3 className="h3welcome1">כבר רשום? עבור ל<Link to="/welcomeLogin" style={{marginTop: "-1px", marginRight: "0px", color:"green"}}>התחברות</Link></h3>
     
        {/* </div> */}
    </>
}