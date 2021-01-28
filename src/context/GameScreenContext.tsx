import * as React from "react";

export declare type GameScreen = 'intro' | 'menu';

export interface GameScreenContextInterface {
    screen: GameScreen;
    updateScreen: React.Dispatch<React.SetStateAction<GameScreen>>;
}

export const GameScreenCtx = React.createContext<GameScreenContextInterface | null>(null);
