import React from 'react';
import { Button, TextField, Link } from '@mui/material';
import axios from "axios";

const LoginEmail = () => {

    const handleForgotPassword = () => {

        const email = prompt("הכנס כתובת אימייל לשחזור הסיסמא");
        
        axios.post("http://localhost:8000/email/sendNewPasswrodToEmail", { email: email }).then(res => {

            console.log(res.data);
        }).catch(err => { console.log(err); });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here

        alert("התחברות בוצעה בהצלחה!👍")
    };

    return (
        <div>
            {/* <h1>Login</h1> */}
            <form onSubmit={handleSubmit}>
                <TextField label="Email" type="email" required fullWidth />
                <TextField label="Password" type="password" required fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
            <Link onClick={handleForgotPassword} variant="body2">
                שכחת סיסמה?🤔
            </Link>
        </div>
    );
};

export default LoginEmail;


