import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import './Takanon.css';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './Takanon.css';

import { getTakanon, updateTakanon } from './TakanonApi';
import { useDispatch, useSelector } from "react-redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function Takanon() {

  const user = useSelector((state) => state.user.userLoggedIn);
  const [Takanonh, setTakanonh] = useState("תקנון האתר"); //יכיל את הכותרת שהגיעה מהשרת
  // const [Takanonp, setTakanonp] = useState(["הנהלת האתר רשאית לחסום או להפסיק לאלתר את גישת הגולש לשירות אם יפר את תנאי התקנון."]); //יכיל את מערך השורות שהגיע מהשרת
  //const [Takanonh, setTakanonh] = useState("טוען...  "); //יכיל את הכותרת שהגיעה מהשרת
  const [Takanonp, setTakanonp] = useState(["טוען...  "]); //יכיל את מערך השורות שהגיע מהשרת
  const [inUpdateStatus, setInUpdateStatus] = useState(false); //משתנה בוליאני שאומר האם התקנון במצב עריכה
  const [newText, setNewText] = useState(""); //משתנה שיכיל את השורות המעודכנות בתקנון במצב עריכה
  const navigate = useNavigate();

  useEffect(() => {
    getTakanon().then(res => {
      console.log("Res", res);  //data{h1,p}

      setTakanonh(res.data.h1);
      setTakanonp(res.data.p)


    }).catch(err => {
      console.log("err", err);
    })
  }, [])

  const updateNow = () => {
    console.log("הטקסט החדש הוא ", newText);
    //הטקסט החדש הוא מחרוזת עם ירידות שורה.
    //אנחנו רוצות להפוך אותו למערך של מחרוזות - כל שורה היא איבר במערך
    const textArr = newText.split("\n");
    console.log(textArr);

    //אובייקט לשליחה לשרת
    const newTakanon = {
      h1: "תקנון האתר",
      p: textArr
    }
    console.log(newTakanon);

    updateTakanon(newTakanon).then(res => {
      alert("התקנון עודכן בהצלחה");
     
     //אם התקנון התעדכן בהצלחה צריך להביא מחדש את הטקסט המעודכן.
      getTakanon().then(res => {
        console.log("Res", res);  //data{h1,p}

        setTakanonh(res.data.h1);
        setTakanonp(res.data.p)


      }).catch(err => {
        console.log("err", err);
      })


    }).catch(err => {
      console.log("err", err);
      alert("תקלה במערכת. נסה במועד מאוחר יותר")
    })
  }


  return (<>
    <div id="body">
      {inUpdateStatus == false ?
        <div id="divTakanon">
          <h2 id="h1Takanon">{Takanonh}</h2>
          <p id="takanon">
            {Takanonp.map(text => <>{text}<br /></>)}
          </p>
        </div> :
        <div id="divTakanonUpdate">
          <h2> ערוך את תוכן התקנון שלך </h2>
          <form>

            <textarea defaultValue={Takanonp.join("\n")} style={{ height: Takanonp.length * 20 + "px" }} onChange={e => {
              setNewText(e.target.value);
            }}>

            </textarea>
          </form>
        </div>}
      {/* </div></>)
} */}


      {/* // export default function Takanon() { 
//   const navigate = useNavigate();

//   return <>*/}
      {/* <h2>תקנון האתר</h2>
    <p id="takanon">הנהלת האתר רשאית לחסום או להפסיק לאלתר את גישת הגולש לשירות אם יפר את תנאי התקנון.
      <br></br>
      אין לעשות באתר או באמצעותו כל שימוש למטרות בלתי חוקיות.
      <br></br>
      השימוש באתר הוא לשימוש האישי והבלעדי של הגולש אשר אינו רשאי להעביר את הרשאת השימוש (דהיינו הפלייבק שנרכש)
      <br></br>
      לאולפן אחר או לצורך שימוש מסחרי ללא בקשת רשות מראש ואין אנו מתחייבים לאשר.
      <br></br>
      אמצעות הרכישה דרך האתר הינה באמצעות כרטיס אשראי.
      <br></br>
      במידה ולא אושר התשלום בכרטיס אשראי או שלא התקבל אישור העברה אין באחריותנו להעביר את הפלייבק שהוזמן עד לאחר שיוסדר התשלום במלואו.
      <br></br>
      כל המבצע/ת עסקה באתר רשאי/ת לבטל את העסקה במידה ואינו מעוניין, זאת לאחר יצירת קשר איתנו ובמידה ולא קיבל/ה את המוצר/שירות.
      <br></br>
      במידה והמוצר או השירות כבר הגיעו לידי הלקוח לא ניתן יהיה לבטל את העסקה.
      <br></br>
      מבצע הרכישה מצהיר בזאת שהינו בעל כרטיס אשראי בתוקף.<br></br>
      <br></br>
</p> */}
      {user != null && user.status == 1 &&
        <>
          {inUpdateStatus == false && <Button style={{ borderColor: "green", color: "green", marginLeft: "-2%", marginTop: "1%" }} color="success" variant="outlined" onClick={() => { setInUpdateStatus(true) }}><BorderColorIcon /> עריכת תקנון</Button>}
          {inUpdateStatus == true && <Button style={{ borderColor: "green", color: "green", marginLeft: "0%", marginTop: "1%" }} color="success" variant="outlined" onClick={() => { setInUpdateStatus(false); updateNow(); }}><AssignmentTurnedInIcon /> עדכן כעת </Button>}
          {/* <Button variant="contained" color="success" onClick={() => { alert("עריכת פלייבק"); }}><BorderColorIcon />
        עריכת תקנון
      </Button> */}
        </>
      }

      {user != null && user.status == 2 &&
        <>
          <Button style={{ width: "21%", whiteSpace: 'nowrap' }} variant="contained" color="success"
            style1={{ display: 'flex', justifyContent: 'center', marginRight: "15%" }}
            endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }} />} onClick={() => { navigate("/welcomeLogin") }}>
            התחברות לאתר
          </Button>


        </>
      }

    </div>
  </>
  )
}