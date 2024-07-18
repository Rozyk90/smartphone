import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import {
  enumCurrentScreen,
  enumCurrentBarTop,
  enumCurrentBarBottom,
} from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";

import PhoneIcon from "@mui/icons-material/Phone";
import useSound from "../../customHooks/useSound";

const StyledIconBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: #01a463;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: #01a463;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function IconContacts({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();

  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.contacts));
    dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
    btnSoundEffect();
  };

  return isButton ? (
    <StyledIconBtn
      onClick={() => {
        fn();
      }}
    >
      <PhoneIcon fontSize="large" />
    </StyledIconBtn>
  ) : (
    <StyledIcon>
      <PhoneIcon fontSize="large" />
    </StyledIcon>
  );
}