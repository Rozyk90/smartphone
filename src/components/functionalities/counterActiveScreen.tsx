import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { countDownUpdateTime } from "../../redux/reducers/screenParts/screenGeneral";
import useScreen from "../../customHooks/useScreen";
import useModal from "../../customHooks/useModal";

export default function CounterActiveScreen() {
  const { countDown } = useAppSelector((state) => state.screen.general);

  const dispatch = useAppDispatch();

  const { screenOff } = useScreen();
  const { modalOff } = useModal();

  useEffect(() => {
    if (countDown) {
      const timer = setTimeout(() => {
        dispatch(countDownUpdateTime(countDown - 1000));
        if (countDown === 1000) {
          screenOff();
          modalOff();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  return null;
}
