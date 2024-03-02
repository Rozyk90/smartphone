import styled from "styled-components";

import googleplayicon from './googleplayicon.png';

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: white;
`;

const StyledImg = styled.img`
  margin-top: 2px;
  margin-left: 2px;

  width: 28px;
  height: 28px;
`;


export default function IconGooglePlay() {
  const klik = () => {
    console.log("klikam w to = sklep play");
  };
  return (
    <StyledIcon
      onClick={() => {
        klik();
      }}
    >
      <StyledImg  src={googleplayicon} alt="Google Play Icon" />
    </StyledIcon>
  );
}
