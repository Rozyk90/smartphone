import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledCalendar = styled.div`
  color: ${prop => prop.theme.white};
`;

export default function Calendar() {
  const now = new Date();
  const [date, setDate] = useState(now);
  const options = {
    weekday: "short" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

  const dateCalendar = date.toLocaleDateString("pl-PL", options);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDate(now);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <StyledCalendar>{dateCalendar}</StyledCalendar>;
}
