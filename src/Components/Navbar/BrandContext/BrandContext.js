import axios from "axios";
import { createContext } from "react";


    export let BrandsContext = createContext();


export default function BrandsContextProvider(props){

    let headers = {
        token: localStorage.getItem('userToken')
    }

async function getBrands(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`,{headers:headers});
}


    return <BrandsContext.Provider value={{getBrands}}>
    
    {props.children}
    
    </BrandsContext.Provider>
    }