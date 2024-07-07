import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import TitleLarge from "../../../../../../globalComponents/titleLarge";
import HistoryCard from "../components/HistoryCard";

import { contactsHistoryNotificationSet } from "../../../../../../redux/reducers/contacts/contactsHistory";
import useUtilities from "../../../../../../customHooks/useUtilities";

const StyledBody = styled.div``;

const StyledListArea = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledDataElement = styled.div`
  margin-top: 10px;
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 0.7rem;
  font-weight: bolder;
`;

export default function ContactsHistory() {
  const [selectedContact, setSelectedContact] = useState<number | null>();
  const { contactsHistory, contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );
  const dispatch = useAppDispatch();

  const { mapCallsByDay } = useUtilities();

  const selectContact = (unix: number) => {
    if (selectedContact === unix) {
      setSelectedContact(null);
    } else {
      setSelectedContact(unix);
    }
  };

  const sortedHistory = mapCallsByDay(contactsHistory);

  useEffect(() => {
    dispatch(contactsHistoryNotificationSet(false));

    return () => {
      dispatch(contactsHistoryNotificationSet(false));
    };
  }, []);

  return (
    <StyledBody>
      <TitleLarge title="Historia połączeń" description={null} />
      <StyledListArea>
        {sortedHistory
          .sort((a, b) => b.startOfDayUnixTime - a.startOfDayUnixTime)
          .map((dayObj, dayIndex) => (
            <div key={dayIndex}>
              {dayObj.calls
                .sort((a, b) => b.unixTime - a.unixTime)
                .map((callObj, callIndex) => (
                  <div key={callObj.unixTime}>
                    {callIndex === 0 && (
                      <StyledDataElement>
                        {dayObj.weekDay}, {dayObj.day} {dayObj.month}
                      </StyledDataElement>
                    )}
                    <HistoryCard
                      callObj={callObj}
                      fnToDo={() => selectContact(callObj.unixTime)}
                      selected={selectedContact === callObj.unixTime}
                    />
                  </div>
                ))}
            </div>
          ))}
      </StyledListArea>
    </StyledBody>
  );
}
