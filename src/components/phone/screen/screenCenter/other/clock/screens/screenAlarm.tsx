import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";

import TitleLarge from "../../../../../../../globalComponents/titleLarge";
import AlarmCard from "../elements/alarmCard";
import useSound from "../../../../../../../customHooks/useSound";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../../../../../customHooks/useScreen";

const StyledBody = styled.div``;

const StyledAddArea = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;

const StyledAddBtn = styled(AddIcon)`
  color: ${(prop) => prop.theme.colors.primary};
  cursor: pointer;
  border-radius: 50%;
  margin-right: 20px;
`;

const StyledCardsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function ScreenAlarm() {
  const alarms = useAppSelector((state) => state.clock.alarm.alarms);
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();

  const newAlarm = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.newAlarm));
    pushCurrentScreen();
  };

  const sortedAlarms = [...alarms].sort((a, b) => {
    if (a.hour !== b.hour) {
      return a.hour - b.hour;
    }
    return a.minute - b.minute;
  });
  
  return (
    <StyledBody>
      <TitleLarge title="Alarmy" description={null} />

      <StyledAddArea>
        <StyledAddBtn
          onMouseDown={btnSoundEffect}
          onClick={() => newAlarm()}
        />
      </StyledAddArea>

      <StyledCardsArea>
        {sortedAlarms.map((alarm) => (
          <AlarmCard key={alarm.unixtimeId} alarm={alarm} />
        ))}
      </StyledCardsArea>
    </StyledBody>
  );
}