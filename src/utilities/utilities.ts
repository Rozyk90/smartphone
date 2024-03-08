import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { auth, db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { userLogout, userSet } from "../redux/reducers/user";
import { onAuthStateChanged } from "firebase/auth";
import { updateScreenGrid } from "../redux/reducers/screen";

export default function Utilities() {
  const screenGrid = useAppSelector((state) => state.screen.screenGrid);
  const uid = useAppSelector(state => state.user.uid)
  const dispatch = useAppDispatch();

  const updateFromFirestore = async (uid:string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    if(data){
      dispatch(updateScreenGrid(data.screenGrid))
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const defaultUid = "";
        const defaultUserEmail = "";
        const uid = user.uid || defaultUid;
        const userEmail = user.email || defaultUserEmail;
        dispatch(userSet({ uid, userEmail, isLogged: true }));
        updateFromFirestore(uid);
        // ...
      } else {
        dispatch(userLogout());
      }
    });
  }, [auth]);

  return null;
}
