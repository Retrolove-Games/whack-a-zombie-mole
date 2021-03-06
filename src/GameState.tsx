export declare type GameScreen = "intro" | "menu" | "game" | "info";

export interface GameStateInterface {
  screen: GameScreen;
  points: number;
  nickname: string;
  sound: boolean;
}

export declare type ReducerActionType =  "INCREMENT_POINTS" | "DECREMENT_POINTS" | "CHANGE_SCREEN" | "SET_NICKNAME" | "TOGGLE_SFX";

export type ReducerAction = {
  type: "INCREMENT_POINTS";
  points: number;
} | {
  type: "DECREMENT_POINTS";
  points: number;
} | {
  type: "RESET_POINTS";
} | {
  type: "CHANGE_SCREEN";
  screen: GameScreen;
} | {
  type: "SET_NICKNAME";
  nickname: string;
} | {
  type: "TOGGLE_SFX";
};

export const initialState: GameStateInterface = {
  screen: 'intro',
  points: 0,
  nickname: '',
  sound: false,
};

export function reducer(state: GameStateInterface, action: ReducerAction) {
  switch (action.type) {
    // INCREMENT_POINTS
    case "INCREMENT_POINTS":
      return {
        ...state,
        points: state.points + action.points
      }
    // DECREMENT_POINTS
    case "DECREMENT_POINTS":
      return {
        ...state,
        points: state.points > 0 ? state.points - action.points : 0
      }
    // RESET_POINTS
    case "RESET_POINTS":
      return {
        ...state,
        points: 0
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
    // TOGGLE_SFX
    case "TOGGLE_SFX":
      return {
        ...state,
        sound: !state.sound
      }
    // NONE
    default:
      throw new Error("No action passed to the reducer");
  }
}
