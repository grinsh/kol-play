import { useForm } from "react-hook-form";
import "./MyInvitation.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import React, { useEffect, useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";


export default function OrderForm() {
const [name, setName] = useState("");


    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    const save = (data) => { 
      axios.post("http://localhost:8000/sendOrderEmail", data).then(res => {
      alert("ההזמנה נשמרה במערכת ונשלחה למנהלים. ניצור איתך קשר בהמשך." + data)
      }
      )
      .catch(err => { alert("קיימת תקלה זמנית במערכת.😞 נסה שוב במועד מאוחר יותר")})
    };
      
    console.log(errors)

    return <>
        <h1 id="a">הזמנת פלייבק אישי</h1>

    <form className="my-form" onSubmit={handleSubmit(save)} autoComplete="false">

        <label>שם המזמין
        <input type="text" {...register("UserName", { minLength: 2, maxLength: 15, required: true })}/>
        {errors.name && <span className="error-message">שגיאה בשם</span>}
        
        </label>
        <br></br>

        <label>אימייל
        <input type="email"  {...register("email")} /></label>
        <br></br>

        <label>מספר טלפון
        <input type="text" {...register("phone", {
            required: { value: true, message: "הכנס את מספר הטלפון שלך" },
            min: { value: 10, message: "מספר טלפון הוא מינימום 10 ספרות" },
            max: { value: 10, message: "מספר טלפון הוא מקסימום 10 ספרות" },
        })} />
        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
        </label>
        <br></br>

        <label>שם השיר
        <input type="text"  {...register("SongName", { required: { value: true, message: "שם הוא שדה חובה" } })} />
        {errors.name && <span className="error-message">שגיאה בשם</span>}</label>
        <br></br>

        <label>שם הזמר
        <input type="text"  {...register("SingerName", { required: { value: true, message: "שם הוא שדה חובה" } })} />
        {errors.name && <span className="error-message">שגיאה בשם</span>}</label>
        <br></br>

        <label>סכום
        <input type="number" {...register("sum", {
            required: { value: true, message: "הכנס טווח מחירים רצוי" },
            min: { value: 65, message: "סכום הוא מינימום 65" },
            max: { value: 300, message: "סכום הוא מקסימום 300" },
        })} />
        {errors.sum && <span className="error-message">{errors.sum.message}</span>}</label>
        <br></br>
        <label style={{whiteSpace: "nowrap", padding: "0", margin: "0"}}>אני מאשר/ת קבלת דואר במייל</label>
        {/* <input type="checkbox" {...register("isAgree")} /> */}

        <label style={{whiteSpace: "nowrap", display: "inline", marginRight: "5px", padding: "0", margin: "0"}}> <FormControlLabel control={<Checkbox defaultChecked color="success" />}/></label>
       <br></br>
        <div className="button">
        <Button style={{ marginLeft: "15%", marginTop: "-12%",width: "64%" }} type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }}/>}>
        שליחת הזמנה
      </Button>
      </div>
    </form>
    </>
}