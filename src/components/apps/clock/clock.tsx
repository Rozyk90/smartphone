import { useEffect, useState } from "react";
import styled from "styled-components";

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
  const now = new Date();
  const [time, setTime] = useState(now);

  const hour = time.getHours();
  const min = time.getMinutes();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledClock>
      {props.size === "small" ? (
        <StyledClockSmall>
          {hour}:{min < 10 ? `0${min}` : min}
        </StyledClockSmall>
      ) : (
        <StyledClockLarge>
          {hour}:{min < 10 ? `0${min}` : min}
        </StyledClockLarge>
      )}
    </StyledClock>
  );
}
