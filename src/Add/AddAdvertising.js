import { useForm } from "react-hook-form";
import "./AddAdvertising.css";
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import { saveArrAdvertising,addToArrAdvertising, deleteFromArrAdvertisingById } from "../Redux toolkit/features/Advertising/AdvertisingSlice";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export default function AddAdvertising() {

    let { register, handleSubmit, formState: { errors } } = useForm();//בונה טופס ואובייקט של נתונים ואובייקט של שגיאות מאחורי הקלעים

    
    const user = useSelector((state) => state.user.onUserLoggedIn);
    const  advertisingArr = useSelector((state) => state.advertising.ArrAdvertising);
    let dis=useDispatch();

    useEffect(() => {
        axios.get("http://localhost:8000/advertising/getadvertising").then(res => {
                console.log("ressss", res.data);
                dis(saveArrAdvertising(res.data))
            }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))    
      }, []);

    const save = (data) => {
        console.log("data",data.file[0].name);
        if(advertisingArr && advertisingArr.length>=4)
        alert("כמות הפרסומות באתר מוגבלת ל 4 פרסומות")
        else{
            const formData={
                name:data.file[0].name
            }
                axios.post("http://localhost:8000/advertising/addadvertising", formData).then(res=>{
                    
                    console.log("res")
                    console.log(res.data.id)
                    let addobj={
                        idadvertising:res.data.id,
                        name:formData.name
                    }
                    dis(addToArrAdvertising(addobj))
                    alert("הפרסומת הועלתה בהצלחה")
    
                }).catch(err=>{
            alert("שגיאה התרחשה בעת ניסיון הוספת פרסומת למערכת")
                })
        }
   

    }

function deleteAdv(id){

    axios.delete(`http://localhost:8000/advertising/deleteadvertising/${id}`).then(res=>{
    dis(deleteFromArrAdvertisingById(id))
    alert("הפרסומת נמחקה בהצלחה")

}).catch(err=>{
alert("שגיאה התרחשה בעת ניסיון מחיקת פרסומת מהמערכת")
})
}
    console.log(errors)
    return <><form className="add-Playback" onSubmit={handleSubmit(save)}>
        <div className="Addd">
            <h1 className="Add-P">הוספת פרסומת</h1></div>
           
            <label>הוסף את קובץ הפרסומת
            <input type="file" 
             
                {...register("file", {
                    required: { value: true, message: "חובה העלאת תמונה" },
                    
                })} />

                {errors.file && <span className="error-message">{errors.file.message}</span>}</label>
            <br></br>
            <div className="button"> 
                <Button style={{ marginLeft: "15%", marginTop: "0%" }} type="submit" variant="contained" color="success" endIcon={<SendIcon style={{ transform: 'scaleX(-1)' }} sx={{ marginRight: 1 }}/>} >
                    אישור הוספה
                </Button>
            </div>
        
    </form>
    <div className="s2">
    
            {advertisingArr!=[] && advertisingArr.map(si =>
                    <div className="Singer">
                    {console.log("si")}
                       {console.log(si)} 
                       <DeleteSweepOutlinedIcon onClick={()=>deleteAdv(si.idadvertising)} />
                        <img className="img-P" 
                        style={{height: "200px", width:"270px", marginTop: "0%", position: "relative"}} 
                        src={si.name}/>
        {user && user.status==1&& <div className="Button-Delete">
            <IconButton style={{ color: "green", marginTop: "-91vh", marginRight: "42vh"}}
             aria-label="delete" size="large"><DeleteIcon fontSize="inherit"
             onClick={() => { alert("מחיקה"); }}/></IconButton></div>}
                    </div>
            )}
        </div>
</>
}
 // <input type="text" {...register("file", {
                //     required: { value: true, message: "חובה העלאת קובץ שמע" },
                    
                // })} />