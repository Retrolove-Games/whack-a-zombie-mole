import React, { useReducer } from 'react';
import { initialState, reducer } from './GameState';
import { TestButton } from './components/TestButton';
import { GameCtx } from './context/GameContext';
import { GlobalStyles } from './GlobalStyles';
import styled from 'styled-components/macro';

// Atari 2600 emulation wrapper
const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  background-color: var(--color-background);
  color: var(--color-text);
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Wrapper className="App">
      <GlobalStyles />
      <GameCtx.Provider value={{state, dispatch}}>
        <TestButton />
      </GameCtx.Provider>
      <div>{state.screen}</div>
      <div>{state.points}</div>
      <div>{state.nickname}</div>
    </Wrapper>
  );
}

export default App;
