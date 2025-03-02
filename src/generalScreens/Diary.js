// import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Diary.css';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CalendarGfg from './CalendarGfg';
import { useNavigate } from 'react-router-dom';

export default function Diary() {
    let [nameTask,setNameTask]=useState("");
    let [date,setDate]=useState(new Date().getDate());
    const [darg, setDarg] = useState("");
    const user = useSelector((state) => state.user);
    const nav=useNavigate()
    const handleChange = (event) => {
        setDarg(event.target.value);
    };

function addTask(){
    console.log(user.userLoggedIn.id) 

    let task={
       type:darg,
       content:nameTask,
       date:date,
       iduser:user.userLoggedIn.id
    }
    axios.post("http://localhost:8000/tasks/addtask", task).then(res=>{
    alert("משימה נוספה")
    nav("/")
}).catch(err=>{
alert("שגיאה התרחשה בעת ניסיון הוספת משימה למערכת")
})

   
}
function onChangeDate(event){
    setDate(event)
}
function onChangeName(event){
    setNameTask(event.target.value)
}
    return <div className='diary'>
           
       <div id="enter-task"> 
       <input type="input" placeholder="הכנס משימה" id="enter-task" onChange={onChangeName}/><br/>
       <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker onChange={onChangeDate}/>
    </LocalizationProvider><br/><br/>
    <Box id="type-task">
      <FormControl fullWidth>
        <InputLabel>סמן משימה </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={darg}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"error"}>אדום</MenuItem>
          <MenuItem value={"warning"}>צהוב</MenuItem>
          <MenuItem value={"success"}>ירוק</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button style={{ borderColor: "green", color: "green" ,marginLeft:130}} color="success" variant="outlined" onClick={addTask}>שמור</Button>
  </div>
  
<div id="CalendarGfg"><CalendarGfg/></div>

            </div>
}
