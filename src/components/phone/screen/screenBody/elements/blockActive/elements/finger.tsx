import styled from "styled-components";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const StyledButton = styled(FingerprintIcon)`
  border: 2px solid red;
  cursor: pointer;
  margin-top: 300px;
  && {
    color: white;
    height: 60px;
    width: 60px;
  }
`;

interface ButtonProps {
  onClick: () => void;
}

export default function Finger(props: ButtonProps) {
  return (
    <StyledButton
      onClick={() => {
        props.onClick()
      }}
    />
  );
}
