import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { RenderIconSmall } from "../../../../../../icons/renderIcon";
import { enumIcons } from "../../../../../../icons/enumsIcon";
import {
  screenGridAddIcon,
  setCurrentScreen,
} from "../../../../../../../redux/reducers/screenParts/screenCenter";
import useSound from "../../../../../../../customHooks/useSound";
import AppsCardBtn from "./appsCardBtn";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../../../../../customHooks/useScreen";
import { setOpenCategory } from "../../../../../../../redux/reducers/apps";
import { enumCategories } from "../../../../../../../redux/reducers/apps";

const StyledCategory = styled.div`
  width: 280px;
  gap: 20px;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledCategoryTitleBtn = styled.button`
  background: none;
  border: none;
  color: rgb(229, 52, 19);
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface App {
  title: enumIcons;
  category: string;
  core: boolean;
}

interface CategoryListProps {
  category: App[];
  categoryName: string;
}

export default function CategoryList({
  category,
  categoryName,
}: CategoryListProps) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();

  const openCatList = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.shopCatList));
    dispatch(setOpenCategory(categoryName as enumCategories))
    pushCurrentScreen();
  };

  return (
    <StyledCategory>
      <StyledCategoryTitleBtn
        onMouseDown={() => btnSoundEffect()}
        onClick={() => openCatList()}
      >
        <>{categoryName}</>
        <ArrowForwardIosRoundedIcon />
      </StyledCategoryTitleBtn>
      {category.map((app) => (
        <AppsCardBtn
          key={app.title}
          title={app.title}
          category={app.category}
          core={app.core}
        />
      ))}
    </StyledCategory>
  );
}
