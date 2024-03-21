import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";


import { updateScreenCountDown } from "../../redux/reducers/screenParts/screenGeneral";
import useScreen from "../../customHooks/useScreen";
import useModal from "../../customHooks/useModal";

export default function CounterActiveScreen() {
  const { isScreenActive, countDown, isCountingDown } = useAppSelector(
    (state) => state.screen.general
  );

  const dispatch = useAppDispatch();

  const { screenOff } = useScreen();
  const {modalOff} = useModal()

  useEffect(() => {
    if (isScreenActive && isCountingDown) {
      const timer = setTimeout(() => {
        dispatch(updateScreenCountDown(countDown - 1000));
        if (countDown === 1000) {
          screenOff();
          modalOff()
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isScreenActive, countDown,isCountingDown]);

  return null;
}
