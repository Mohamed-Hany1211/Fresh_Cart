import axios from "axios";
import { createContext, useContext, useEffect, useState} from "react";
import { counterContext } from "../CounterContext/CounterContext";

export let cartContext = createContext();
export default function CartContextProvider(props) {


    const [cartId,setCartId] = useState(0);

    let {setnumItems}= useContext(counterContext);

    async function getCart(){
        let {data} = await getLoggedUserCart();
        
            setCartId(data?.data._id);
        
    }

    let headers = {
        token: localStorage.getItem('userToken')
    }


    async function addToCart(prodId) {
        let resp =  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: prodId
        }, {
            headers: headers
        });
        setnumItems(resp?.data.numOfCartItems);
        return resp;
    }

    function getLoggedUserCart(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        }).then((respons)=> respons).catch((err)=>err);
    }

    async function removeItem(productId){
        let resp =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:headers
        })
        setnumItems(resp?.data.numOfCartItems);
        return resp;
    }


    function updateProductQuantity(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{
            headers:headers
        }).then((respons)=> respons).catch((err)=>err);
    }


    async function cancelCart(){
        let resp =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        })
        setnumItems(resp?.data.numOfCartItems);
        return resp;
    }



    async function onlinePayment(cartId,values,url){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:values
        },{
            headers:headers
        })
    }


useEffect(()=>{
    getCart();
},[])

    return <cartContext.Provider value={{cartId,addToCart,getLoggedUserCart,removeItem,updateProductQuantity,cancelCart,onlinePayment}}>
        {props.children}
    </cartContext.Provider>
}