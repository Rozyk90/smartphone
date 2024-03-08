import styled from "styled-components";

import { enumIcons } from "../../../../../../icons/enumsIcon";


import IconShop from "../../../../../../icons/iconShop";
import IconSettings from "../../../../../../icons/iconSettings";
import IconClock from "../../../../../../icons/iconClock";
import IconCalendar from "../../../../../../icons/iconCalendar";


interface StyledIconProps {
  $isVisible: boolean;
}

const StyledIcon = styled.div<StyledIconProps>`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0.2)};
`;

interface RenderIconProps {
    id: number;
    isVissible:boolean
    icon: enumIcons;
    handleStart: (e:any, id: number) => void;
  }
  
  export default function RenderIcon({ id, isVissible, icon, handleStart }: RenderIconProps) {
    return (
      <StyledIcon
        draggable
        onDragStart={(e) => handleStart(e, id)}
        $isVisible={isVissible}
      >
        {icon === enumIcons.settings && <IconSettings />}
        {icon === enumIcons.appShop && <IconShop />}
        {icon === enumIcons.clock && <IconClock />}
        {icon === enumIcons.calendar && <IconCalendar />}
      </StyledIcon>
    );
  }