import { useEffect, useState } from "react";
import styled from "styled-components";

import IconSettings from "../../../../icons/settingsIcon";

const StyledScreenMain = styled.div`
  border: 2px solid green;
  padding-top: 20px;
`;

const StyledIconsMap = styled.div`
  border: 2px solid pink;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 520px;
`;
const StyledPlace = styled.div`
  border: 2px solid orange;
  height: 19%;
  width: 23%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

interface StyledIconProps {
  $isVisible: boolean;
}

const StyledIcon = styled.div<StyledIconProps>`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0.01)};
`;

const StyledShadow = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  border: 1px solid white;
  border-radius: 20px;
`;

const StyledDolnyElement = styled.div`
  border: 2px solid blue;
  height: 50px;
`;

const ScreenMain: React.FC = () => {
  const [siatka, setSiatka] = useState([
    [],
    [],
    [],
    ["x"],
    [],
    [],
    [],
    ["x"],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [removeFrom, setRemoveFrom] = useState<number | null>(null);
  const [shadow, setShadow] = useState<number | null>(null);

  const handleStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    // event.dataTransfer.setData("text/plain", id.toString());
    setRemoveFrom(id);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    event.preventDefault();
    if (shadow === null || shadow !== id) {
      setShadow(id);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    const draggedFrom = removeFrom;
    const draggedTo = id;

    if (draggedFrom !== null && draggedTo !== null) {
      const updatedSiatka = [...siatka];
      updatedSiatka[draggedFrom] = [];
      updatedSiatka[draggedTo] = ["x"];

      setSiatka(updatedSiatka);
      setRemoveFrom(null);
      setShadow(null);
    }
  };

  return (
    <StyledScreenMain>
      <StyledIconsMap>
        {siatka.map((pole, id) => (
          <StyledPlace
            key={id}
            id={id + " miejsce"}
            onDragOver={(e) => handleDragOver(e, id)}
            onDrop={(e) => handleDrop(e, id)}
          >
            {pole.length > 0 && (
              <StyledIcon
                key={id}
                draggable
                onDragStart={(e) => handleStart(e, id)}
                $isVisible={id !== removeFrom}
              >
                <IconSettings />
              </StyledIcon>
            )}
            {id === shadow && <StyledShadow />}
          </StyledPlace>
        ))}
      </StyledIconsMap>
      <StyledDolnyElement>dolny</StyledDolnyElement>
    </StyledScreenMain>
  );
};

export default ScreenMain;
