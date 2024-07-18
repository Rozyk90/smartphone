import styled from "styled-components";
import { useState } from "react";
import TimerClock from "../elements/timeSetter";
import useDate from "../../../../../../../customHooks/useDate";
import useSound from "../../../../../../../customHooks/useSound";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";
import {
  timerStart,
  timerStop,
  timerReset,
  timerResume,
} from "../../../../../../../redux/reducers/clock/timer";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledSetter = styled.div`
  height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledTimer = styled.div``;

const StyledBtnBasic = styled.button`
  background: ${(prop) => prop.theme.off};
  color: ${(prop) => prop.theme.onOff};
  border-radius: 24px;
  border: none;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const StyledBtnColor = styled.button`
  background: ${(prop) => prop.theme.colors.primary};
  color: ${(prop) => prop.theme.colors.onPrimary};
  border-radius: 24px;
  border: none;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const StyledBtnStop = styled.button`
  background: ${(prop) => prop.theme.declain};
  color: ${(prop) => prop.theme.onDeclain};
  border-radius: 24px;
  border: none;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;
export default function ScreenTimer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(15);
  const [second, setSecond] = useState(0);

  const {
    isRunning,
    unixtimeStart,
    unixtimeStartBreak,
    breaks,
    unixtimeWhenRing,
  } = useAppSelector((state) => state.clock.timer);

  const dispatch = useAppDispatch();
  const { getUnixTime,getPolishTime } = useDate();
  const { btnSoundEffect } = useSound();

  function calculateAlarmTime(): number {
    const totalMilliseconds =
      hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000;
    const currentTime = getUnixTime();
    const breaksTime = breaks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const alarmTime = currentTime + totalMilliseconds + breaksTime;
    return alarmTime;
  }

  const startTimer = () => {
    console.log("pdpalam")
    dispatch(
      timerStart({ startTime: getUnixTime(), ringTime: calculateAlarmTime() })
    );
  };

  const polishTime = getPolishTime(unixtimeWhenRing)

  return (
    <StyledBody>
      {unixtimeStart === 0 && (
        <StyledSetter>
          <TimerClock
            hour={hour}
            setHour={setHour}
            minute={minute}
            setMinute={setMinute}
            second={second}
            setSecond={setSecond}
          />
          <StyledBtnColor
            onMouseDown={btnSoundEffect}
            onClick={() => startTimer()}
          >
            Start
          </StyledBtnColor>
        </StyledSetter>
      )}

      {unixtimeStart !== 0 && <StyledTimer>odliczanie
        dzien - {polishTime.dayName}
        <p></p>
        godzina - {polishTime.hours}
        <p></p>
        
        miniua - {polishTime.minutes}
        
        </StyledTimer>}
    </StyledBody>
  );
}
