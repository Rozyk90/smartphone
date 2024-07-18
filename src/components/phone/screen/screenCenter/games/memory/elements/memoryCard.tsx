import styled from "styled-components";
import { useEffect, useState } from "react";

import Icon1 from "@mui/icons-material/AcUnitRounded";
import Icon2 from "@mui/icons-material/AccessAlarmRounded";
import Icon3 from "@mui/icons-material/AirportShuttleRounded";
import Icon4 from "@mui/icons-material/AirplanemodeActiveRounded";
import Icon5 from "@mui/icons-material/BeachAccessRounded";
import Icon6 from "@mui/icons-material/BoltRounded";
import Icon7 from "@mui/icons-material/Brightness3Rounded";
import Icon8 from "@mui/icons-material/ChildFriendlyRounded";
import Icon9 from "@mui/icons-material/CloudRounded";
import Icon10 from "@mui/icons-material/EmojiEmotionsRounded";

const StyledCard = styled.button<{ $selected: boolean, $collected:boolean }>`
  width: 60px;
  height: 60px;
  border: 3px solid black;
  border-radius: 8px;
  color: white;

  background: rgb(174, 107, 0);
  background: linear-gradient(
    0deg,
    rgba(174, 107, 0, 1) 0%,
    rgba(255, 170, 13, 1) 10%,
    rgba(255, 170, 13, 1) 90%,
    rgba(253, 235, 180, 1) 100%
  );
  transition: transform 0.5s;
  transform: ${(prop) => (prop.$selected ? "rotateY(180deg)" : "none")};
  opacity: ${prop => prop.$collected? 0:1};

  .parent {
    /* Dodaj styl do elementu nadrzędnego */
    perspective: 1000px;
  }

  &:hover {
    cursor: pointer;
  }
`;

interface prop {
  selected: boolean;
  num: number;
  collected:boolean;
  fnToDo: () => void;
}

export default function MemoryCard({ selected, num,collected, fnToDo }: prop) {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);

  const getIcon = (number: number) => {
    switch (number) {
      case 1:
        return <Icon1 />;
      case 2:
        return <Icon2 />;
      case 3:
        return <Icon3 />;
      case 4:
        return <Icon4 />;
      case 5:
        return <Icon5 />;
      case 6:
        return <Icon6 />;
      case 7:
        return <Icon7 />;
      case 8:
        return <Icon8 />;
      case 9:
        return <Icon9 />;
      case 10:
        return <Icon10 />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        setIcon(getIcon(num));
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIcon(null);
    }
  }, [selected, num]);

  return (
    <StyledCard $selected={selected} $collected={collected} onClick={fnToDo}>
      {selected && icon}
    </StyledCard>
  );
}
