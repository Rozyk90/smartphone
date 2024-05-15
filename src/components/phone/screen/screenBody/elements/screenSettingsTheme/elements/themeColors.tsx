import styled from "styled-components"
import SettingsTitle from "../../../../../../../componentsGlobal/settingsTitle"
import { useAppDispatch } from "../../../../../../../redux/hooks"
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter"

const StyledThemeColors = styled.div`
    border: 1px solid green;
`


export default function ThemeColors({setColors}:{setColors:()=>void}){
const dispatch = useAppDispatch()



    return(<StyledThemeColors>
<SettingsTitle title="Palety kolorów" fnToDo={setColors} />

        kolory
    </StyledThemeColors>)
}