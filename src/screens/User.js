import { useEffect, useState } from "react";
import axios from 'axios';
import './User.css';


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
    axios.get("http://localhost:8000/User/getuser").then(res => {
      console.log("res", res.data);
      //3
      setUserArr(res.data);
    }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
  }, [])   //הפונקציה תופעל כשהקומפוננטה עולה

  return (
    <div className="Div-All">
    <div>
      <h1 className="h1User">ניהול משתמשים</h1>
      <p id="text2">שלום משתמש מנהל! באפשרותך לצפות בנתוני המשתמשים הקיימים והמשתמשים החדשים שהצטרפו לאתר.</p>
      {/* <div className="usersDiv">
        {UserArr.map(u =>
          <BasicCard {...u} />
        )} */}
       <div>
        {UserArr.length === 0 ? (
          <h1>There is no users</h1>
        ) : (
          UserArr.map((u) => (
            <div key={u.id} >
              <div className="usersDiv">
                <BasicCard {...u} />
              </div>
            </div>
          ))
        )}
      {/* </div> */}
        
      </div></div>

     
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

function BasicCard({ id, name, phone, email, password, tz, status }) {
  const navigate = useNavigate();

  return (
    <div className="user">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            פרטי משתמש
          </Typography>
          <Typography variant="h5" component="div">
            {bull} שם: {name}
          </Typography>
          <br></br>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            תעודת זהות: {tz}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            טלפון: {phone}
          </Typography>
          <Typography variant="body2">
            {/* הרב קוק 16 ירושלים. */}
            {/* <br /> */}
            {/* {'052-7648520'} */}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">ראה עוד</Button>
        </CardActions> */}
{/* <div className="button">
<Button style={{ borderColor: "green", color: "green" }} color="success" variant="outlined" endIcon={<SendIcon />} onClick={() => { navigate("/user") }}>
        לחץ לצפיה בפרטי המשתמש</Button>
        </div> */}
      </Card>
      
    </div>
  );
}