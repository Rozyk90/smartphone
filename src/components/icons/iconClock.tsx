import styled from "styled-components";

import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(96,85,213);
background: linear-gradient(175deg, rgba(96,85,213,1) 30%, rgba(63,76,155,1) 60%);
  color: white;
  cursor: pointer;

`;

export default function IconClock() {
  const klik = () => {
    console.log("klikam w to = zegarek");
  };
  return (
    <StyledIcon
      onClick={() => {
        klik();
      }}
    >
      <WatchLaterRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}
