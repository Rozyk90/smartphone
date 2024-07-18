import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const StyledBody = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 300px;
  left: 40px;
`;

const zoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledTxt = styled.div`
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-family: cursive;
  font-weight: 900;
  font-size: 3rem;
  color: rgb(255, 170, 13);
  animation: ${zoomInOut} 2s ease-in-out infinite;
`;

interface prop {
  resetGame:()=>void;
}

export default function App({resetGame}:prop) {

  useEffect(()=>{
    const timer = setTimeout(() => {
      resetGame();
    }, 7000);

    return () => clearTimeout(timer);
  },[])

  return (
    <StyledBody>
      <StyledTxt>Gratulacje</StyledTxt>
    </StyledBody>
  );
}
