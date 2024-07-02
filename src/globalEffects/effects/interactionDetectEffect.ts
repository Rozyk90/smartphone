import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { pageFirstInteraction } from "../../redux/reducers/pageStates";

const InteractionDetectEffect = () => {
  const wasInteraction = useAppSelector(
    (state) => state.pageStates.wasInteraction
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!wasInteraction) {
        dispatch(pageFirstInteraction());
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [wasInteraction, dispatch]);

  return null;
};

export default InteractionDetectEffect;
