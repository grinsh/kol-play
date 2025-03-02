import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import './NavBar.css'
import { useDispatch, useSelector } from "react-redux";
import { onUserLoggedOut } from "../Redux toolkit/features/User/UserSlice";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendar';


// ----------------
export default function NavBar() {


  const user = useSelector((state) => state.user.userLoggedIn);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return <nav className="nav1">


    <ul className="button-container">

      {/* אם אף אחד לא מחובר */}
      {user == null && <li>
        <Link to="/welcomeRegister"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><ArrowBackIcon />התחברות</Button></Link>
      </li>}
      {/* אם מישהו מחובר (מנהל/משתמש רגיל/משתמש אורח) */}
      {user != null &&
        <li><Button style={{ borderColor: "white", color: "white" }} onClick={() => { dispatch(onUserLoggedOut()); nav("/"); }} variant="outlined"><ArrowForwardIcon />התנתקות</Button> </li>}
      {user != null && user.status == 1 &&
        <li>
          <Link to="user"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><PersonIcon />משתמש</Button></Link>
        </li>
      }
      {/* <li>
        <Link to="Takanon"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><AssignmentIcon/>תקנון</Button></Link>
      </li> */}

      <li>
        <Link to="playBack/all/all"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><AudioFileIcon />פלייבק</Button></Link>
      </li>

      <li>
        <Link to="singers"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><SettingsVoiceIcon />זמרים</Button></Link>
      </li>

      <li>
        <Link to="songs"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><LibraryMusicIcon />שירים</Button></Link>
      </li>


      {/* {(user == null || user.status == 2) && <> </> אם אין אף משתמש מחובר או שהמשתמש שמחובר הוא רגיל */}
      {/* {user!=null && <></>}   אם יש מישהו מחובר (מנהל או רגיל) */}
      {user != null && user.status == 2 &&/* אם משתמש רגיל מחובר*/
        <>
          <li>
            <Link to="invitation"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><ArtTrackIcon />הזמנות</Button></Link>
          </li>

          <li className="aa">
            <Link to="MyInvitation"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><ArticleIcon />הזמנה אישית</Button></Link>
          </li>
        </>
      }


      {user != null && user.status == 1 &&/**אם מנהל מחובר */
        <>

          <li className="line">
            <Link to="invitation"><Button style={{ borderColor: "white", color: "white" }} variant="outlined"><AssignmentIcon />ניהול הזמנות משתמשים</Button></Link>
          </li>
          <li className="line">
            <Link to="advertising"><Button style={{ borderColor: "white", color: "white" }} variant="outlined">העלאת פרסומת  </Button></Link>
          </li>

        </>
      }

    </ul>
    <ul className="users">
      {/* משתמש מנהל */}
      {user && user.status && user.status == 1 && (
        <>
          <div className="user-M">
          <Link to="/diary"> <Button style={{ borderColor: "white", color: "white",margin:"10px"}} variant="outlined">
              <EditCalendarOutlinedIcon />
            </Button></Link>
            <Button style={{ borderColor: "white", color: "white" }} variant="outlined">
              משתמש מנהל {user.name}<ManageAccountsIcon />
            </Button>
          </div>
        </>
      )}

      {/* משתמש רגיל */}
      {user && user.status && user.status == 2 && (
        <>
          <div className="user-R">
            <Button style={{ borderColor: "white", color: "white" }} variant="outlined">
              {user.name} <PersonIcon />
            </Button>
          </div>
        </>
      )}

    </ul>

  </nav>

}