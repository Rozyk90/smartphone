import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { userSet, userLogout } from "../../redux/reducers/user";
import useFirestorePull from "../../customHooks/useFirestorePull";

export default function FireBaseAuthEffect() {
  const dispatch = useAppDispatch();
  const { firestorePull } = useFirestorePull();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const defaultUid = "";
        const defaultUserEmail = "";
        const uid = user.uid || defaultUid;
        const userEmail = user.email || defaultUserEmail;
        dispatch(userSet({ uid, userEmail, isLogged: true }));
        firestorePull(uid);
      } else {
        dispatch(userLogout());
      }
    });
  }, [auth]);

  return null;
}
