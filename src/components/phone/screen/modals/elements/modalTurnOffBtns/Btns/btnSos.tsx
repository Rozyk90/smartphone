import styled from "styled-components";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { useAppSelector,useAppDispatch } from "../../../../../../../redux/hooks";

import { enumModalTurnOffBtnsFocus, setTurnOffBtnsFocus } from "../../../../../../../redux/reducers/modal";

const StyledBtn = styled.div<{ $visible: boolean; $focused: boolean }>`
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  color: ${prop=>prop.theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  transition: 0.5s;
  scale: ${(prop) => (prop.$focused ? 1.3 : 1)};
  z-index: ${props => props.$focused?1:0};
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
  const focused = focus === enumModalTurnOffBtnsFocus.sos;
  const visible = focus === enumModalTurnOffBtnsFocus.sos || focus === enumModalTurnOffBtnsFocus.all;
 
  const dispatch = useAppDispatch()
  const click = (e: React.MouseEvent) => {
    e.stopPropagation();


    if(visible){
        dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.sos));
    }

  };
  return (
    <StyledBtn $focused={focused} $visible={visible}>
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
