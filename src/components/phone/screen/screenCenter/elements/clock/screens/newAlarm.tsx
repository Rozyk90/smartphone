import { useState, useEffect } from "react";
import styled from "styled-components";
import NewAlarmClock from "../elements/newAlarmClock";
import useSound from "../../../../../../../customHooks/useSound";
import Switch from "@mui/material/Switch";
import KeyboardQWERTY from "../../../../../../../globalComponents/keyboardQWERTY";
import useScreen from "../../../../../../../customHooks/useScreen";
import useDate from "../../../../../../../customHooks/useDate";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";
import {
  alarmAdd,
  alarmRemove,
  alarmToEditSet,
  alarmUpdate,
} from "../../../../../../../redux/reducers/clock/alarm";
import TimeSetter from "../elements/timeSetter";

const StyledBody = styled.div`
  background: ${(props) => props.theme.backgrounds.primary};
  height: 600px;
`;

const StyledDateArea = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 25px;
  height: 250px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StyledNotification = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
  height: 20px;
  width: 270px;
  margin-top: 20px;
  font-weight: bold;
`;

const StyledDays = styled.div`
  height: 60px;
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDay = styled.button<{ $selected: boolean }>`
  background: none;
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(prop) =>
    prop.$selected ? prop.theme.colors.primary : prop.theme.fonts.primary};
  border: ${(props) =>
    props.$selected ? `${props.theme.colors.primary} 1px solid` : "none"};
  border-radius: 50%;
  cursor: pointer;
`;

const StyledSunday = styled.button<{ $selected: boolean }>`
  background: none;
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(prop) =>
    prop.$selected ? prop.theme.colors.primary : prop.theme.declain};
  border: ${(props) =>
    props.$selected ? `${props.theme.colors.primary} 1px solid` : "none"};
  border-radius: 50%;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 270px;
  height: 40px;
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid ${(prop) => prop.theme.colors.primary};
  background: ${(prop) => prop.theme.colors.background};

  &:focus {
    outline: none;
  }
`;

const StyledNap = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  width: 270px;
`;

const StyledBtns = styled.div`
  margin-top: 30px;
  height: 40px;
  width: 310px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledBtn = styled.button`
  background: none;
  border: none;
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 1.2rem;
  cursor: pointer;
`;

const StyledBtnDel = styled.button`
  background: none;
  border: none;
  color: ${(prop) => prop.theme.declain};
  font-size: 1.2rem;
  cursor: pointer;
`;

const StyledKeyboard = styled.div`
  width: 310px;
  position: absolute;
  top: 370px;
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

export default function NewAlarm() {
  const { alarmToEditId, alarms } = useAppSelector(
    (state) => state.clock.alarm
  );

  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(0);
  const [days, setDays] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [nap, setNap] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const dispatch = useAppDispatch();
  const { backToPreviousScreen } = useScreen();
  const { btnSoundEffect } = useSound();
  const { getUnixTime } = useDate();

  const daysArr = [
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
    "niedziela",
  ];
  const numbersToEdit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const dayFn = (day: string) => {
    const isDayInArray = days.includes(day);

    if (isDayInArray) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleInputChange = (event: any): void => {
    setTitle(event.target.value);
    setShowKeyboard(true);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && title.length !== 0) {
      setShowKeyboard(false);
    } else if (event.key === "Backspace" && title.length === 0) {
      setShowKeyboard(false);
    }
  };

  const remove = () => {
    if (alarmToEditId) {
      dispatch(alarmRemove(alarmToEditId));
      backToPreviousScreen();
    }
  };

  const cancel = () => {
    if (showKeyboard) {
      setShowKeyboard(false);
    } else {
      backToPreviousScreen();
    }
  };

  const save = () => {
    if (showKeyboard) {
      setShowKeyboard(false);
    } else {
      const alarm = {
        active: true,
        unixtimeId: alarmToEditId ? alarmToEditId : getUnixTime(),
        nap,
        title,
        hour,
        minute,
        days,
      };

      dispatch(
        alarmToEditId
          ? alarmUpdate({ unixtimeId: alarmToEditId, updatedAlarm: alarm })
          : alarmAdd(alarm)
      );
      backToPreviousScreen();
    }
  };

  useEffect(() => {
    if (alarmToEditId) {
      const alarm = alarms.find((alarm) => alarm.unixtimeId === alarmToEditId);
      if (alarm) {
        setHour(alarm.hour);
        setMinute(alarm.minute);
        setTitle(alarm.title);
        setDays(alarm.days);
        setNap(alarm.nap);
      }
    }
  }, [alarmToEditId]);

  useEffect(() => {
    return () => {
      dispatch(alarmToEditSet(null));
    };
  }, []);

  return (
    <StyledBody>
      <TimeSetter
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        second={null}
        setSecond={null}
      />

      <StyledDateArea>
        <StyledInput
          onFocus={() => setShowKeyboard(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          value={title}
          placeholder="Nazwa alarmu"
          autoComplete="off"
        />

        <StyledNotification>
          {days.length === 0
            ? `Alarm o ${numbersToEdit.includes(hour) ? `0${hour}` : hour}:${
                numbersToEdit.includes(minute) ? `0${minute}` : minute
              }`
            : "Alarm w wybrane dni"}
        </StyledNotification>
        <StyledDays>
          {daysArr.map((day) =>
            day === "niedziela" ? (
              <StyledSunday
                key={day}
                onClick={() => dayFn(day)}
                onMouseDown={btnSoundEffect}
                $selected={days.includes(day)}
              >
                {day[0]}
              </StyledSunday>
            ) : (
              <StyledDay
                key={day}
                onClick={() => dayFn(day)}
                onMouseDown={() => btnSoundEffect()}
                $selected={days.includes(day)}
              >
                {day[0]}
              </StyledDay>
            )
          )}
        </StyledDays>

        <StyledNap>
          Drzemka
          <StyledSwitch
            checked={nap}
            onMouseDown={btnSoundEffect}
            onClick={() => setNap(!nap)}
          />
        </StyledNap>
      </StyledDateArea>
      <StyledBtns>
        {!showKeyboard && alarmToEditId && (
          <StyledBtnDel onMouseDown={btnSoundEffect} onClick={remove}>
            Usuń
          </StyledBtnDel>
        )}
        <StyledBtn onMouseDown={btnSoundEffect} onClick={cancel}>
          Anuluj
        </StyledBtn>
        <StyledBtn onMouseDown={btnSoundEffect} onClick={save}>
          Zapisz
        </StyledBtn>
      </StyledBtns>
      {showKeyboard && (
        <StyledKeyboard>
          <KeyboardQWERTY
            setTxt={setTitle}
            txt={title}
            closeKeyboard={() => setShowKeyboard(false)}
          />
        </StyledKeyboard>
      )}
    </StyledBody>
  );
}
