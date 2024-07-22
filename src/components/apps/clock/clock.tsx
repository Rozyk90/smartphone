import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useDate from "../../../customHooks/useDate";
import { enumCurrentModal, modalTurnOn, setCurrentModal } from "../../../redux/reducers/modal";
import { timerReset } from "../../../redux/reducers/clock/timer";

const StyledClock = styled.div``;

const StyledClockSmall = styled.div`
  font-size: 12px;
`;
const StyledClockLarge = styled.div`
  font-size: 45px;
  color: ${prop => prop.theme.white};
`;

export enum enumClockSizes {
  small = "small",
  large = "large",
}

type Sizes = {
  size: enumClockSizes;
};

export default function Clock(props: Sizes) {
  const {getPolishTime,getUnixTime} = useDate()
  const [time, setTime] = useState(getUnixTime());

  const {isRunning,unixtimeWhenRing,breaks} = useAppSelector(state => state.clock.timer)
const dispatch = useAppDispatch()

  const hour = getPolishTime(time).hours
  const min = getPolishTime(time).minutes

  const breaksTime = breaks.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );







  useEffect(() => {

    if(getUnixTime()>unixtimeWhenRing + breaksTime && isRunning){
      dispatch(setCurrentModal(enumCurrentModal.modalAlarmRinging))
      dispatch(modalTurnOn())
      dispatch(timerReset())
    }


    const updateTime = () => {
      setTime(getUnixTime);
    };

    const clock = setTimeout(updateTime, 1000);

    return () => clearTimeout(clock);
  }, [time,unixtimeWhenRing,isRunning]);

  return (
    <StyledClock>
      {props.size === "small" ? (
        <StyledClockSmall>
          {hour}:{min}
        </StyledClockSmall>
      ) : (
        <StyledClockLarge>
          {hour}:{min}
        </StyledClockLarge>
      )}
    </StyledClock>
  );
}
