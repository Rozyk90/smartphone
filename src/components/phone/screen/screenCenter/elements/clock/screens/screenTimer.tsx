import styled from "styled-components";
import { useEffect, useState } from "react";
import TimerClock from "../elements/timeSetter";
import useDate from "../../../../../../../customHooks/useDate";
import useSound from "../../../../../../../customHooks/useSound";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
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

const StyledCountdown = styled.div``;

const StyledTimer = styled.div`
  margin-top: 50px;
  height: 280px;
  width: 280px;
  border: 7px solid ${(prop) => prop.theme.colors.background};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  && {
    color: ${(prop) => prop.theme.colors.primary};
  }
`;

const StyledTime = styled.div`
  font-size: 3rem;
`;

const StyledBtns = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: space-around;
`;

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
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(15);
  const [second, setSecond] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const {
    isRunning,
    unixtimeStart,
    unixtimeStartBreak,
    breaks,
    unixtimeWhenRing,
    unixtimeTimerLength,
  } = useAppSelector((state) => state.clock.timer);

  const dispatch = useAppDispatch();
  const { getUnixTime, getPolishTime } = useDate();
  const { btnSoundEffect } = useSound();

  function calculateAlarmRingTime(): number {
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
    dispatch(
      timerStart({
        startTime: getUnixTime(),
        ringTime: calculateAlarmRingTime(),
      })
    );
    setCountdown(calculateAlarmRingTime() - getUnixTime());
  };

  const resumeTimer = () => {
    const currentbreak = getUnixTime() - unixtimeStartBreak;
    dispatch(timerResume({ breakLength: currentbreak }));
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

    if (getHours !== "00") {
      return `${getHours} : ${getMinutes} : ${getSeconds}`;
    } else {
      return `${getMinutes} : ${getSeconds}`;
    }
  };

  const breaksTime = breaks.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const polishTime = getPolishTime(unixtimeWhenRing + breaksTime);

  useEffect(() => {
    if (!mounted) {
      setMounted((prev) => !prev);
      if (isRunning) {
        setCountdown(unixtimeWhenRing + breaksTime - getUnixTime());
      } else {
        setCountdown(unixtimeWhenRing + breaksTime - unixtimeStartBreak);
      }
    }

    if (isRunning) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1000);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [mounted, isRunning, countdown]);

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
          <StyledBtnColor onMouseDown={btnSoundEffect} onClick={startTimer}>
            Start
          </StyledBtnColor>
        </StyledSetter>
      )}

      {unixtimeStart !== 0 && (
        <StyledCountdown>
          <StyledTimer>
            <div>{formatTime(unixtimeTimerLength)}</div>

            <StyledTime>{formatTime(countdown)}</StyledTime>

            <div>
              <NotificationsActiveRoundedIcon fontSize="small" />
              {`${polishTime.hours}:${polishTime.minutes}`}
            </div>
          </StyledTimer>

          <StyledBtns>
            {isRunning ? (
              <>
                <StyledBtnStop
                  onClick={() =>
                    dispatch(timerStop({ breakTime: getUnixTime() }))
                  }
                >
                  Wstrzymaj
                </StyledBtnStop>
              </>
            ) : (
              <>
                <StyledBtnBasic onClick={() => dispatch(timerReset())}>
                  Usuń
                </StyledBtnBasic>
                <StyledBtnColor onClick={resumeTimer}>Wznów</StyledBtnColor>
              </>
            )}
          </StyledBtns>
        </StyledCountdown>
      )}
    </StyledBody>
  );
}
