import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  screenTurnOff,
  // countDownStop,
  countDownUpdateTime,
} from "../redux/reducers/screenParts/screenGeneral";

import {
  enumCurrentBarTop,
  enumCurrentScreen,
  enumCurrentBarBottom,
} from "../redux/reducers/screenParts/enumsScreen";
import { setCurrenBarTop } from "../redux/reducers/screenParts/screenBarTop";
import { setCurrentScreen } from "../redux/reducers/screenParts/screenCenter";
import { setCurrentBarBottom } from "../redux/reducers/screenParts/screenBarBottom";
import {
  reversingBoardPop,
  reversingBoardClear,
} from "../redux/reducers/screenParts/screenGeneral";

const useScreen = () => {
  const { reversingBoard, countDownTimerSelected } =
    useAppSelector((state) => state.screen.general);
  const currentScreen = useAppSelector(
    (state) => state.screen.center.currentScreen
  );
  const dispatch = useAppDispatch();

  const screenOff = () => {
    dispatch(screenTurnOff());
    dispatch(countDownUpdateTime(0));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.off));
    dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
    dispatch(setCurrenBarTop(enumCurrentBarTop.off));
  };

  const toMainScreen = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
    dispatch(reversingBoardClear());
  };

  const backToPreviousScreen = () => {
    const lastEnum = reversingBoard[reversingBoard.length - 1];
    if (lastEnum) {
      dispatch(setCurrentScreen(lastEnum));
      dispatch(reversingBoardPop());
    } else {
      toMainScreen();
    }
  };

  const screenCountdownUpdate = () => {
    const shortTime = 10000

console.log("to z useScreen ->", currentScreen)

 if(currentScreen === enumCurrentScreen.screenActiveBlocked){
      dispatch(countDownUpdateTime(shortTime));
      console.log("aktualizuje na krotko")

    } else {
      dispatch(countDownUpdateTime(countDownTimerSelected));
      console.log("aktualizuje na dlugo")
    }
  };

  return {
    screenOff,
    backToPreviousScreen,
    toMainScreen,
    screenCountdownUpdate,
  };
};

export default useScreen;
