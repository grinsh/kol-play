// import { useForm } from "react-hook-form";
// import './InvitationUser.css';
// import Button from '@mui/material/Button';
// // import { useNavigate } from 'react-router-dom';
// import SendIcon from '@mui/icons-material/Send';
// import axios from "axios";
// // import buttonAdd from './Add/buttonAdd';

// export default function InvitationUser() {

//     let { register, handleSubmit, formState: { errors } } = useForm();//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

//     const save = (data) => {
//         console.log("data", data);

//         //מכינים אובייקט שיודע להעביר גם מידע וגם קבצים לשרת
//         const formData = new FormData();
//         //מעתיקים אליו את המידע הרגיל לפי השמות של האינפוטים
//         // formData.append("idSong", data.idSong);
//         formData.append("nameSong", data.nameSong);
//         formData.append("nameSinger", data.nameSinger);
//         formData.append("lengthSongOrginal", data.lengthSongOrginal);
//         //מעתיקים אליו גם את הקובץ שנבחר בטופס
//         formData.append("file", data.file[0]);

//         axios.post("http://localhost:8000/Songs/AddSong", formData).then(res => {

//             alert("השיר נוסף למערכת בהצלחה.")

//         }).catch(err => {
//             alert("שגיאה התרחשה בעת ניסיון הוספת שיר למערכת")
//         })

//     }
//     console.log(errors)
//     // const navigate = useNavigate();

//     return <form className="add-Song" onSubmit={handleSubmit(save)}>
//         <div className="Add1">
//             <h1 style={{ marginRight: "-100%", marginTop: "-20%" }} className="Add">ניהול הזמנות משתמשים</h1>
//         </div>
//         <br></br>

//         <label>שם המזמין
//             <input type="text"  {...register("InvitationName", { required: { value: true, message: "שם המזמין הוא שדה חובה" } })} />
//             {errors.InvitationName && <span className="error-message">שגיאה בשם המזמין</span>}</label>
//         <br></br>

//         <label>אימייל
//             <input type="text" {...register("email", { required: { value: true, message: "אימייל הוא שדה חובה" } })} />
//             {errors.nameSinger && <span className="error-message">שגיאה בשם</span>}</label>
//         <br></br>
//         {/* <label>קוד השיר
//                 <input type="text"  {...register("idSong", { required: { value: true, message: "שם השיר הוא שדה חובה" } })} />
//                 {errors.idSong && <span className="error-message">שגיאה בקוד השיר</span>}</label>
//             <br></br> */}

//         <label>אורך שיר מקורי
//             <input type="time" {...register("lengthSongOrginal", {
//                 required: { value: true, message: "שדה חובה" },
//                 minLength: { value: 1, message: "ערך עד 20 תווים" },
//                 maxLength: { value: 10, message: "ערך מינימום הוא תו אחד ומעלה" },
//             })} />
//             {errors.lengthSongOrginal && <span className="error-message">שגיאה בקוד הזמר</span>}</label>
//         <br></br>

//         <label>הוסף את קובץ השיר

//             <input type="file" {...register("file", {
//                 required: { value: true, message: "חובה העלאת קובץ שמע" },

//             })} />
//             {errors.file && <span className="error-message">{errors.file.message}</span>}</label>
//         <br></br>

//         {/* <buttonAdd/> */}
//         <div style={{ marginRight: "-5px", marginTop: "12%" }} className="button">
//             <Button type="submit" variant="contained" color="success" endIcon={<SendIcon />} >
//                 אישור הוספה
//             </Button>
//         </div>

//     </form>
// }

import { useEffect, useState } from "react";
import axios from 'axios';
import './InvitationUser.css';


//---------------מה שהעתקתי
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

export const User = () => {

  //1
  const [UserArr, setUserArr] = useState([]);  //הכנת מערך שיחזיר את הפלייבקים

  //2
  useEffect(() => {
    axios.get("http://localhost:8000/ordersongs/getordersongs").then(res => {
      console.log("res", res.data);
      //3
      setUserArr(res.data);
    }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
  }, [])   //הפונקציה תופעל כשהקומפוננטה עולה


  return (
    <div className="Div-All">
      <div>
        <h1 className="h1User">ניהול הזמנות משתמשים</h1>
        <p id="text2">שלום משתמש מנהל! באפשרותך לצפות בהזמנות פלייבק אישי של משתמשים רשומים לאתר שהתבצעו לאחרונה באתר שלך.</p>
        <div className="usersDiv">
          {UserArr.map((u) => (
            <div key={u.id} >
              <div>
                <BasicCard {...u} />
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>)
}
export default User;

//----------------------------מה שהעתקתי-------------------------

const bull = (

  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

function BasicCard({ InvitationName, email, phone, dateOrder, namePlayBack, lengthPlayBack, nameSinger }) {
  const navigate = useNavigate();

  return (
    <div className="user">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
            פרטי הזמנת משתמש
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
            {bull} שם המזמין: {InvitationName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            כתובת מייל: {email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            טלפון: {phone}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            תאריך הזמנה: {dateOrder}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            שם הפלייבק: {namePlayBack}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            אורך הפלייבק: {lengthPlayBack}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            שם הזמר: {nameSinger}
          </Typography>
        </CardContent>
      </Card>

    </div>
  );
}