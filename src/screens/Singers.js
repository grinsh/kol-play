import { useEffect, useState } from "react";
import axios from 'axios';
import './Singers.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor'; // אייקון חיפוש

export const Singers = () => {

    const [SingersArr, setSingersArr] = useState([]);  // הכנת מערך שיחזיר את הזמרים
    const [filteredSingers, setFilteredSingers] = useState([]);  // מערך לסינון הזמרים
    const [searchQuery, setSearchQuery] = useState(""); // שדה חיפוש
    const user = useSelector((state) => state.user.userLoggedIn);
    const navigate = useNavigate();

    // שימוש ב-axios כדי להביא את רשימת הזמרים
    useEffect(() => {
        axios.get("http://localhost:8000/singers/getSingers").then(res => {
            console.log("res", res.data);
            setSingersArr(res.data);
            setFilteredSingers(res.data); // מניחים שהסינון יתחיל על כל הזמרים
        }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
    }, []);

    // פונקציה שתסנן את הזמרים לפי שם הזמר
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // סינון הזמרים לפי השם
        const filtered = SingersArr.filter(si =>
            si.nameSinger.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSingers(filtered); // עדכון התצוגה עם הזמרים המסוננים
    };

    return (
        <div className="Div-All-Singers">
            {/* כותרת "זמרים" מעל שדה החיפוש */}
            <div className="s1">
                <h1 className="h1Singers">זמרים</h1>
            </div>

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
                    placeholder="הקלד שם זמר לחיפוש..."
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
            {filteredSingers.length === 0 && searchQuery && (
                <p style={{ color: "green", textAlign: "center", marginTop: "10px", marginLeft: "25px" }}>
                    מצטערים, לא נמצאו זמרים התואמים לחיפוש שלך.
                </p>
            )}

            {/* הצגת הזמרים אחרי סינון */}
            <div className="s2">
                {filteredSingers.length > 0 ? (
                    filteredSingers.map(si => (
                        <div className="Singer" key={si.idSinger}>
                            <h3> שם הזמר: {si.nameSinger}</h3>
                            <p> id זמר: {si.idSinger}</p>
                            <img
                                className="img-P"
                                style={{ height: "200px", width: "270px", marginTop: "0%", position: "relative" }}
                                src={'http://localhost:8000/public/singers/' + si.src}
                                alt={si.nameSinger}
                            />
                            {user && user.status === 1 && (
                                <div className="Button-Delete">
                                    <IconButton style={{ color: "green", marginTop: "-91vh", marginRight: "42vh" }} aria-label="delete" size="large">
                                        {/* <DeleteIcon fontSize="inherit" onClick={() => { alert("מחיקה"); }}/> */}
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <></>  // אם אין תוצאות להציג
                )}
            </div>

            {user && user.status === 1 && (
                <div className="Button1">
                    <Button
                        variant="outlined"
                        style={{ borderColor: "green", color: "green" }}
                        onClick={() => { navigate("/AddSinger"); }}
                    >
                        <AddIcon /> הוספת זמר
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Singers;



// קוד מקור ללא אפשרות של חיפוש זמרים

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import './Singers.css';
// import AddIcon from '@mui/icons-material/Add';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { useSelector } from "react-redux";
// // import AddSinger from './Add/AddSinger';
// // import AddSinger from './AddSinger';
// // import AddSinger from './Add/AddSinger';
// // import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import DeleteIcon from '@mui/icons-material/Delete';


// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';

// export const Singers = () => {

//     //1
//     const [SingersArr, setSingersArr] = useState([]);  //הכנת מערך שיחזיר את הזמרים
//     const user = useSelector((state) => state.user.userLoggedIn);

//     const navigate = useNavigate();

//     //2
//     useEffect(() => {
//         axios.get("http://localhost:8000/singers/getSingers").then(res => {
//             console.log("res", res.data);
//             //3
//             setSingersArr(res.data);
//         }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
//     }, [])   //הפונקציה תופעל כשהקומפוננטה עולה

//     return (<div>
//         <div className="s1">
//             <h1 className="h1Singers">זמרים</h1>
//         </div>

//         <div className="s2">
//             {SingersArr.map(si =>
//                     <div className="Singer">
//                         <h3> שם הזמר: {si.nameSinger}</h3>
//                         <p> id זמר: {si.idSinger}</p>
//                         <img className="img-P" 
//                         style={{height: "200px", width:"270px", marginTop: "0%", position: "relative"}} 
//                         src={'http://localhost:8000/public/singers/'+si.src}/>
//         {user && user.status==1&& <div className="Button-Delete">
//             <IconButton style={{ color: "green", marginTop: "-91vh", marginRight: "42vh"}} aria-label="delete" size="large">
//                 {/* <DeleteIcon fontSize="inherit" onClick={() => { alert("מחיקה"); }}/> */}
//                     </IconButton></div>}
//                     </div>
//             )}
//         </div>
//         {user && user.status == 1 && <div className="Button1"> <Button variant="outlined" style={{ borderColor: "green", color: "green" }} onClick={() => { navigate("/AddSinger"); }}><AddIcon/> הוספת זמר</Button></div>}
          
//     </div>)
// }

// export default Singers;