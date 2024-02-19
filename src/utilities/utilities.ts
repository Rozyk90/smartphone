import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";

import { auth } from "../firebase";

import { setUser } from "../redux/reducers/user";
import {
    onAuthStateChanged 
  } from "firebase/auth";

export default function Utilities (){

const dispatch = useAppDispatch() 

useEffect(()=>{
console.log("odpalam tego useeeffecta")
    onAuthStateChanged(auth, (user) => {
        console.log('xxxxx', user)
        if (user) {
          // dispatch(setUser({user}))
          // dispatch(setUser(user));
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const defaultUid = "";
          const defaultUserEmail = "";
          
          const uid = user.uid || defaultUid;
          const userEmail = user.email || defaultUserEmail;
          
          dispatch(setUser({uid,userEmail,isLogged:true}))
          // ...
        } else {
          dispatch(setUser({uid:'',userEmail:'',isLogged:true}))

          // User is signed out
          // ...
        }
      });

},[auth])




return null
}