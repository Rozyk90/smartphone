import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/hooks";
import Switch from "@mui/material/Switch";
import useSound from "../../../../../../../customHooks/useSound";
import useDate from "../../../../../../../customHooks/useDate";
import { alarmToEditSet, alarmTurnOff, alarmTurnOn } from "../../../../../../../redux/reducers/clock/alarm";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../../../../../customHooks/useScreen";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
`;
const StyledCardBtn = styled.button`
  border: none;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  background:none;
  position: absolute;
  height: 92px;
  width: 210px;
  cursor: pointer;
  top: 0px;
  left: 0px;
  z-index: 1;
`;

const StyledTitle = styled.div<{ $active: boolean }>`
  width: 100%;
  color: ${(prop) =>
    prop.$active ? prop.theme.fonts.primary : prop.theme.fonts.secondary};
  font-size: 0.8rem;
  font-weight: bold;
`;

const StyledDate = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledTime = styled.div<{ $active: boolean }>`
  height: 50px;
  width: 95px;
  display: flex;
  align-items: center;
  color: ${(prop) =>
    prop.$active ? prop.theme.fonts.primary : prop.theme.fonts.secondary};
  font-size: 2rem;
`;

const StyledDays = styled.div`
  padding: 2px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledDay = styled.div<{ $active: boolean; $selected: boolean }>`
  font-weight: bold;
  position: relative;
  color: ${(prop) =>
    prop.$active && prop.$selected
      ? prop.theme.colors.primary
      : prop.theme.fonts.secondary};

  &::after {
    content: "";
    display: ${(props) => (props.$selected ? "block" : "none")};
    position: absolute;
    top: -4px;
    left: 50%;
    border-radius: 50%;
    width: 3px;
    height: 3px;
    background: ${(prop) =>
    prop.$active
      ? prop.theme.colors.primary
      : prop.theme.fonts.secondary};
    transform: translateX(-50%);
  }
`;

const StyledSwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled(Switch)`
  & .MuiSwitch-switchBase {
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
    &.Mui-checked + .MuiSwitch-track {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

interface Alarm {
  active: boolean;
  nap: boolean;
  unixtimeId: number;
  title: string;
  hour: number;
  minute: number;
  days: string[];
}

interface AlarmCardProps {
  alarm: Alarm;
}

export default function AlarmCard(props: AlarmCardProps) {
  const dispatch = useAppDispatch()
  const { btnSoundEffect } = useSound();
  const {pushCurrentScreen} = useScreen()

  const hours = [10, 11, 12];
  const minuts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const days = [
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
    "niedziela",
  ];

  const alarm = props.alarm;

  const editAlarm = () =>{
    dispatch(alarmToEditSet(alarm.unixtimeId))
    dispatch(setCurrentScreen(enumCurrentScreen.newAlarm))
    pushCurrentScreen()
  }

  const switchAlarm = () => {
    const alarmState = alarm.active
    dispatch(alarmState?alarmTurnOff(alarm.unixtimeId):alarmTurnOn(alarm.unixtimeId))

  };

  return (
    <StyledBody>
      <StyledCardBtn onMouseDown={()=>btnSoundEffect()} onClick={()=>editAlarm()} />
      <StyledTitle $active={alarm.active}>{alarm.title}</StyledTitle>

      <StyledDate>
        <StyledTime $active={alarm.active}>
          {hours.includes(alarm.hour) ? alarm.hour : `0${alarm.hour}`}:
          {minuts.includes(alarm.minute) ? `0${alarm.minute}` : alarm.minute}
        </StyledTime>

        <StyledDays>
          {days.map((day, id) => (
            <StyledDay
            key={day}
              $active={alarm.active}
              $selected={alarm.days.includes(day)}
            >
              {day[0]}
            </StyledDay>
          ))}
        </StyledDays>

        <StyledSwitchBox>
          <StyledSwitch
            checked={alarm.active}
            onChange={()=>switchAlarm()}
            onMouseDown={() => btnSoundEffect()}
          />
        </StyledSwitchBox>
      </StyledDate>
    </StyledBody>
  );
}
