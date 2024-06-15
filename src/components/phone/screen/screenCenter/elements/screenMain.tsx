import { useEffect, useState } from "react";
import styled from "styled-components";

import { enumIcons } from "../../../../icons/enumsIcon";
import RenderIcon from "../../../../icons/renderIcon";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateScreenGrid } from "../../../../../redux/reducers/screenParts/screenCenter";

const StyledScreenMain = styled.div`
  padding-top: 20px;
`;

const StyledIconsMap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: stretch;
  justify-content: stretch;
  height: 580px;
`;

interface PlaceDot {
  $withDot: boolean;
  $showDots: boolean;
}

const StyledPlace = styled.div<PlaceDot>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledShadow = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  border: 1px solid white;
  border-radius: 20px;
`;

const DotsId = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18];

const StyledDot = styled.div`
position: absolute;
  height: 2px;
  width: 2px;
  background: #ffffff;
  margin-top: 96px;
  margin-left: 76px;
`

const ScreenMain: React.FC = () => {
  const [enumToReplace, setEnumToReplace] = useState(enumIcons.empty);
  const [replaceFrom, setReplaceFrom] = useState<number | null>(null);
  const [shadow, setShadow] = useState<number | null>(null);

  const grid = useAppSelector((state) => state.screen.center.screenGrid);
  const dispatch = useAppDispatch();

  const handleStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    setReplaceFrom(id);
    setEnumToReplace(grid[id]);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    

    event.preventDefault();
    if ((shadow === null || shadow !== id) && replaceFrom !== null) {
      setShadow(id);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();

    const draggedTo = id;
    const placeEnum = grid[id];

    if (replaceFrom !== null && draggedTo !== null) {
      const updatedGrid = [...grid];

      updatedGrid[replaceFrom] = placeEnum;
      updatedGrid[draggedTo] = enumToReplace;

      dispatch(updateScreenGrid(updatedGrid));
      setEnumToReplace(enumIcons.empty);
      setReplaceFrom(null);
      setShadow(null);
    }
  };

  return (
    <StyledScreenMain>
      <StyledIconsMap>
        {grid.map((place, id) => (
          <StyledPlace
            $withDot={DotsId.includes(id)}
            $showDots={replaceFrom !== null}
            key={id}
            id={id + " miejsce"}
            onDragOver={(e) => handleDragOver(e, id)}
            onDrop={(e) => handleDrop(e, id)}
          >
            <RenderIcon
              id={id}
              isVissible={id !== replaceFrom}
              icon={grid[id]}
              handleStart={(e) => handleStart(e, id)}
            />

            {id === shadow && <StyledShadow />}
            {DotsId.includes(id)&&replaceFrom!==null&&<StyledDot/>}
          </StyledPlace>
        ))}
      </StyledIconsMap>
    </StyledScreenMain>
  );
};

export default ScreenMain;
