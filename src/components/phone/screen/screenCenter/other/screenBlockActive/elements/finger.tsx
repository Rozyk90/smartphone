import styled from "styled-components";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const StyledButton = styled(FingerprintIcon)`
  cursor: pointer;
  && {
    color: ${(prop) => prop.theme.fonts.primary};
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
        props.onClick();
      }}
    />
  );
}
