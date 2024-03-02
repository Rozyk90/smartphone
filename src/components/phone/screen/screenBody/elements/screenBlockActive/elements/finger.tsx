import styled from "styled-components";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const StyledButton = styled(FingerprintIcon)`
  border: 2px solid red;
  cursor: pointer;
  margin-top: 200px;
  margin-bottom: 50px;
  && {
    color: white;
    height: 60px;
    width: 60px;
  }
`;

interface BtnProps {
  onClick: () => void;
}

export default function Finger(props: BtnProps) {
  return (
    <StyledButton
      onClick={() => {
        props.onClick()
      }}
    />
  );
}
