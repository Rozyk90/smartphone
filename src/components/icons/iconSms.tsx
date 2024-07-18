import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";

import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  enumCurrentScreen,
} from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import useSound from "../../customHooks/useSound";

const StyledIconBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: white;
  color: #2a6c97;
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
  background: white;
  color: #2a6c97;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function IconSms({ isButton = true }: { isButton?: boolean }) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.sms));
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
      <QuestionAnswerIcon fontSize="large" />
    </StyledIconBtn>
  ) : (
    <StyledIcon>
      <QuestionAnswerIcon fontSize="large" />
    </StyledIcon>
  );
}
