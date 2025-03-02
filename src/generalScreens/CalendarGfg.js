import React from 'react';
import { Badge, Calendar } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';


const CalendarGfg = () => {
let [arr,setArr]=useState([]);
let listData =[];
  useEffect(()=>{
    axios.get("http://localhost:8000/tasks/gettasks").then(res=>{
   setArr(res.data)
}).catch(err=>{
alert("שגיאה התרחשה בעת ניסיון קבלת משימות מהמערכת")
})},[])


const getListData = (value) => {
let w;
let arr3=[],dataDate=``;
console.log(value)

for(let i=0;i<arr.length;i++){
      w=new Date(arr[i].date)
      let year=w.getFullYear();
      let month=w.getMonth();
      let day=w.getDate();
    
      if(year==value.$y && month==value.$M && day==value.$D){
        arr3.push({type:arr[i].type,content:arr[i].content})
        dataDate=`${value.$y}-${value.$M}-${value.$D}`;
      }
    } 
    return arr3;
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    listData=getListData(value);
    return (
      <ul className="events">
        {listData!=[] && listData.map((item) => (
            <li key={item.content}>
              {<Badge status={item.type} text={item.content} />}
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
export default CalendarGfg;