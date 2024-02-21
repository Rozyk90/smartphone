import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";


import { enumClockSizes } from "../../../../../apps/clock/clock";
import Calendar from "../../../../../apps/calendar/calendar";
import Clock from "../../../../../apps/clock/clock";

import Finger from "./elements/finger";
import Inputs from "./elements/inputs";

import { updateScreenCountDown } from "../../../../../../redux/reducers/screen";

const StyledScreenBlockActive = styled.div`
  height: 100%;
  width: 100%;
`;
const StyledContainerClock = styled.div`
  padding-top: 100px;
  text-align: center;
  border: 1px solid green;
`;
const StyledContainerCalendar = styled.div`
  text-align: center;
  border: 1px solid blue;
`;
const StyledContainerLogin = styled.div`
  text-align: center;
  border: 1px solid orange;
  padding-top: 50px;
`;

export default function ScreenBlockActive() {
  const [showInputs, setShowInputs] = useState(false);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const shortTime = useAppSelector(state => state.screen.countDownTimerShort)

  const dispatch = useAppDispatch()

  const showInp = () => {
    dispatch(updateScreenCountDown(shortTime));
    setShowInputs(true);
  };

  return (
    <StyledScreenBlockActive>
      <StyledContainerClock>
        <Clock size={enumClockSizes.large} />
      </StyledContainerClock>
      <StyledContainerCalendar>
        <Calendar />
      </StyledContainerCalendar>
      <StyledContainerLogin>
        {!isLogged && showInputs && <Inputs />}

        {!showInputs && <Finger onClick={showInp} />}
      </StyledContainerLogin>
    </StyledScreenBlockActive>
  );
}
