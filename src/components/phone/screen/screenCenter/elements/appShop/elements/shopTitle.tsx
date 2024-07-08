import styled from "styled-components";
import LocalMallIcon from "@mui/icons-material/LocalMall";


const StyledBody = styled.div`
    border: 1px solid orange;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledTitle = styled.div`
    font-size: 2rem;
    color:  rgb(229, 52, 19);
`
const StyledLogo = styled(LocalMallIcon)`
    color:  rgb(229, 52, 19);
    &&{
        height: 80px;
        width: 80px;
    }
`

export default function ShopTitle(){


    return<StyledBody>
<StyledLogo/>
<StyledTitle>Galaxy Store</StyledTitle>
    </StyledBody>
}