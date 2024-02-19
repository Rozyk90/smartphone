import styled from "styled-components";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { useAppSelector,useAppDispatch } from "../../../../../../../redux/hooks";

import { enumModalTurnOffBtnsFocus, setTurnOffBtnsFocus } from "../../../../../../../redux/reducers/modal";
import {
  enumCurrentScreen,
  setCurrentScreen,
  updateScreenCountDown,
  setStopCountingDown,
  screenTurnOff,
} from "../../../../../../../redux/reducers/screen";


const StyledBtn = styled.div<{ visible: string; focused: string }>`
  opacity: ${(props) => (props.visible==='true' ? "1" : "0")};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  transition: 0.5s;
  scale: ${(prop) => (prop.focused==='true' ? 1.3 : 1)};
  z-index: ${props => props.focused==='true'?1:0};
`;

const StyledBackgroundIcon = styled.button`
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 35%;
  background: #d93f35;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const StyledSOS = styled.div`
  position: absolute;
  top: 6px;
  right: 5px;
  color: white;
  font-size: 9px;
`;


export default function BtnSos() {
  const focus = useAppSelector(state => state.modal.turnOffBtnsFocus)
  const shortTime = useAppSelector(state => state.screen.countDownTimerShort)
  
  const focused = focus === enumModalTurnOffBtnsFocus.sos;
  const visible = focus === enumModalTurnOffBtnsFocus.sos || focus === enumModalTurnOffBtnsFocus.all;
 
  const dispatch = useAppDispatch()
  const click = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateScreenCountDown(shortTime));

    if(visible){
        dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.sos));
    }

  };
  return (
    <StyledBtn focused={focused.toString()} visible={visible.toString()}>
      <StyledBackgroundIcon
        onClick={(e) => {
          click(e);
        }}
      >
        <CallRoundedIcon sx={{ color: "white", fontSize: "35px" }} />
        <StyledSOS>SOS</StyledSOS>
      </StyledBackgroundIcon>
      Połączenia alarmowe
    </StyledBtn>
  );
}
