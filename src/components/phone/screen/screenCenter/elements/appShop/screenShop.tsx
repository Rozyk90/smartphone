import styled from "styled-components";
import { enumIcons } from "../../../../../icons/enumsIcon";
import { useAppSelector } from "../../../../../../redux/hooks";

import ShopTitle from "./elements/shopTitle";
import CategoryList from "./elements/categoryList";
import { enumCategories } from "../../../../../../redux/reducers/apps";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

interface App {
  title: enumIcons;
  category: string;
  core: boolean;
}

export default function ScreenShop() {
  const appsList = useAppSelector((state) => state.apps.appsList);

  const games: App[] = appsList.filter(
    (app) => app.category === enumCategories.Games
  );
  const utilities: App[] = appsList.filter(
    (app) => app.category === enumCategories.Utilities
  );

  return (
    <StyledBody>
      <ShopTitle />
      <StyledMainContainer>
        <CategoryList category={games} categoryName={enumCategories.Games} />
        <CategoryList
          category={utilities}
          categoryName={enumCategories.Utilities}
        />
      </StyledMainContainer>
    </StyledBody>
  );
}
