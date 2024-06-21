import styled, { keyframes } from "styled-components";

import CallIcon from "@mui/icons-material/Call";
import SmsIcon from "@mui/icons-material/Sms";
import InfoIcon from "@mui/icons-material/Info";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import useSound from "../../../../../../customHooks/useSound";
import { setContactToEdit } from "../../../../../../redux/reducers/contacts";
import useScreen from "../../../../../../customHooks/useScreen";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  90% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledHiddenBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.4s forwards;
`;

const StyledNumber = styled.div`
  padding-bottom: 10px;
  color: ${(prop) => prop.theme.fonts.primary};
  font-weight: bold;
  font-size: 0.8rem;
`;

const StyledBtns = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
`;

const StyledIconBtn = styled.button`
  background: ${(prop) => prop.theme.colors.primary};
  color: ${(prop) => prop.theme.colors.onPrimary};
  border: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type Prop = {
  phoneNumber: string;
};

export default function HiddenElement({ phoneNumber }: Prop) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();

  const editContact = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.newContact));
    dispatch(setContactToEdit({ name: "brak", number: "brak" }));
    pushCurrentScreen();
  };

  const formatPhoneNumber = (number: string) => {
    return number.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <StyledHiddenBar>
      <StyledNumber>Telefon: {formatPhoneNumber(phoneNumber)}</StyledNumber>
      <StyledBtns>
        <StyledIconBtn>
          <CallIcon />
        </StyledIconBtn>
        <StyledIconBtn>
          <SmsIcon />
        </StyledIconBtn>
        <StyledIconBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => editContact()}
        >
          <InfoIcon />
        </StyledIconBtn>
      </StyledBtns>
    </StyledHiddenBar>
  );
}
