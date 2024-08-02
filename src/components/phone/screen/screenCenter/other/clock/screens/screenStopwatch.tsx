import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";
import {
  stopwatchStart,
  stopwatchStop,
  stopwatchReset,
  stopwatchSave,
  stopwatchResume,
} from "../../../../../../../redux/reducers/clock/stopwatch";
import useDate from "../../../../../../../customHooks/useDate";

const StyledBody = styled.div`
  height: 600px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyleTimerDisplay = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledOverallTime = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 2.5rem;
`;
const StyledLapTime = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 1.5rem;
`;

const StyledResults = styled.div`
  height: 270px;
  color: ${(prop) => prop.theme.fonts.secondary};
  font-weight: bold;
`;

const StyledResultsTitle = styled.div`
  border-bottom: 1px solid ${(prop) => prop.theme.fonts.secondary};
  padding-bottom: 10px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledResultsContainer = styled.div`
  margin-top: 20px;
  height: 230px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledResultColorTime = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
`;

const StyledButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
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

export default function ScreenStopwatch() {
  const [time, setTime] = useState(0);
  const [laptime, setLapTime] = useState(0);
  const [mounted, setMounted] = useState(false);

  const {
    isRunning,
    unixtimeStart,
    unixtimeLapStart,
    unixtimeStartBreak,
    lapTimes,
    breaks,
    lapBreaks,
  } = useAppSelector((state) => state.clock.stopwatch);

  const dispatch = useAppDispatch();
  const { getUnixTime } = useDate();

  const handleStart = () => {
    dispatch(stopwatchStart(getUnixTime()));
  };

  const handleStop = () => {
    dispatch(stopwatchStop({ breakTime: getUnixTime() }));
  };

  const handleReset = () => {
    dispatch(stopwatchReset());
    setTime(0);
    setLapTime(0);
  };

  const handleSave = () => {
    const labObj = {
      overallTime: formatTime(time),
      lapTime: lapTimes.length > 0 ? formatTime(laptime) : formatTime(time),
      id: lapTimes.length + 1,
    };
    dispatch(stopwatchSave({ nextLap: getUnixTime(), lapObj: labObj }));
  };

  const handleResume = () => {
    const breakTime = getUnixTime() - unixtimeStartBreak;
    dispatch(stopwatchResume({ breakTime }));
  };

  const formatTime = (tenths: number) => {
    const getTenths = `${tenths % 10}`;
    const seconds = Math.floor(tenths / 10);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

    if (getHours !== "00") {
      return `${getHours}:${getMinutes}:${getSeconds}.${getTenths}`;
    } else {
      return `${getMinutes}:${getSeconds}.${getTenths}`;
    }
  };

  useEffect(() => {
    let interval: any;
    const startTime = unixtimeStart;
    const breaksTime = breaks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const lapBreaksTime = lapBreaks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    if (!mounted && !isRunning) {
      setTime(Math.round((unixtimeStartBreak - startTime - breaksTime) / 100));

      if (unixtimeLapStart !== 0) {
        const newlapTime =
          (unixtimeStartBreak - lapBreaksTime - unixtimeLapStart) / 100;
        setLapTime(Math.round(newlapTime));
      }
      setMounted(true);
    } else {
      setMounted(true);
    }

    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = getUnixTime();

        const overallTime = (currentTime - breaksTime - startTime) / 100;
        setTime(Math.round(overallTime));

        if (unixtimeLapStart !== 0) {
          const newlapTime =
            (currentTime - lapBreaksTime - unixtimeLapStart) / 100;
          setLapTime(Math.round(newlapTime));
        }
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, getUnixTime, unixtimeStart, mounted]);

  return (
    <StyledBody>
      <StyleTimerDisplay>
        <StyledOverallTime>{formatTime(time)}</StyledOverallTime>
        {laptime !== 0 && <StyledLapTime>{formatTime(laptime)}</StyledLapTime>}
      </StyleTimerDisplay>

      <StyledResults>
        {lapTimes.length > 0 && (
          <>
            <StyledResultsTitle>
              <div>Pomiar</div>
              <div>Czasy okrążeń</div>
              <div>Czas ogółem</div>
            </StyledResultsTitle>

            <StyledResultsContainer>
              {lapTimes.map((result,id) => (
                <StyledResult key={id}>
                  <div>{result.id}</div>
                  <div>{result.lapTime}</div>
                  <StyledResultColorTime>
                    {result.overallTime}
                  </StyledResultColorTime>
                </StyledResult>
              ))}
            </StyledResultsContainer>
          </>
        )}
      </StyledResults>

      <StyledButtons>
        {!isRunning && unixtimeStart === 0 && (
          <StyledBtnColor onClick={handleStart}>Start</StyledBtnColor>
        )}
        {isRunning && unixtimeStart !== 0 && (
          <>
            {" "}
            <StyledBtnBasic onClick={handleSave}>Pomiar</StyledBtnBasic>
            <StyledBtnStop onClick={handleStop}>Stop</StyledBtnStop>
          </>
        )}
        {!isRunning && unixtimeStart !== 0 && (
          <>
            {" "}
            <StyledBtnBasic onClick={handleReset}>Resetuj</StyledBtnBasic>
            <StyledBtnColor onClick={handleResume}>Wznów</StyledBtnColor>
          </>
        )}
      </StyledButtons>
    </StyledBody>
  );
}
