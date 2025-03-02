import { useEffect, useState } from "react";
import axios from 'axios';

export const ProductsToOrders = () => {


    //1
    const [ProductsToOrdersArr, setProductsToOrdersArr] = useState([]);  //הכנת מערך שיחזיר את הפלייבקים להזמנות

    //2
    useEffect(() => {
        axios.get("http://localhost:8000/ProductsToOrders/getProductsToOrders").then(res => {
            console.log("res", res.data);
            //3
            setProductsToOrdersArr(res.data);
        }).catch(err=>alert("התרחשה שגיאה בעת ההתחברות לשרת"))
    }, [])   //הפונקציה תופעל כשהקומפוננטה עולה

    return (<div>

        <h1>פלייבקים להזמנות</h1>
        {/* //4 */}
        {ProductsToOrdersArr.map(   pr =>
            <div>
                <h2>{pr.namePlayBack}</h2>
                <p>{pr.price}</p>
                <p>{pr.lengthPlayBack}</p>
            </div>

        )}
    </div>)

}

export default ProductsToOrders;

// export const ProductsToOrders = () =>{
//     return <div>productsToOrders</div>
// }

// export default ProductsToOrders;