import { useEffect, useState } from "react";
import axios from 'axios';
import './Songs.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";

import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor'; // אייקון חיפוש

export const Songs = ({ arrSongs }) => {
  const user = useSelector((state) => state.user.userLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //1 - יצירת מצב עבור השירים
  const [SongsArr, setSongsArr] = useState([]);  

  //2 - יצירת מצב עבור טקסט החיפוש
  const [searchTerm, setSearchTerm] = useState('');

  //3 - פעולת useEffect להורדת שירים מהשרת
  useEffect(() => {
    axios.get("http://localhost:8000/Songs/getSongs").then(res => {
      console.log("res", res.data);
      setSongsArr(res.data);
    }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"));
  }, []); 

  //4 - פילטר לשירים לפי טקסט החיפוש
  const filteredSongs = SongsArr.filter((song) =>
    song.nameSong.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Div-All-Songs">
      <h1 className="h1Song">מאגר השירים</h1>
      <p id="text1">
      כאן תוכל למצוא מבחר שירים מהמובילים ביותר בעולם המוזיקה. 
      השירים שלנו הם מהפופולריים בקרב לקוחותינו בשל איכותם הגבוהה והביצוע המוזיקלי מהמקצועיים ביותר שיש.
      בואו נתחיל לעבוד. באפשרותך ללחוץ על השיר שאתה אוהב ותועבר לדף הפלייבקים שם נמצא הפלייבק המבוקש לחץ כעת על כפתור קנה עכשיו ותועבר לטופס תשלום.
      באפשרותך לבצע מספר רכישות פלייבקים בלחיצת כפתור.
      המערכת תזהה את הרכישה שלכם ותעביר אתכם לטופס תשלום באמצעות כרטיס האשראי שלכם.
      לאחר קליטת התשלום במערכת תקבלו את הפלייבק/ים שרכשתם לכתובת האימייל שלכם כפי שמופיע במערכת.
      </p>

      {/* שדה חיפוש עם אייקון בתוך תיבת הטקסט */}
      <div style={{ position: 'relative', width: '300px', margin: '30px auto' }}>
        <YoutubeSearchedForIcon 
          style={{ 
            position: 'absolute',   // מיקום האייקון בתוך התיבה
            left: '50px',            // מרחק מהקצה השמאלי של התיבה
            top: '50%',              // מיקום האייקון באמצע בגובה
            transform: 'translateY(-50%)',  // היכולת למרכז את האייקון בצורה מדויקת
            color: 'green'           // צבע האייקון
          }} 
        />
        <input
          type="text"
          placeholder="הקלד שם שיר לחיפוש..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 10px 10px 40px', // ריפוד פנימי - הוספנו ריפוד בצד שמאל למנוע חפיפות עם האייקון
            width: '70%',      // תופס את כל רוחב ה-div
            fontSize: '16px',   // גודל הטקסט
           // backgroundColor: '#4CAF50', // צבע רקע ירוק
            border: '3px solid green', // צבע גבול ירוק
            //color: 'white',     // צבע הטקסט לבן
            borderRadius: '4px', // קצוות מעוגלים
            display: 'block',   // הצגת תיבת הטקסט כבלוק
            marginBottom: '10px', // מרווח תחתון
            outline: 'none'      // להימנע מקו תחתון כחול אחרי שמקלידים
          }}
        />
      </div>

      {/* הצגת הודעה אם לא נמצאו תוצאות */}
      {filteredSongs.length === 0 && searchTerm && (
        <p style={{ color: "green", textAlign: "center", marginTop: "10px", marginLeft: "25px" }}>
            מצטערים, לא נמצאו שירים התואמים לחיפוש שלך.
        </p>
      )}

      {/* הצגת השירים אחרי סינון */}
      {filteredSongs.length > 0 ? (
        filteredSongs.map((s) => (
          <div className="song" key={s.id}>
            <h2>{s.nameSong}</h2>
            <p>{s.nameSinger}</p>
            <p>{s.lengthSongOrginal}</p>
            <audio src={'http://localhost:8000/public/songs/' + s.src} controls></audio>
            <Button
              style={{ borderColor: "green", color: "green", width: "92%", whiteSpace: 'nowrap' }}
              color="success"
              variant="outlined"
              endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }} />}
              onClick={() => { navigate("/Playback/"+s.nameSong+"/all") }}
            >
              לחץ למעבר לדף הפלייבקים
            </Button>
          </div>
        ))
      ) : (
        <></>  // כאן ניתן להוסיף הודעה במקרה שאין שירים תואמים
      )}

      {user && user.status === 1 && (
        <div className="Button2">
          <Button
            variant="outlined"
            style={{ borderColor: "green", color: "green" }}
            onClick={() => { navigate("/AddSong"); }}
          >
            <AddIcon /> הוספת שיר
          </Button>
        </div>
      )}
    </div>
  );
}

export default Songs;



// קוד מקור ללא אפשרות של חיפוש שירים

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import './Songs.css';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import { useNavigate } from 'react-router-dom';

// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from "react-redux";

// export const Songs = ({arrSongs}) => {
//     const user = useSelector((state) => state.user.userLoggedIn);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     //1
//     const [SongsArr, setSongsArr] = useState([]);  //הכנת מערך שיחזיר את השירים

//     //2
//     useEffect(() => {
//         axios.get("http://localhost:8000/Songs/getSongs").then(res => {
//             console.log("res", res.data);

//     //3
//             setSongsArr(res.data);
//         }).catch(err=>alert("התרחשה שגיאה בעת ההתחברות לשרת"))
//     }, [])   //הפונקציה תופעל כשהקומפוננטה עולה

//     return (<div className="Div-All-Songs">

//         <h1 className="h1Song">מאגר השירים</h1>
//         <p id="text1">כאן תוכל למצוא מבחר שירים מהמובילים בעולם המוזיקה. השירים שלנו הם מהפופולריים בקרב לקוחותינו בשל איכותם הגבוהה והביצוע המוזיקלי מהמקצועיים ביותר שיש. בואו נתחיל לעבוד. באפשרותך ללחוץ על השיר שאתה אוהב ותועבר לדף הפלייבקים שם נמצא הפלייבק המבוקש לחץ כעת על כפתור קנה עכשיו ותועבר לטופס תשלום. באפשרותך לבצע מספר רכישות פלייבקים בלחיצת כפתור. המערכת תזהה את הרכישה שלכם ותעביר אתכם לטופס תשלום באמצעות כרטיס האשראי שלכם. לאחר קליטת התשלום במערכת תקבלו את הפלייבק/ים שרכשתם לכתובת האימייל שלכם כפי שמופיע במערכת.</p>

//         {/* //4 */}
//         {SongsArr.map(   s =>
//             <div className="song">
//                 <h2>{s.nameSong}</h2>
//                 <p>{s.nameSinger}</p>
//                 <p>{s.lengthSongOrginal}</p>
//                 <audio src={'http://localhost:8000/public/songs/' + s.src} controls></audio>
//                 <Button style={{ borderColor: "green", color: "green", width: "92%", whiteSpace: 'nowrap' }} color="success" variant="outlined" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }}/>} onClick={() => { navigate("/Playback") }}>
//                  לחץ למעבר לדף הפלייבקים</Button>
//             </div>

//         )}

// {user && user.status == 1 && <div className="Button2"> <Button variant="outlined" style={{ borderColor: "green", color: "green" }} onClick={() => { navigate("/AddSong"); }}><AddIcon/> הוספת שיר</Button></div>}

//     </div>)
// }

// export default Songs;