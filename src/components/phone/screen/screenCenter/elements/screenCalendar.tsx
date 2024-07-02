import styled from "styled-components";
import React, { useState } from "react";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  max-height: 600px;
  padding: 8px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledYearControl = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
  color: ${(prop) => prop.theme.colors.primary};
  cursor: pointer;
`;

const StyledMonthsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  height: 540px;
  max-height: 540px;
  min-height: 540px;
  width: 100%;
`;

const StyledMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 92px;
  min-height: 120px;
  max-height: 120px;
`;

const StyledMonthName = styled.div`
  font-weight: bold;
`;

const StyledWeekDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 5px;
`;

const StyledDayName = styled.div<{ $isN: boolean }>`
  font-size: 0.65rem;
  font-weight: bold;
  width: 11px;
  color: ${(props) => (props.$isN ? props.theme.declain : "inherit")};
`;

const StyledDaysGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 5px;
`;

const StyledDay = styled.div<{ $today: boolean }>`
  background: ${(props) => (props.$today ? props.theme.backgrounds.off : "inherit")};
  font-size: 0.5rem;
  font-weight: bold;
  width: 11px;
  color: ${(props) => (props.$today ? props.theme.white : "inherit")};
  border-radius: 2px;
`;

const daysOfWeek: string[] = ["p", "w", "ś", "c", "p", "s", "n"];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

const isToday = (year: number, month: number, day: number): boolean => {
  const today = new Date();
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate()
  );
};

const ScreenCalendar: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const months: string[] = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const incrementYear = (): void => setYear(year + 1);
  const decrementYear = (): void => setYear(year - 1);

  const renderMonth = (month: number, year: number): JSX.Element => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, () => null);

    return (
      <StyledMonthContainer key={month}>
        <StyledMonthName>{months[month]}</StyledMonthName>
        <StyledWeekDays>
          {daysOfWeek.map((day, index) => (
            <StyledDayName $isN={day === "n"} key={index}>
              {day}
            </StyledDayName>
          ))}
        </StyledWeekDays>
        <StyledDaysGrid>
          {emptyDays.map((_, index) => (
            <StyledDay key={index} $today={false}></StyledDay>
          ))}
          {daysArray.map((day, index) => (
            <StyledDay
              key={index}
              $today={isToday(year, month, day)}
            >
              {day}
            </StyledDay>
          ))}
        </StyledDaysGrid>
      </StyledMonthContainer>
    );
  };

  return (
    <StyledBody>
      <StyledYearControl>
        <StyledButton onClick={decrementYear}>
          <ArrowBackIosRoundedIcon />
        </StyledButton>
        <span>{year}</span>
        <StyledButton onClick={incrementYear}>
          <ArrowForwardIosRoundedIcon />
        </StyledButton>
      </StyledYearControl>
      <StyledMonthsGrid>
        {months.map((month, index) => renderMonth(index, year))}
      </StyledMonthsGrid>
    </StyledBody>
  );
};

export default ScreenCalendar;
