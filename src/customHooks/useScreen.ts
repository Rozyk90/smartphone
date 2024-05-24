import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  screenTurnOff,
  stopCountingDown,
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
  const { reversingBoard } = useAppSelector((state) => state.screen.general);
  const dispatch = useAppDispatch();

  const screenOff = () => {
    dispatch(screenTurnOff());
    dispatch(stopCountingDown());

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

  return { screenOff, backToPreviousScreen, toMainScreen };
};

export default useScreen;
