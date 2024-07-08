import styled from "styled-components";
import ShopTitle from "./elements/shopTitle";
import { enumIcons } from "../../../../../icons/enumsIcon";
import RenderIconSmall from "../../../../../icons/renderIcon";

const StyledBody = styled.div`
    background: ${prop => prop.theme.backgrounds.primary};
    height: 600px;

`
const StyledMainContainer = styled.div`
background:green;
height: 400px;
display: flex;
justify-content: center;

`

const StyledCategory = styled.div`
  border: 1px solid pink;
  width: 200px;
  height: 60px;
display: flex;
align-items: center;
  
`

const StyledCategoryTitleBtn = styled.button`
background: none;
border: none;
color:rgb(229, 52, 19);
font-size: 1.3rem;
font-weight: bold;
`

// ==================================================================
// ==================================================================

const StyledAppCard = styled.div`
border:1px solid black;
height: 100px;

`

const StyledAppLogo = styled.div`
  

`

export default function ScreenShop() {

  const appsList = [
    { title: enumIcons.calendar, category: 'Użytkowe', core: false },
    { title: enumIcons.calculator, category: 'Użytkowe', core: false },
    { title: enumIcons.randomGame, category: 'Gry', core: false },
    


  ]

  const games = appsList.filter((app)=>app.category === 'Gry')


  return (
    <StyledBody>
      <ShopTitle />
      <StyledMainContainer>


        <StyledCategory>
              <StyledCategoryTitleBtn> {games[0].category}</StyledCategoryTitleBtn>
{games.map((app)=><StyledAppCard>
{/* <StyledAppLogo>{RenderIconSmall(icon={app.title})}</StyledAppLogo> */}

</StyledAppCard>)}

        </StyledCategory>
      </StyledMainContainer>
    </StyledBody>
  );
}
