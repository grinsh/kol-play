import { useSelector } from "react-redux"
import './Invitation.css';
import { useEffect, useState } from "react";
import axios from "axios";


export const Invitation = () => {
    // let selected=useSelector(stat=>stat.selectedSong);

    // const selected = { id: 1, name: "מסיני בא", singer: "יעקב שוואקי", length: "00:04:14", picture: "./Yaakov.png" };
    // const selected = null;
    const [arr, setArr] = useState()
    const user = useSelector((state) => state.user.userLoggedIn);

    useEffect(() => {
        axios.get("http://localhost:8000/order/getorder").then(res => {
            console.log("res", res.data);
            // סינון הזמנות לפי קוד משתמש. שלכל משתמש יהיו את ההזמנות הפרטיות שלו ואם זה מנהל הוא מציג את ההזמנות של כל המשתמשים
            if (user.status == 1)
                setArr(res.data);
            else{
                const userArr = res.data.filter(o=> o.idUser == user.id)
                setArr(userArr) // תכניס לתוך המערך שבשורה 12 את כל ההזמנות המסוננות
            }
        }).catch(err => alert("התרחשה שגיאה בעת ההתחברות לשרת"))
    }, [])   //הפונקציה תופעל כשהקומפוננטה עולה


    return (<div>
        <h1 style={{ marginTop: "-10%" }}>הזמנות קודמות</h1>
        {/* style={{ marginLeft: "15%" }} */}
        {arr == null || arr.length == 0 ?
            <div style={{ height: "200%" }} className="noInvitation">
                <img src="./אין הזמנות1.png" />
            </div>
            :
            <div>
                <h2 style={{ marginTop: "4.7%" }} className="h2">פרטי הזמנות שבוצעו:</h2>
                <table style={{ width: "50vw", margin: "auto" }}>
                    <tr>
                        <th>קוד הזמנה</th>
                        <th>תאריך הזמנה</th>
                        <th>שם הפלייבק</th>
                    </tr>
                    {
                        arr.map(o =>
                            <tr key={o.idOrder}> {/* key אמר שכדאי להוסיף לכל שורה GPT*/}
                                <td> {o.idOrder} </td>
                                <td> {o.dateOrder} </td>
                                <td> {o.namePlayBack} </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        }
    </div>)
}
export default Invitation;