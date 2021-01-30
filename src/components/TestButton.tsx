import React, { useContext } from "react";
import { GameCtx } from "../context/GameContext";

export const TestButton = () => {
  const { dispatch, state } = useContext(GameCtx);

  return <button onClick={() => dispatch({ type: 'CHANGE_SCREEN', screen: 'menu' })}>{state.screen}</button>;
};
