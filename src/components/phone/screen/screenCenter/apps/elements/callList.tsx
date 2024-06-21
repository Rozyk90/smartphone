import styled from "styled-components";
import { useState } from "react";

import ContactTitle from "../globalComponents/contactTitle";
import CallHistoryCard from "../globalComponents/callHistoryCard";
import { arrHistory, mapCallsByDay } from "./arrays";

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

export default function CallList() {
  const [selectedContact, setSelectedContact] = useState<number | null>();

  const selectContact = (unix: number) => {
    if (selectedContact === unix) {
      setSelectedContact(null);
    } else {
      setSelectedContact(unix);
    }
  };

  const newArrHistory = mapCallsByDay(arrHistory);

  return (
    <StyledBody>
      <ContactTitle title="Historia połączeń" description={null} />
      <StyledListArea>
        {newArrHistory.map((dayObj, dayIndex) => (
          <div key={dayIndex}>
            {dayObj.calls.map((call, callIndex) => (
              <div key={call.unixTime}>
                {callIndex === 0 && (
                  <StyledDataElement>
                    {dayObj.weekDay}, {dayObj.day} {dayObj.month}
                  </StyledDataElement>
                )}
                <CallHistoryCard
                  callObj={call}
                  fnToDo={() => selectContact(call.unixTime)}
                  selected={selectedContact === call.unixTime}
                />
              </div>
            ))}
          </div>
        ))}
      </StyledListArea>
    </StyledBody>
  );
}
