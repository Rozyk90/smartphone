import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { updateScreenCountDown } from "../../../redux/reducers/screen";

const StyledButtonTop1 = styled.div`
  position: absolute;
  right: -10px;
  top: 120px;
  width: 5px;
  height: 45px;
  background: #686868;
  border-top-right-radius: 2px;
  cursor: pointer;
`;

const StyledButtonTop2 = styled.div`
  position: absolute;
  right: -10px;
  top: 165px;
  width: 5px;
  height: 45px;
  background: #686868;
  border-bottom-right-radius: 2px;
  cursor: pointer;
`;

export default function VolumeBtns() {
  const { countDownTimer, countDownTimerShort } = useAppSelector(
    (state) => state.screen
  );
  const isLocked = useAppSelector((state) => state.basicStates.isLocked);
  const dispatch = useAppDispatch();

  const updateActiveScreen = () => {
    if (isLocked) {
      dispatch(updateScreenCountDown(countDownTimerShort));
    } else {
      dispatch(updateScreenCountDown(countDownTimer));
    }
  };

  return (
    <>
      <StyledButtonTop1
        onClick={() => {
          updateActiveScreen();
        }}
      />
      <StyledButtonTop2
        onClick={() => {
          updateActiveScreen();
        }}
      />
    </>
  );
}
