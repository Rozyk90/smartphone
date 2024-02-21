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
  isLogin: boolean;
  fn: () => void;
}

export default function ActionBtn({ isLogin, fn }: BtnProps) {
  return (
    <StyledActionBtn>
      <StyledBtn
        onClick={() => {
          fn();
        }}
      >
        {isLogin ? "Zaloguj się" : "Zarejestruj się"}
      </StyledBtn>
    </StyledActionBtn>
  );
}
