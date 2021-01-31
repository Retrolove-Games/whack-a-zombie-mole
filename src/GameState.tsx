export declare type GameScreen = "intro" | "menu";

export interface GameStateInterface {
  screen: GameScreen;
  points: number;
  nickname: string;
}

export declare type ReducerActionType =  "INCREMENT_POINTS" | "CHANGE_SCREEN" | "SET_NICKNAME";

export type ReducerAction = {
  type: "INCREMENT_POINTS";
  points: number;
} | {
  type: "CHANGE_SCREEN";
  screen: GameScreen;
} | {
  type: "SET_NICKNAME";
  nickname: string;
};

export const initialState: GameStateInterface = {
  screen: 'intro',
  points: 0,
  nickname: '',
};

export function reducer(state: GameStateInterface, action: ReducerAction) {
  switch (action.type) {
    // INCREMENT_POINTS
    case "INCREMENT_POINTS":
      return {
        ...state,
        points: state.points + action.points
      }
    // CHANGE_SCREEN
    case "CHANGE_SCREEN":
      return {
        ...state,
        screen: action.screen
      }
    // SET_NICKNAME
    case "SET_NICKNAME":
      return {
        ...state,
        nickname: action.nickname
      }
    // NONE
    default:
      throw new Error("No action passed to the reducer");
  }
}
