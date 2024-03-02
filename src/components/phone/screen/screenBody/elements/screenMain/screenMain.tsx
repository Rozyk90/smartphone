import { useEffect, useState } from "react";
import styled from "styled-components";

import IconSettings from "../../../../../icons/iconSettings";
import IconGooglePlay from "../../../../../icons/iconGooglePlay";
import { enumIcons } from "../../../../../icons/iconEnum";

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

interface PlaceDot {
  $withDot: boolean;
  $showDots: boolean;
}

const StyledPlace = styled.div<PlaceDot>`
  height: 19%;
  width: 24%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${(props) =>
    props.$withDot &&
    props.$showDots &&
    `
    &:after {
      content: "";
      width: 2px;
      height: 2px;
      right:0px;
      bottom:-2px;
      background-color: #ffffff;
      position: absolute;
    }
  `}
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

const DotsId = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18];

const ScreenMain: React.FC = () => {
  const [siatka, setSiatka] = useState([
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.appShop,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.settings,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
    enumIcons.empty,
  ]);

  const [removeFrom, setRemoveFrom] = useState<number | null>(null);
  const [enumToPut,setEnumToPut] = useState(enumIcons.empty)
  const [shadow, setShadow] = useState<number | null>(null);

  const handleStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    setRemoveFrom(id);
    setEnumToPut(siatka[id])
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    event.preventDefault();
    if ((shadow === null || shadow !== id) && removeFrom !== null) {
      setShadow(id);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    const draggedFrom = removeFrom;
    const draggedTo = id;

    if (draggedFrom !== null && draggedTo !== null) {
      const updatedSiatka = [...siatka];
      updatedSiatka[draggedFrom] = enumIcons.empty;
      updatedSiatka[draggedTo] = enumToPut;

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
            $withDot={DotsId.includes(id)}
            $showDots={removeFrom !== null}
            key={id}
            id={id + " miejsce"}
            onDragOver={(e) => handleDragOver(e, id)}
            onDrop={(e) => handleDrop(e, id)}
          >
            {siatka[id] === enumIcons.settings && (
              <StyledIcon
                key={id}
                draggable
                onDragStart={(e) => handleStart(e, id)}
                $isVisible={id !== removeFrom}
              >
                <IconSettings />
              </StyledIcon>
            )}
            {siatka[id] === enumIcons.appShop && (
              <StyledIcon
                key={id}
                draggable
                onDragStart={(e) => handleStart(e, id)}
                $isVisible={id !== removeFrom}
              >
                <IconGooglePlay />
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
