import styled from "styled-components";

import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { resetScreenCountingDownShort } from "../../redux/reducers/screenParts/screenGeneral";

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: radial-gradient(
    circle,
    rgba(41, 58, 101, 1) 30%,
    rgba(50, 71, 91, 1) 60%
  );
  color: white;
  cursor: pointer;

`;

export default function IconSettings() {
  const dispatch = useAppDispatch()
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettings))
  };
  return (
    <StyledIcon
      onClick={() => {
        fn();
      }}
    >
      <SettingsIcon fontSize="large" />
    </StyledIcon>
  );
}
