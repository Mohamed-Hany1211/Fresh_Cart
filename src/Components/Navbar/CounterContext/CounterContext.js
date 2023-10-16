import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

export let counterContext = createContext();
export default function CounterContextProvider(props) {

    const [numItems,setnumItems] = useState(0);

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function getCart(){
        let {data} = await getLoggedUserCart();
            setnumItems(data?.numOfCartItems);
        
    }
    function getLoggedUserCart(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        }).then((respons)=> respons).catch((err)=>err);
    }

    useEffect(()=>{
        getCart();
    },[])

    return (
        <counterContext.Provider value={{numItems,setnumItems}}>
            {props.children}
        </counterContext.Provider>
    )
}
