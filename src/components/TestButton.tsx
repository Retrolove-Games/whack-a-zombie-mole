import React, { useContext } from "react";
import { GameScreenCtx } from "../context/GameScreenContext";

export const TestButton = () => {
  const { updateScreen } = useContext(GameScreenCtx);

  return <button onClick={() => updateScreen("menu")}>Change screen</button>;
};
