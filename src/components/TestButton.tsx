import React, { useContext } from "react";
import { GameCtx } from "../context/GameContext";

export const TestButton = () => {
  const { dispatch, state } = useContext(GameCtx);

  return (
    <>
      <button onClick={() => dispatch({ type: 'CHANGE_SCREEN', screen: 'menu' })}>Change screen!</button>
      <button onClick={() => dispatch({ type: 'INCREMENT_POINTS', points: 10 })}>Add points!</button>
      <input type="text" onChange={(e) => dispatch({ type: 'SET_NICKNAME', nickname: e.target.value })}></input>
    </>
  );
};
