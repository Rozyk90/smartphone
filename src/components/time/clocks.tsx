import { useEffect, useState } from "react";
import styled from "styled-components";
import useDate from "../../customHooks/useDate";

const StyledClock = styled.div``;

const StyledClockSmall = styled.div`
  font-size: 12px;
`;
const StyledClockLarge = styled.div`
  font-size: 45px;
  color: ${(prop) => prop.theme.white};
`;

export enum enumClockSizes {
  small = "small",
  large = "large",
}

type Sizes = {
  size: enumClockSizes;
};

export default function Clock(props: Sizes) {
  const { getPolishTime, getUnixTime } = useDate();
  const [time, setTime] = useState(getUnixTime());

  const hour = getPolishTime(time).hours;
  const min = getPolishTime(time).minutes;

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTime(getUnixTime());
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [getUnixTime]);

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
