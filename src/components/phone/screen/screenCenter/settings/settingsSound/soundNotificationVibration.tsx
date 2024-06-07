import styled from "styled-components";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Title from "../../../../../../globalComponents/title";

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

export default function SoundNotificationVibration() {
  const sounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return <StyledBody><Title title="Wibracja powiadomienia"/>
      <StyledBtns>
        {sounds.map((sound) => (
          <StyledLabel
            key={sound}
            // checked={time === countDownTimerSelected}
            // onClick={() => dispatch(countDownSetTimer(time))}
            value={sound}
            control={<StyledRadio />}
            label={sound}
          />
        ))}
      </StyledBtns>
  </StyledBody>;
}