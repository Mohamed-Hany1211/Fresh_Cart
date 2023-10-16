import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props){

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function getloggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:headers
        }).then((response)=>response).catch((err)=>err);
    }

    function removeWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:headers
        })
    }


     function addToWishList(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: prodId
        }, {
            headers: headers
        }).then((resp)=>resp).catch((err)=>err);
    }

    return <WishListContext.Provider value={{getloggedUserWishList,removeWishListItem,addToWishList}}>
        {props.children}
    </WishListContext.Provider>
}

