import React, { useState } from 'react';
import { GameScreenCtx, GameScreen, GameScreenContextInterface } from './context/GameScreenContext';

const defaultScreen: GameScreen = 'intro';

function App() {
  // Which screen is used
  const [ screen, updateScreen ] = useState(defaultScreen);
  const screenState: GameScreenContextInterface  = { screen, updateScreen };

  return (
    <div className="App">
      {screen}
      <GameScreenCtx.Provider value={screenState}>

      </GameScreenCtx.Provider>
    </div>
  );
}

export default App;
