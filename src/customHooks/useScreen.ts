import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  screenTurnOff,
  stopCountingDown,

} from "../redux/reducers/screenParts/screenGeneral";

import { enumCurrentBarTop,enumCurrentScreen,enumCurrentBarBottom } from "../redux/reducers/screenParts/enumsScreen";
import { setCurrenBarTop } from "../redux/reducers/screenParts/screenBarTop";
import { setCurrentScreen } from "../redux/reducers/screenParts/screenCenter";
import { setCurrentBarBottom } from "../redux/reducers/screenParts/screenBarBottom";

const useScreen = () => {
  const dispatch = useAppDispatch();

  const screenOff = () =>{

    dispatch(screenTurnOff());
    dispatch(stopCountingDown());
  
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.off))
    dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
    dispatch(setCurrenBarTop(enumCurrentBarTop.off))

  }

  return {screenOff};
};


export default useScreen