import styled from "styled-components";
import { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
const StyledBody = styled.div`
  height: 550px;
`;

const StyledPhoneNumber = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 3rem;
  padding-bottom: 20px;
  color: ${(prop) => prop.theme.fonts.primary};
`;

const keyboardSings = [
  { sign: "1", description: " " },
  { sign: "2", description: "ABC" },
  { sign: "3", description: "DEF" },
  { sign: "4", description: "GHI" },
  { sign: "5", description: "JKL" },
  { sign: "6", description: "MNO" },
  { sign: "7", description: "PQRS" },
  { sign: "8", description: "TUV" },
  { sign: "9", description: "WXYZ" },
  { sign: "*", description: "" },
  { sign: "0", description: "WXYZ" },
  { sign: "#", description: "" },
];

const StyledNumbersArea = styled.div`
  height: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledBtn = styled.button`
  border: none;
  border-radius: 50%;
  background: none;
  height: 60px;
  width: 60px;
  margin: 0px 10px;
  cursor: pointer;
`;

const StyledSign = styled.div`
  font-size: 2rem;
  color: ${(prop) => prop.theme.fonts.primary};
`;
const StyledDescription = styled.div`
  height: 10px;
  font-size: 0.7rem;
  color: ${(prop) => prop.theme.fonts.secondary};
`;

const StyledBottomBtnsArea = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledEmptyDiv = styled.div`
  width: 50px;
`;

const StyledCallBtn = styled.div`
  height: 50px;
  width: 50px;
  background: ${(prop) => prop.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(prop) => prop.theme.white};
  cursor: pointer;
`;

const StyledDelBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(prop) => prop.theme.fonts.primary};

`;

export default function Keyboard() {
  const [number, setNumber] = useState("");
  const handleNumberClick = (sign: string) => {
    if (number.length < 9) {
      setNumber((prevNumber) => prevNumber + sign);
    }
  };

  const handleDelete = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
  };
  return (
    <StyledBody>
      <StyledPhoneNumber>{number}</StyledPhoneNumber>

      <StyledNumbersArea>
        {keyboardSings.map((sign) => (
          <StyledBtn
            key={sign.sign}
            onClick={() => handleNumberClick(sign.sign)}
          >
            <StyledSign>{sign.sign}</StyledSign>
            <StyledDescription>{sign.description}</StyledDescription>
          </StyledBtn>
        ))}
      </StyledNumbersArea>

      <StyledBottomBtnsArea>
        <StyledEmptyDiv />
        <StyledCallBtn>
          <PhoneIcon />
        </StyledCallBtn>
        <StyledDelBtn onClick={handleDelete}>
          <BackspaceRoundedIcon />
        </StyledDelBtn>
      </StyledBottomBtnsArea>
    </StyledBody>
  );
}
