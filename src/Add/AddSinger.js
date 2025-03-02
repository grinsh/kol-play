import { useForm } from "react-hook-form";
import "./AddSinger.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import React from "react";


export default function AddSinger() {

    let { register, handleSubmit, formState: { errors } } = useForm();//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    const addSinger = async (data) => {
        try {
            const formData = new FormData();
            formData.append("nameSinger", data.nameSinger);
            formData.append("file", data.file[0]);

            const res = await axios.post("http://localhost:8000/singers/addSingers", formData);
            alert("הזמר נוסף למערכת בהצלחה. כעת ניתן להעלות קבצי שמע לקטגוריה זו.");
        } catch (err) {
            console.error(err); // כדי לראות את השגיאה בקונסול
            alert("שגיאה התרחשה בעת ניסיון הוספת זמר למערכת");
        }
    };

    return <form className="add-Singer" onSubmit={handleSubmit(addSinger)}>

        <div className="all">
            <h1 style={{ marginLeft: "2.5%", marginTop: "-8%" }} className="Add-S">הוספת זמר</h1>
            <div className="text">
                <label>שם הזמר
                    <input type="text"
                        {...register("nameSinger", { required: { value: true, message: "שם הוא שדה חובה" } })} />
                    {errors.nameSinger && <span className="error-message">שגיאה בשם</span>}</label>
                <br></br>

                <label>העלאת תמונה
                    <input type="file"

                        {...register("file", {
                            required: { value: true, message: "חובה העלאת תמונה" },

                        })} />
                    {errors.file && <span className="error-message">{errors.file.message}</span>}</label>
                <br></br>
            </div>
            <div className="button">
                <Button style={{ marginTop: "-15%" }} type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }} />}>
                    אישור הוספה
                </Button>
            </div>
        </div>

    </form>
}