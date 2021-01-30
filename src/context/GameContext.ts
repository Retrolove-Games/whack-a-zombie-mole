import React, { Dispatch } from "react";
import { ReducerAction, GameStateInterface } from '../GameState';

export interface Ctx {
  state: GameStateInterface,
  dispatch: Dispatch<ReducerAction>
}

export const GameCtx = React.createContext(
  {} as Ctx
);
