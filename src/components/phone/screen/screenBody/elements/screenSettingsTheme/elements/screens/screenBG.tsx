import styled from "styled-components";
import backgrounds from "../../../../../../../../theme/backgrounds";

interface StyledBGprops {
  $darkMode: boolean;
  $group: "gradients" | "photos";
  $id: number;
}

const StyledScreen = styled.button<StyledBGprops>`
  cursor: pointer;
  border: none;
  min-width: 60px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: ${({ $darkMode }) => ($darkMode ? "none" : "5px 5px 5px gray")};
  background: ${({ $group, $id }) =>
    $group === "gradients"
      ? backgrounds.gradients[$id].content
      : `url(${backgrounds.photos[$id].content}) center/cover`};
`;

interface BGprops {
  group: "gradients" | "photos";
  id: number;
  darkMode: boolean;
  setNewBg: () => void;
}

const ScreenBG: React.FC<BGprops> = ({ group, id, darkMode, setNewBg }) => {
  return (
    <StyledScreen
      onClick={() => setNewBg()}
      $group={group}
      $id={id}
      $darkMode={darkMode}
    />
  );
};

export default ScreenBG;
