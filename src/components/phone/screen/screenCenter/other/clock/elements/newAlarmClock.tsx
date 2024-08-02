import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import useSound from "../../../../../../../customHooks/useSound";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/hooks";
import { alarmToEditSet } from "../../../../../../../redux/reducers/clock/alarm";

const colorChange = (prop: any) => keyframes`
  0% {
    color: ${prop.theme.colors.primary}

  }
  100% {
    color: ${prop.theme.fonts.primary}
  }
`;

const StyledTime = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  gap: 30px;
`;

const StyledHourArea = styled.div`
  height: 200px;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledMinuteArea = styled.div`
  height: 200px;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledTimeBtn = styled.button`
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
`;

const StyledHour = styled.div<{ $hourColor: boolean; $hourAnimation: boolean }>`
  color: ${(prop) =>
    prop.$hourColor ? prop.theme.colors.primary : prop.theme.fonts.primary};

  ${(props) =>
    props.$hourAnimation &&
    css`
      animation: ${(props) => colorChange(props)} 3s normal;
    `}
`;

const StyledMinute = styled.div<{
  $minuteColor: boolean;
  $minuteAnimation: boolean;
}>`
  color: ${(prop) =>
    prop.$minuteColor ? prop.theme.colors.primary : prop.theme.fonts.primary};

  ${(props) =>
    props.$minuteAnimation &&
    css`
      animation: ${(props) => colorChange(props)} 3s normal;
    `}
`;

interface KeyboardProps {
  setHour: React.Dispatch<React.SetStateAction<number>>;
  hour: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
}

export default function NewAlarmClock({
  setHour,
  hour,
  setMinute,
  minute,
}: KeyboardProps) {

  const [hourColor, setHourColor] = useState(false);
  const [hourAnimation, setHourAnimation] = useState(true);
  const [hourCountdown, setHourCountdown] = useState<number>(5);

  const [minuteColor, setMinuteColor] = useState(false);
  const [minuteAnimation, setMinuteAnimation] = useState(true);
  const [minuteCountdown, setMinuteCountdown] = useState<number>(5);

  const { btnSoundEffect } = useSound();

  const numbersToEdit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const resetHourCountdown = () => {
    setHourCountdown(5);
    setHourAnimation(false);
    setHourColor(true);
  };

  const renderPrevHour = () => {
    if (hour === 0) {
      return 23;
    } else {
      return numbersToEdit.includes(hour - 1) ? `0${hour - 1}` : hour - 1;
    }
  };

  const renderNextHour = () => {
    if (hour === 23) {
      return "00";
    } else {
      return numbersToEdit.includes(hour + 1) ? `0${hour + 1}` : hour + 1;
    }
  };

  const resetMinuteCountdown = () => {
    setMinuteCountdown(5);
    setMinuteAnimation(false);
    setMinuteColor(true);
  };

  const renderPrevMinute = () => {
    if (minute === 0) {
      return 59;
    } else {
      return numbersToEdit.includes(minute - 1) ? `0${minute - 1}` : minute - 1;
    }
  };

  const renderNextMinute = () => {
    if (minute === 59) {
      return "00";
    } else {
      return numbersToEdit.includes(minute + 1) ? `0${minute + 1}` : minute + 1;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hourCountdown > 0) {
      timer = setTimeout(() => {
        setHourCountdown(hourCountdown - 1);
      }, 100);
    } else {
      setHourAnimation(true);
      setHourColor(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [hourCountdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (minuteCountdown > 0) {
      timer = setTimeout(() => {
        setMinuteCountdown(hourCountdown - 1);
      }, 100);
    } else {
      setMinuteAnimation(true);
      setMinuteColor(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [minuteCountdown]);



  return (
    <StyledTime>
      <StyledHourArea>
        <StyledTimeBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => {
            setHour((prevHour) => (prevHour === 0 ? 23 : prevHour - 1));
            resetHourCountdown();
          }}
        >
          {renderPrevHour()}
        </StyledTimeBtn>
        <StyledHour $hourColor={hourColor} $hourAnimation={hourAnimation}>
          {numbersToEdit.includes(hour) ? `0${hour}` : hour}
        </StyledHour>
        <StyledTimeBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => {
            setHour((prevHour) => (prevHour === 23 ? 0 : prevHour + 1));
            resetHourCountdown();
          }}
        >
          {renderNextHour()}
        </StyledTimeBtn>
      </StyledHourArea>
      :
      <StyledMinuteArea>
        <StyledTimeBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => {
            setMinute((prevMin) => (prevMin === 0 ? 59 : prevMin - 1));

            resetMinuteCountdown();
          }}
        >
          {renderPrevMinute()}
        </StyledTimeBtn>
        <StyledMinute
          $minuteColor={minuteColor}
          $minuteAnimation={minuteAnimation}
        >
          {numbersToEdit.includes(minute) ? `0${minute}` : minute}
        </StyledMinute>
        <StyledTimeBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => {
            setMinute((prevMin) => (prevMin === 59 ? 0 : prevMin + 1));
            resetMinuteCountdown();
          }}
        >
          {renderNextMinute()}
        </StyledTimeBtn>
      </StyledMinuteArea>
    </StyledTime>
  );
}
