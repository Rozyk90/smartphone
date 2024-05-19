import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const StyledPagination = styled.div`
  padding: 5px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledBtnLeft = styled(ArrowBackIosRoundedIcon)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.off};
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
`;
const StyledBtnRight = styled(ArrowForwardIosRoundedIcon)<{
  $isActive: boolean;
}>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.off};
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
`;

const StyledPageDot = styled.div<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.off};
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

type Prop = {
  page: number;
  length: number;
  fnPreviousPage: () => void;
  fnNextPage: () => void;
};

export default function Paggination({
  page,
  length,
  fnPreviousPage,
  fnNextPage,
}: Prop) {
  const renderPageDots = () => {
    const dots = [];
    for (let i = 1; i <= length / 4; i++) {
      dots.push(<StyledPageDot $isActive={page === i} key={i} />);
    }
    return dots;
  };

  return (
    <StyledPagination>
      <StyledBtnLeft onClick={fnPreviousPage} $isActive={page > 1} />

      {renderPageDots()}
      <StyledBtnRight onClick={fnNextPage} $isActive={page < length / 4} />
    </StyledPagination>
  );
}
