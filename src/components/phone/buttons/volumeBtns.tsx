import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { resetScreenCountingDownShort } from "../../../redux/reducers/screenParts/screenGeneral";

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
  const isLocked = useAppSelector((state) => state.basicStates.isLocked);
  const dispatch = useAppDispatch();

  const updateActiveScreen = () => {
    if (isLocked) {
      dispatch(resetScreenCountingDownShort());
    } else {
      dispatch(resetScreenCountingDownShort());
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
