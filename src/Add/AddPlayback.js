import { useForm } from "react-hook-form";
import "./AddPlayback.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

export default function AddPlayback() {

    let { register, handleSubmit, formState: { errors } } = useForm();//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    const save = (data) => {
        console.log("data", data);

        //מכינים אובייקט שיודע להעביר גם מידע וגם קבצים לשרת
        const formData = new FormData();
        //מעתיקים אליו את המידע הרגיל לפי השמות של האינפוטים
        formData.append("namePlayBack", data.namePlayBack);
        formData.append("nameSinger", data.nameSinger);
        formData.append("price", data.price);
        formData.append("lengthPlayBack", data.lengthPlayBack);

        //מעתיקים אליו גם את הקובץ שנבחר בטופס
        formData.append("file", data.file[0]);

        axios.post("http://localhost:8000/playback/addPlayback", formData).then(res => {

            alert("הפלייבק נוסף למערכת בהצלחה. כעת ניתן לשמוע אותו וכן להוסיף לסל הקניות.")

        }).catch(err => {
            alert("שגיאה התרחשה בעת ניסיון הוספת פלייבק למערכת")
        })

    }
    console.log(errors)

    return <form className="add-Playback" onSubmit={handleSubmit(save)}>
        <div className="Addd">
            <h1 className="Add-P">הוספת פלייבק</h1></div>

        <label>שם הפלייבק
            <input type="text"  {...register("namePlayBack", { required: { value: true, message: "שם הפלייבק הוא שדה חובה" } })} />
            {errors.namePlayBack && <span className="error-message">שגיאה בשם הפלייבק</span>}</label>
        <br></br>

        <label>שם הזמר
            <input type="text"  {...register("nameSinger", { required: { value: true, message: "שם הפלייבק הוא שדה חובה" } })} />
            {errors.nameSinger && <span className="error-message">שגיאה בשם הזמר</span>}</label>
        <br></br>

        <label>מחיר
            <input type="number" {...register("price", {
                required: { value: true, message: "הכנס מחיר פלייבק" },
                min: { value: 65, message: "סכום הוא מינימום 65" },
                max: { value: 300, message: "סכום הוא מקסימום 300" },
            })} />
            {errors.price && <span className="error-message">{errors.price.message}</span>}</label>
        <br></br>

        <label>אורך הפלייבק
            <input type="time"  {...register("lengthPlayBack", { required: { value: true, message: "אורך הפלייבק הוא שדה חובה" } })} />
            {errors.lengthPlayBack && <span className="error-message">שגיאה באורך הפלייבק</span>}</label>
        <br></br>

        <label>הוסף את קובץ הפלייבק

            <input type="file" {...register("file", {
                required: { value: true, message: "חובה העלאת קובץ שמע" },

            })} />
            {errors.file && <span className="error-message">{errors.file.message}</span>}</label>
        <br></br>

        <div className="button">
            <Button style={{ marginLeft: "15%", marginTop: "0%" }} type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }} />} >
                אישור הוספה
            </Button>
        </div>

    </form>
}