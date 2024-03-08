import styled from "styled-components";

import googleplayicon from "./googleplayicon.png";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(229, 52, 19);
  background: linear-gradient(
    342deg,
    rgba(229, 52, 19, 1) 30%,
    rgba(220, 41, 97, 1) 60%
  );
  color: white;
  cursor: pointer;

`;

export default function IconShop() {
  const klik = () => {
    console.log("klikam w to = sklep play");
  };
  return (
    <StyledIcon
      onClick={() => {
        klik();
      }}
    >
      <LocalMallIcon fontSize="large" />
    </StyledIcon>
  );
}
