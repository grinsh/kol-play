import { useForm } from "react-hook-form";
import "./Payment.css";
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Payment() {
    const [name, setName] = useState("");
    const user = useSelector(state => state.user.userLoggedIn)
    const playback = useSelector(state => state.user.playbackToOrder)

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    const save = (data) => {
        alert("התשלום נקלט בהצלחה! תודה שקניתם אצלנו. נשמח לראותכם שוב.")
        const NewOrder = {
            idOrder: 0,
            dateOrder: new Date().toISOString().split('T')[0],
            idUser: user.id,
            idPlayBack: playback.idPlayBack,
            nameUser: user.name,
            namePlayBack: playback.namePlayBack
        }
        console.log('NewOrder', NewOrder)
        axios.post("http://localhost:8000/order/addOrder", NewOrder).then(res => {
            const body = {
                UserName: user.name,
                email: user.email,
                namePlayBack: playback.namePlayBack,
                src: playback.src
            };
            axios.post("http://localhost:8000/sendNewPlayBack", body).then(res => {
                alert("פרטי ההזמנה שלך נקלטו במערכת בהצלחה. קובץ הפלייבק נשלח לתיבת האימייל שלך. אנא המתן מספר רגעים להשלמת תהליך הרכישה.")

            }).catch(err => {
                alert("אופס. תקלה זמנית במערכת.😞😥 חשבונך לא חויב.")
            })

        }).catch(err => {
            alert("אופס. תקלה זמנית במערכת.😞😥 חשבונך לא חויב.")
        })
    }
    console.log(errors)

    return <>
        <h1 id="payment">תשלום עבור פלייבק</h1>

        <form className="my-form1" onSubmit={handleSubmit(save)}>

            <label>מספר זהות: </label>
            <input type="text" {...register("tz", {
                required: { value: true, message: "מספר זהות חובה" },
                minLength: { value: 9, message: "מספר זהות באורך 9" },
                maxLength: { value: 9, message: "מספר זהות באורך 9" },
            })} />
            {errors.tz && <span className="error-message">{errors.tz.message}</span>}

            <label>מספר אשראי: </label>
            <input type="text" {...register("num1", {
                required: { value: true, message: "מספר אשראי חובה" },
                minLength: { value: 16, message: "מספר אשראי באורך 16 ספרות" },
                maxLength: { value: 16, message: "מספר אשראי באורך 16 ספרות" },
            })} />
            {errors.num1 && <span className="error-message">{errors.num1.message}</span>}

            <label>תוקף הכרטיס: </label>
            {/* חודש */}
            <input type="number" placeholder="חודש" {...register("date", {
                required: { value: true, message: "שדה תאריך חובה" },
                minLength: { value: 1, message: "שדה החודש לא יהיה פחות מתו אחד" },
                maxLength: { value: 12, message: "שדה החודש לא יעלה על 12 תווים" },
            })} />
            {errors.number && <span className="error-message">{errors.number.message}</span>}

            <label>CVV: </label>
            <input type="text" {...register("num", {
                required: { value: true, message: "CVV חובה" },
                minLength: { value: 3, message: "CVV באורך 3 ספרות" },
                maxLength: { value: 3, message: "CVV באורך 3 ספרות" },
            })} />
            {errors.num && <span className="error-message">{errors.num.message}</span>}
            <div className="button">
                <Button style={{ marginLeft: "15%" }} type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }} />}>
                    אישור
                </Button>
            </div>
        </form>
    </>
}