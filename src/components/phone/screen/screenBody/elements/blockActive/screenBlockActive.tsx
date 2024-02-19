import * as React from "react";
import styled from "styled-components";

import FingerprintIcon from "@mui/icons-material/Fingerprint";

import Clock from "../../../../../apps/clock/clock";
import { enumClockSizes } from "../../../../../apps/clock/clock";
import Calendar from "../../../../../apps/calendar/calendar";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { turnOnMid } from "../../../../../../redux/reducers/test";
import { useState } from "react";
import Finger from "./elements/finger";
import Inputs from "./elements/inputs";

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








  return (
    <StyledScreenBlockActive>
      <StyledContainerClock>
        <Clock size={enumClockSizes.large} />
      </StyledContainerClock>
      <StyledContainerCalendar>
        <Calendar />
      </StyledContainerCalendar>
      <StyledContainerLogin>


        <Inputs        />


        {/* <Finger/> */}
      </StyledContainerLogin>
    </StyledScreenBlockActive>
  );
}
