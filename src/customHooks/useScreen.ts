import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  screenTurnOff,
  countDownUpdateTime,
  reversingBoardPush,
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
import { phoneLocked } from "../redux/reducers/basicStates";

const useScreen = () => {
  const { reversingBoard, countDownTimerSelected } = useAppSelector(
    (state) => state.screen.general
  );
  const currentScreen = useAppSelector(
    (state) => state.screen.center.currentScreen
  );
  const dispatch = useAppDispatch();

  const screenOff = () => {
    dispatch(screenTurnOff());
    dispatch(phoneLocked());
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

  const pushCurrentScreen = () =>{
    dispatch(reversingBoardPush(currentScreen))
    
  }

  const screenCountdownUpdate = () => {
    const shortTime = 10000;
    if (currentScreen === enumCurrentScreen.screenActiveBlocked) {
      dispatch(countDownUpdateTime(shortTime));
    } else {
      dispatch(countDownUpdateTime(countDownTimerSelected));
    }
  };

  return {
    screenOff,
    backToPreviousScreen,
    pushCurrentScreen,
    toMainScreen,
    screenCountdownUpdate,
  };
};

export default useScreen;
