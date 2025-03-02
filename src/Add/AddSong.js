import { useForm } from "react-hook-form";
import "./AddSong.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

export default function AddSong() {

    let { register, handleSubmit, formState: { errors } } = useForm();//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    const save = (data) => {
        console.log("data", data);

        //מכינים אובייקט שיודע להעביר גם מידע וגם קבצים לשרת
        const formData = new FormData();
        //מעתיקים אליו את המידע הרגיל לפי השמות של האינפוטים
        formData.append("nameSong", data.nameSong);
        formData.append("nameSinger", data.nameSinger);
        formData.append("lengthSongOrginal", data.lengthSongOrginal);
        //מעתיקים אליו גם את הקובץ שנבחר בטופס
        formData.append("file", data.file[0]);

        axios.post("http://localhost:8000/Songs/AddSongs", formData).then(res => {

            alert("השיר נוסף למערכת בהצלחה.")

        }).catch(err => {
            console.log(err);
            
            alert("שגיאה התרחשה בעת ניסיון הוספת שיר למערכת")
        })

    }
    console.log(errors)

    return <form className="add-Song" onSubmit={handleSubmit(save)}> 
        <div className="Add1">
            <h1 style={{marginRight:"7%", marginTop: "-20%"}} className="Add">הוספת שיר</h1>
        </div>
<br></br>

        <label>שם השיר
            <input type="text"  {...register("nameSong", { required: { value: true, message: "שם השיר הוא שדה חובה" } })} />
            {errors.nameSong && <span className="error-message">שגיאה בשם השיר</span>}</label>
        <br></br>

        <label>שם הזמר
            <input type="text" {...register("nameSinger", { required: { value: true, message: "שם הזמר הוא שדה חובה" } })} />
            {errors.nameSinger && <span className="error-message">שגיאה בשם</span>}</label>
        <br></br>

        <label>אורך שיר מקורי
            <input type="text" placeholder = "אורך שיר (HH:MM:SS)" {...register("lengthSongOrginal", {
                
                required: { value: true, message: "שדה חובה" },
                minLength: { value: 1, message: "ערך עד 20 תווים" },
                maxLength: { value: 10, message: "ערך מינימום הוא תו אחד ומעלה" },
            })} />
            {errors.lengthSongOrginal && <span className="error-message">שגיאה באורך השיר</span>}</label>
        <br></br>

        <label>הוסף את קובץ השיר

            <input type="file" {...register("file", {
                required: { value: true, message: "חובה העלאת קובץ שמע" },

            })} />
            {errors.file && <span className="error-message">{errors.file.message}</span>}</label>
        <br></br>

        <div style={{marginRight: "-5px", marginTop: "12%"}} className="button">
            <Button type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }}/>} >
                אישור הוספה
            </Button>
        </div>

    </form>
}