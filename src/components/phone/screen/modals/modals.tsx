import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks";

import { enumCurrentModal } from "../../../../redux/reducers/modal";
import ModalTurnOffBtns from "./elements/modalTurnOffBtns/modalTurnOffBtns";

const StyledModals = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

export default function Modals() {
  const currentModal = useAppSelector((state) => state.modal.currentModal);

  return (
    <StyledModals>
      {currentModal === enumCurrentModal.modalTurnOffBtns && (
        <ModalTurnOffBtns />
      )}
    </StyledModals>
  );
}
