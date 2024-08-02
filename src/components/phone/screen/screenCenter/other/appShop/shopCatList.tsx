import styled from "styled-components";
import { useAppSelector } from "../../../../../../redux/hooks";
import { useState } from "react";
import AppsCardBtn from "./elements/appsCardBtn";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import useSound from "../../../../../../customHooks/useSound";
import useScreen from "../../../../../../customHooks/useScreen";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgb(229, 52, 19);
  font-size: 20px;
  font-weight: bold;
`;
const StyledButton = styled(IconButton)`
  && {
    color: rgb(229, 52, 19);
  }
`;

const StyledTitleBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

export default function ShopCatList() {
  const { appsList, openCategory } = useAppSelector((state) => state.apps);
  const { backToPreviousScreen } = useScreen();
  const { btnSoundEffect } = useSound();

  const toRender = appsList.filter((app) => app.category === openCategory);

  return (
    <StyledBody>
      <StyledTitle>
        <StyledButton
          onMouseDown={() => btnSoundEffect()}
          onClick={backToPreviousScreen}
          size="small"
        >
          <ArrowBackIosRoundedIcon fontSize="small" />
        </StyledButton>
        <StyledTitleBox>{openCategory}</StyledTitleBox>
      </StyledTitle>

      {toRender.map((app) => (
        <AppsCardBtn
          key={app.title}
          title={app.title}
          category={app.category}
          core={app.core}
        />
      ))}
    </StyledBody>
  );
}
