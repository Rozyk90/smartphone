import styled from "styled-components";

import { enumIcons } from "./enumsIcon";

import IconShop from "./iconShop";
import IconSettings from "./iconSettings";
import IconClock from "./iconClock";
import IconCalendar from "./iconCalendar";

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
  isVissible: boolean;
  icon: enumIcons;
  handleStart: (e: any, id: number) => void;
}

export default function RenderIcon({
  id,
  isVissible,
  icon,
  handleStart,
}: RenderIconProps) {
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

// =========================================================================================

const StyledIconSmall = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 20px;
`;

function RenderIconSmall({ icon }: { icon: enumIcons }) {
  return (
    <StyledIconSmall>
      {icon === enumIcons.settings && <IconSettings isButton={false} />}
      {icon === enumIcons.appShop && <IconShop isButton={false} />}
      {icon === enumIcons.clock && <IconClock isButton={false} />}
      {icon === enumIcons.calendar && <IconCalendar isButton={false} />}
    </StyledIconSmall>
  );
}

export { RenderIconSmall };
