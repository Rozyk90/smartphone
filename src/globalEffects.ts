import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import { auth, db } from "./firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { userLogout, userSet } from "./redux/reducers/user";
import { onAuthStateChanged } from "firebase/auth";
import { updateScreenGrid } from "./redux/reducers/screenParts/screenCenter";
import useCustomHook from "./customHooks/useFirestore";

export default function GlobalEffects() {
  const screenGrid = useAppSelector((state) => state.screen.center.screenGrid);
  const dispatch = useAppDispatch();

  const updateFromFirestore = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data) {
      dispatch(updateScreenGrid(data.screenGrid));
    }
  };

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

  const { firestoreUpdate } = useCustomHook();

  useEffect(() => {
    firestoreUpdate();
  }, [screenGrid]);

  return null;
}
