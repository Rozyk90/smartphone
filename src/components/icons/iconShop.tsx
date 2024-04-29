import styled from "styled-components";


import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useAppDispatch } from "../../redux/hooks";

import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import { resetScreenCountingDownShort } from "../../redux/reducers/screenParts/screenGeneral";

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(229, 52, 19);
  background: linear-gradient(
    342deg,
    rgba(229, 52, 19, 1) 30%,
    rgba(220, 41, 97, 1) 60%
  );
  color: white;
  cursor: pointer;

`;

export default function IconShop() {
  const dispatch = useAppDispatch()
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenShop))
  };
  return (
    <StyledIcon
      onClick={() => {
        fn();
      }}
    >
      <LocalMallIcon fontSize="large" />
    </StyledIcon>
  );
}
