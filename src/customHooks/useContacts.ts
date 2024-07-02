import { useAppSelector } from "../redux/hooks";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useContacts = () => {
  const { contactsList } = useAppSelector((state) => state.contacts.list);

  const findContactName = (number: string) => {
    const contact = contactsList.find((contact) => contact.number === number);
    return contact ? contact.name : number;
  };

  const findeContact = (number: string) => {
    const contact = contactsList.find((contact) => contact.number === number);
    return contact ? contact.elementId : false;
  };

  const editContactNumber = (number: string) => {
    if (number.length <= 3) {
      return number;
    } else if (number.length <= 6) {
      return number.replace(/(\d{3})(\d+)/, "$1 $2");
    } else if (number.length <= 9) {
      return number.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    } else {
      return number;
    }
  };

  const findeContactUid = async (number: string) => {
    try {
      const usersQuery = query(
        collection(db, "users"),
        where("user.phoneNumber", "==", number)
      );
      const users = await getDocs(usersQuery);
      if (users.empty) {
        return null;
      } else {
        return users.docs[0].id;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return { findContactName, findeContact, editContactNumber, findeContactUid };
};

export default useContacts;
