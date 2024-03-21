import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

const useFirestoreUpdate = () => {
  const uid = useAppSelector((state) => state.user.uid);
  const screenGrid = useAppSelector((state) => state.screen.center.screenGrid);

  const firestoreUpdate = async () => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      try {
        await updateDoc(userDocRef, {
          screenGrid,
        });
        console.log("Dokument zaktualizowany pomyślnie");
      } catch (error) {
        console.error("Błąd podczas aktualizacji dokumentu: ", error);
      }
    }
  };

  return {
    firestoreUpdate,
  };
};

export default useFirestoreUpdate;
