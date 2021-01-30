import React, { useReducer } from 'react';
// import { GameScreenCtx, GameScreen, GameScreenContextInterface } from './context/GameScreenContext';
import { initialState, reducer, GameStateInterface } from './context/GameState';
import { TestButton } from './components/TestButton';
import { GameCtx } from './context/GameContext';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <GameCtx.Provider value={{state, dispatch}}>
        <TestButton />
      </GameCtx.Provider>
      {state.screen}
    </div>
  );
}

export default App;
