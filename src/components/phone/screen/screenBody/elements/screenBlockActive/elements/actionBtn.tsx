import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledBtn = styled(Button)`
margin-top: 20px;
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
    <StyledBtn
      onClick={() => {
        fn();
      }}
    >
      {txt}
    </StyledBtn>
  );
}
