import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { userLogout, userSet } from "../redux/reducers/user";
import { onAuthStateChanged } from "firebase/auth";
import { updateScreenGrid } from "../redux/reducers/screenParts/screenCenter";
import useCustomHook from "../customHooks/useFirestorePush";

import AutoDarkMode from "./effects/autoDarkMode";
import FirestorePushEffect from "./effects/firestorePushEffect";
import FireBaseAuthEffect from "./effects/fireBaseAuthEffect";
import { useAppSelector } from "../redux/hooks";

export default function GlobalEffects() {

    const {uid} = useAppSelector(state => state.user)
  // const updateFromFirestore = async (uid: string) => {
  //   const docRef = doc(db, "users", uid);
  //   const docSnap = await getDoc(docRef);
  //   const data = docSnap.data();
  //   if (data) {
  //     dispatch(updateScreenGrid(data.settings.screen.screenGrid));
  //   }
  // };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const defaultUid = "";
  //       const defaultUserEmail = "";
  //       const uid = user.uid || defaultUid;
  //       const userEmail = user.email || defaultUserEmail;
  //       dispatch(userSet({ uid, userEmail, isLogged: true }));
  //       updateFromFirestore(uid);
  //       // ...
  //     } else {
  //       dispatch(userLogout());
  //     }
  //   });
  // }, [auth]);

  // const { firestorePush } = useCustomHook();

  // useEffect(() => {
  //   firestorePush();
  // }, [
  //   screenGrid,
  //   isShowingValue,
  //   isFastCharging,
  //   isBatteryProtection,
  //   isBatteryDescription,
  // ]);



  return (
    <>
      <AutoDarkMode />
      <FirestorePushEffect />
      <FireBaseAuthEffect />
    </>
  );
}
