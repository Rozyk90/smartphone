import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";

import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const StyledBody = styled.div<{ $darkMode: boolean }>`
  background: ${(prop) => prop.theme.backgrounds.primary};
  width: 210px;
  height: 330px;
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

const StyledResult = styled.div``;

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

const StyledCalcBtnC = styled.button`
  border: none;
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.declain};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalcBtn = styled.button`
  border: none;
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.colors.primary};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalcBtnEqual = styled.button`
  border: none;
  background: ${(prop) => prop.theme.colors.primary};
  color: ${(prop) => prop.theme.colors.onPrimary};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnsArr = [
  "%",
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
  "0",
  ".",
];

export default function Calculator() {
  const { darkMode } = useAppSelector((state) => state.theme);

  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleButtonClick = (value: string) => {
    // Obsługa kliknięcia na "="
    if (value === '=') {
      handleCalculate(); // Oblicz wynik
    } else if (['+', '-', '*', '/','%'].includes(value)) {
      // Obsługa kliknięcia na operatory +, -, *, /
      if (input !== '') {
        setInput(input + value); // Dodaj operator do input
        setResult(null)
      } else if (result !== null) {
        setInput(result.toString() + value); // Jeśli jest wynik, dodaj operator do wyniku
      }
    } else {
      setInput(input + value); // Dodaj cyfrę lub znak do input
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      const calculationResult = evaluateExpression(input);
      setResult(calculationResult);
      setInput(''); // Wyczyść input po obliczeniu
    } catch (error) {
      setResult(null);
      alert('Błąd w obliczeniach');
    }
  };

  const evaluateExpression = (expression: string): number => {
    // Usunięcie białych znaków
    expression = expression.replace(/\s+/g, "");

    // Dodanie obsługi procentów
    expression = expression.replace(/(\d+)%/g, (_, num) =>
      String(Number(num) / 100)
    );

    // Parsowanie wyrażenia z uwzględnieniem nawiasów
    const parse = (): number => {
      let stack: number[] = [];
      let num = "";
      let op = "+";

      const applyOperator = (
        operator: string,
        operand1: number,
        operand2: number
      ): number => {
        switch (operator) {
          case "+":
            return operand1 + operand2;
          case "-":
            return operand1 - operand2;
          case "*":
            return operand1 * operand2;
          case "/":
            return operand1 / operand2;
          default:
            throw new Error("Invalid operator");
        }
      };

      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (!isNaN(Number(char)) || char === ".") {
          num += char;
        } else if (char === "(") {
          let j = i;
          let braces = 1;
          while (braces > 0) {
            j++;
            if (expression[j] === "(") braces++;
            if (expression[j] === ")") braces--;
          }
          num = String(evaluateExpression(expression.slice(i + 1, j)));
          i = j;
        } else {
          if (num) {
            stack.push(op === "-" ? -Number(num) : Number(num));
            num = "";
          }
          if (char === "+" || char === "-") {
            op = char;
          } else if (char === "*" || char === "/") {
            let nextNum = "";
            let j = i + 1;
            while (
              j < expression.length &&
              (!isNaN(Number(expression[j])) || expression[j] === ".")
            ) {
              nextNum += expression[j];
              j++;
            }
            i = j - 1;
            const lastNum = stack.pop() as number;
            stack.push(applyOperator(char, lastNum, Number(nextNum)));
          }
        }
      }
      if (num) {
        stack.push(op === "-" ? -Number(num) : Number(num));
      }
      return stack.reduce((acc, cur) => acc + cur, 0);
    };

    return parse();
  };


  return (
    <StyledBody $darkMode={darkMode}>
      <StyledCalcScreen>
        <StyledCalcToAdd>{input || "0"}</StyledCalcToAdd>
        <StyledResult>{result !== null && result} </StyledResult>
        <StyledDelBtn />
      </StyledCalcScreen>

      <StyledCalcBtnsArea>
        <StyledCalcBtnC onClick={() => handleClear()}>C</StyledCalcBtnC>
        {BtnsArr.map((txt, id) => (
          <StyledCalcBtn onClick={() => handleButtonClick(txt)} key={id}>
            {txt}
          </StyledCalcBtn>
        ))}
        <StyledCalcBtnEqual onClick={() => handleCalculate()}>
          =
        </StyledCalcBtnEqual>
      </StyledCalcBtnsArea>
    </StyledBody>
  );
}
