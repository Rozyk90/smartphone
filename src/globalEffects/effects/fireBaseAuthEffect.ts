import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { userSet, userLogout } from "../../redux/reducers/user";

export default function FirebaseAuthAndFirestoreEffect() {
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.user);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const defaultUid = "";
        const defaultUserEmail = "";
        const uid = user.uid || defaultUid;
        const uEmail = user.email || defaultUserEmail;
        dispatch(userSet({ uid, uEmail, isLogged: true }));
      } else {
        dispatch(userLogout());
      }
    });

    //==================================================
    return () => {
      authUnsubscribe();
    };
  }, [auth, uid]);

  return null;
}
