import { useEffect, useState } from "react";
import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import './Playback.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor'; // אייקון חיפוש
import { savePlaybackToOrder } from "../Redux toolkit/features/User/UserSlice";

export const Playback = (props) => {


    const user = useSelector((state) => state.user.userLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { song, singer } = useParams();
    console.log(song);
    console.log(singer);

    //1
    const [playbackArr, setPlaybackArr] = useState([]);  // הכנת מערך שיחזיר את הפלייבקים
    const [filteredPlaybacks, setFilteredPlaybacks] = useState([]);  // מערך לסינון הפלייבקים
    const [searchQuery, setSearchQuery] = useState(""); // שדה חיפוש

    //2
    useEffect(() => {
        axios.get("http://localhost:8000/playback/getplayback").then(res => {
            console.log("res", res.data);
            //3
            setPlaybackArr(res.data);
            setFilteredPlaybacks(res.data); // מניחים שהסינון יתחיל על כל הפלייבקים
            if (singer!=-1)
                setFilteredPlaybacks(res.data.filter(pb => pb.nameSinger == singer || singer=="all"));
            if (song!=-1)
                setFilteredPlaybacks(res.data.filter(pb => pb.nameSong == song||song=="all"));
        }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
    }, [])   //הפונקציה תופעל כשהקומפוננטה עולה


    // פונקציה שתסנן את הפלייבקים לפי שם הפלייבק או שם הזמר
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // סינון הפלייבקים לפי שם הפלייבק או שם הזמר
        const filtered = playbackArr.filter(p =>
            p.namePlayBack.toLowerCase().includes(query.toLowerCase()) ||
            p.nameSinger.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPlaybacks(filtered); // עדכון התצוגה עם הפלייבקים המסוננים
    };

    // פונקציה לרכישת הפלייבק
    const BuyPlayBack = (playback) => {
        if (user == null)
            alert("כדי לרכוש פלייבקים באתר יש להתחבר. אנא התחבר כדי שתוכל להנות אצלנו.")
        else {
            alert("הינך מועבר לרכישת פלייבקים באתר")
            dispatch(savePlaybackToOrder(playback)) //שמירת הפלייבק ברידקס
            navigate("/Payment")
        }
    }

    return (
        <div className="Div-P">

            {/* כותרת והסבר */}
            <h1 className="h1Play-Play">הפלייבקים שלנו</h1>
            <p id="text">
                כאן תוכל למצוא מבחר פלייבקים מהמצוינים בשוק. הפלייבקים שלנו ידועים באיכותם הגבוהה ובביצוע מוזיקלי מהמקצועיים ביותר שיש.
                בואו נתחיל רכישת פלייבק. לחץ כעת על כפתור קנה עכשיו ותועבר לטופס תשלום. באפשרותך לבצע רכישת פלייבקים בלחיצת כפתור.
                המערכת תזהה את הרכישה שלכם ותעביר אתכם לטופס תשלום באמצעות כרטיס האשראי שלכם. לאחר קליטת התשלום במערכת תקבלו את הפלייבק/ים שרכשתם לכתובת האימייל שלכם כפי שמופיע במערכת.
            </p>

            {/* שדה חיפוש עם אייקון בתוך תיבת הטקסט */}
            <div style={{ position: 'relative', width: '300px', margin: '30px auto' }}>
                <YoutubeSearchedForIcon
                    style={{
                        position: 'absolute',
                        left: '50px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'green'
                    }}
                />
                <input
                    type="text"
                    placeholder="הקלד שם פלייבק לחיפוש..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        padding: '10px 10px 10px 40px',
                        width: '70%',
                        fontSize: '16px',
                        border: '3px solid green',
                        borderRadius: '4px',
                        display: 'block',
                        marginBottom: '10px',
                        outline: 'none'
                    }}
                />
            </div>

            {/* הודעה אם לא נמצאו תוצאות */}
            {filteredPlaybacks.length === 0 && searchQuery && (
                <p style={{ color: "green", textAlign: "center", marginTop: "10px", marginLeft: "25px" }}>
                    מצטערים, לא נמצאו פלייבקים התואמים לחיפוש שלך.
                </p>
            )}

            {/* הצגת הפלייבקים אחרי סינון */}
            <div className="playback-container">
                {filteredPlaybacks.map(p => (
                    <div className="playback" key={p.id} style={{ marginBottom: "20px" }}>
                        <h2>{p.namePlayBack}</h2>
                        <p> שם הזמר: {p.nameSinger}</p>
                        <p> מחיר: {p.price} ש"ח</p>
                        <p> אורך השיר: {p.lengthPlayBack}</p>
                        <audio src={'http://localhost:8000/public/playbacks/' + p.src} controls></audio>
                        {(user == null || user.status == 2) &&
                            <Button
                                style={{ borderColor: "green", color: "green" }}
                                color="success"
                                variant="outlined"
                                onClick={() => { BuyPlayBack(p) }}
                            >
                                <AddShoppingCartIcon /> קנה עכשיו
                            </Button>
                        }
                    </div>
                ))}
            </div>

            {user && user.status == 1 && (
                <div className="Button">
                    <Button
                        variant="outlined"
                        style={{ borderColor: "green", color: "green" }}
                        onClick={() => { navigate("/AddPlayback"); }}
                    >
                        <AddIcon /> הוספת פלייבק
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Playback;


// קוד מקור ללא אפשרות של חיפוש זמרים

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import './Playback.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";


// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import AddPlayback from "../Add/AddPlayback";
// // import AddPlayback from "../Add/AddPlayback";

// import AddIcon from '@mui/icons-material/Add';
// import { savePlaybackToOrder } from "../Redux toolkit/features/User/UserSlice";

// export const Playback = (props) => {

//     const user = useSelector((state) => state.user.userLoggedIn);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     //1
//     const [playbackArr, setPlaybackArr] = useState([]);  //הכנת מערך שיחזיר את הפלייבקים

//     //2
//     useEffect(() => {
//         axios.get("http://localhost:8000/playback/getplayback").then(res => {
//             console.log("res", res.data);
//             //3
//             setPlaybackArr(res.data);
//         }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
//     }, [])   //הפונקציה תופעל כשהקומפוננטה עולה

//     const BuyPlayBack = (playback) => {
//         if (user == null)
//             alert("כדי לרכוש פלייבקים באתר יש להתחבר. אנא התחבר כדי שתוכל להנות אצלנו.")
//         else {
//             alert("הינך מועבר לרכישת פלייבקים באתר")
//             dispatch(savePlaybackToOrder(playback)) //שמירת הפלייבק ברידקס
//             navigate("/Payment")
//         }
//     }

//     return (<div className="Div-P">

//         <h1 className="h1Play-Play">הפלייבקים שלנו</h1>
//         <p id="text">כאן תוכל למצוא מבחר פלייבקים מהמצוינים בשוק. הפלייבקים שלנו ידועים באיכותם הגבוהה ובביצוע מוזיקלי מהמקצועיים ביותר שיש. בואו נתחיל רכישת פלייבק. לחץ כעת על כפתור קנה עכשיו ותועבר לטופס תשלום. באפשרותך לבצע רכישת פלייבקים בלחיצת כפתור. המערכת תזהה את הרכישה שלכם ותעביר אתכם לטופס תשלום באמצעות כרטיס האשראי שלכם. לאחר קליטת התשלום במערכת תקבלו את הפלייבק/ים שרכשתם לכתובת האימייל שלכם כפי שמופיע במערכת.</p>
//         {playbackArr.map(p =>
//             <div className="playback">
//                 <h2>{p.namePlayBack}</h2>
//                 <p> שם הזמר: {p.nameSinger}</p>
//                 <p> מחיר: {p.price} ש"ח</p>
//                 <p> אורך השיר: {p.lengthPlayBack}</p>
//                 <audio src={'http://localhost:8000/public/playbacks/' + p.src} controls></audio>
//                 {/* {user && user.status == 1 ? (<div>
//                     <Button style={{ borderColor: "green", color: "green", marginLeft: "10%" }} color="success" variant="outlined" onClick={() => { alert("עריכת פלייבק"); }}><BorderColorIcon /> עריכה</Button>
//                     <Button style={{ borderColor: "green", color: "green" }} color="success" variant="outlined" onClick={() => { alert("מחיקת פלייבק"); }}><DeleteIcon /> מחיקה</Button>
//                 </div>) : <></>} */}
//                 {(user == null || user.status == 2) &&
//                     <Button style={{ borderColor: "green", color: "green" }} color="success" variant="outlined" onClick={() => { BuyPlayBack(p) }}>
//                     <AddShoppingCartIcon /> קנה עכשיו</Button>}
//             </div>

//         )}

//         {user && user.status == 1 && <div className="Button"> <Button variant="outlined" style={{ borderColor: "green", color: "green" }} onClick={() => { navigate("/AddPlayback"); }}><AddIcon/> הוספת פלייבק</Button></div>}
//         {/* {user && user.status == 1 ? (<p>delete</p>) : (<p>buy now</p>)} */}
//     </div>)

// }

// export default Playback;
