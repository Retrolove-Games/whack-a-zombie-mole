import React, { useReducer } from 'react';
import { initialState, reducer, GameStateInterface } from './GameState';
import { TestButton } from './components/TestButton';
import { GameCtx } from './context/GameContext';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <GameCtx.Provider value={{state, dispatch}}>
        <TestButton />
      </GameCtx.Provider>
      <div>{state.screen}</div>
      <div>{state.points}</div>
      <div>{state.nickname}</div>
    </div>
  );
}

export default App;
