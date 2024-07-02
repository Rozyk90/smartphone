import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { userSetNumber } from "../../redux/reducers/user";
import { pageFirstUpdateDone } from "../../redux/reducers/pageStates";
import useFirestorePull from "../../customHooks/useFirestorePull";

const RealtimeDataEffect = () => {
  const [mounted, setMounted] = useState(false);
  const { uid } = useAppSelector((state) => state.user);
  const doFirstUpdate = useAppSelector(
    (state) => state.pageStates.doFirstUpdate
  );



  const dispatch = useAppDispatch();


  const { firestorePullLarge, firestorePullNotification } = useFirestorePull();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && uid) {
      const unsub = onSnapshot(doc(db, "users", uid), (docSnapshot) => {
        const userObj = docSnapshot.data();
        if (doFirstUpdate && userObj) {
          dispatch(userSetNumber(userObj.user.phoneNumber));
          dispatch(pageFirstUpdateDone());
          firestorePullLarge(userObj);
        } else if (userObj) {
          firestorePullNotification(userObj);
        }
      });

      return () => unsub();
    }
  }, [mounted, uid, doFirstUpdate]);

  return null;
};

export default RealtimeDataEffect;
