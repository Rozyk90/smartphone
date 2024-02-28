import styled from "styled-components";

import SettingsIcon from "@mui/icons-material/Settings";

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: radial-gradient(
    circle,
    rgba(41, 58, 101, 1) 30%,
    rgba(50, 71, 91, 1) 60%
  );
  color: white;
`;

export default function IconSettings() {
  const klik = () => {
    console.log("klikam w to");
  };
  return (
    <StyledIcon
      onClick={() => {
        klik();
      }}
    >
      <SettingsIcon fontSize="large" />
    </StyledIcon>
  );
}
