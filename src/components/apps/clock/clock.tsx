import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import useDate from "../../../customHooks/useDate";

const StyledClock = styled.div``;

const StyledClockSmall = styled.div`
  font-size: 12px;
`;
const StyledClockLarge = styled.div`
  font-size: 45px;
  color: white;
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

  const {isRunning,unixtimeWhenRing} = useAppSelector(state => state.clock.timer)

  const hour = getPolishTime(time).hours
  const min = getPolishTime(time).minutes









  useEffect(() => {
    console.log("sprawdzam",getUnixTime()>unixtimeWhenRing)



    const updateTime = () => {
      setTime(getUnixTime);
    };

    const clock = setTimeout(updateTime, 1000);

    return () => clearTimeout(clock);
  }, [time]);

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
