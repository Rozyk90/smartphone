import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledBtn = styled(Button)`
  && {
    color: #1976d2;
    transition: 0.5s;
    font-weight: bold;
    &:hover {
      color: white;
      background: #1976d2;
    }
  }
`;

interface BtnProps {
  txt: string;
  fn: () => void;
}

export default function ActionBtn({ txt, fn }: BtnProps) {
  return (
    <StyledBtn
      onClick={() => {
        fn();
      }}
    >
      {txt}
    </StyledBtn>
  );
}
