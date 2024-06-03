import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Title from "../../../../../../globalComponents/title";
import { countDownSetTimer } from "../../../../../../redux/reducers/screenParts/screenGeneral";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
`;

const StyledBtns = styled(RadioGroup)`
  && {
    margin-top: 50px;
    display: flex;
    gap: 20px;
  }
`;

const StyledLabel = styled(FormControlLabel)`
  && {
    border: none;
    border-radius: 14px;
    background: ${(prop) => prop.theme.colors.background};
    margin-left: 16px;
    cursor: pointer;
  }
`;
const StyledRadio = styled(Radio)`
  && {
    color: ${(props) => props.theme.colors.primary};
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function ScreenCountdown() {
  const { countDownTimerSelected } = useAppSelector(
    (state) => state.screen.general
  );
  const dispatch = useAppDispatch();

  type CountDownSelected = 15000 | 30000 | 60000 | 120000 | 300000 | 600000;
  const timers: CountDownSelected[] = [
    15000, 30000, 60000, 120000, 300000, 600000,
  ];


  return (
    <StyledBody>
      <Title title="Wygaszenie ekranu" />
      <StyledBtns>
        {timers.map((time) => (
          <StyledLabel
            key={time}
            checked={time === countDownTimerSelected}
            onClick={() => dispatch(countDownSetTimer(time))}
            value={time}
            control={<StyledRadio />}
            label={convertTime(time)}
          />
        ))}
      </StyledBtns>
    </StyledBody>
  );
}

const convertTime = (time: number): string => {
  switch (time) {
    case 15000:
      return "15 sec";
    case 30000:
      return "30 sec";
    case 60000:
      return "1 min";
    case 120000:
      return "2 min";
    case 300000:
      return "5 min";
    case 600000:
      return "10 min";
    default:
      return "Invalid time";
  }
};

export {convertTime}