import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledActionBtn = styled.div`
  height: 50px;
`;

const StyledBtn = styled(Button)`
  && {
    color: white;
    transition: 0.5s;
    font-weight: bold;
    &:hover {
      color: #2196f3;
      background: #ffffffe1;
    }
  }
`;

interface BtnProps {
  txt: string;
  fn: () => void;
}

export default function ActionBtn({ txt, fn }: BtnProps) {
  return (
    <StyledActionBtn>
      <StyledBtn
        onClick={() => {
          fn();
        }}
      >
        {txt}
      </StyledBtn>
    </StyledActionBtn>
  );
}
