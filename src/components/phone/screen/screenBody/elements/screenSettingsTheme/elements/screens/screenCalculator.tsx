import styled from "styled-components";
import { useAppSelector } from "../../../../../../../../redux/hooks";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const StyledCalculator = styled.div<{ $darkMode: boolean }>`
  width: 110px;
  height: 230px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: ${({ $darkMode }) => ($darkMode ? "none" : "5px 5px 5px gray")};
`;

const StyledCalcScreen = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 12px;
  border-bottom: 1px solid gray;
  height: 70px;
  margin: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: end;
  align-items: end;
  flex-direction: column;
  gap: 10px;
`;

const StyledCalcToAdd = styled.div`
  font-weight: 600;
`;

const StyledDelBtn = styled(BackspaceOutlinedIcon)`
  && {
    font-size: 10px;
  }
`;

const StyledCalcBtnsArea = styled.div`
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;
const BtnsArr = [
  "( )",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "+/-",
  "0",
  ".",
];

const StyledCalcBtnC = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.declain};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledCalcBtn = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.colors.primary};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledCalcBtnEqual = styled.div`
  background: ${(prop) => prop.theme.colors.primary};
  color: ${(prop) => prop.theme.colors.onPrimary};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ScreenCalculator() {
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <StyledCalculator $darkMode={darkMode}>
      <StyledCalcScreen>
        <StyledCalcToAdd>235+650+375</StyledCalcToAdd>
        1260
        <StyledDelBtn />
      </StyledCalcScreen>

      <StyledCalcBtnsArea>
        <StyledCalcBtnC>C</StyledCalcBtnC>
        {BtnsArr.map((txt) => (
          <StyledCalcBtn>{txt}</StyledCalcBtn>
        ))}
        <StyledCalcBtnEqual>=</StyledCalcBtnEqual>
      </StyledCalcBtnsArea>
    </StyledCalculator>
  );
}
