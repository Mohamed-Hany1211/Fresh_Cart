import { createContext, useState } from "react";

export let userContext = createContext();


export default function UserContextProvider(props){

    const [UserToken,setUserToken]=useState(null);
    const [userData,setUserData]=useState(null);
    return <userContext.Provider value={{UserToken,setUserToken,setUserData,userData}}>
        {props.children}
    </userContext.Provider>
}