import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { initialState, reducer } from './GameState';
import { TestButton } from './components/TestButton';
import { GameCtx } from './context/GameContext';
import { Intro } from './views/Intro';


// Atari 2600 emulation wrapper
const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  background-color: var(--color-background);
  color: var(--color-text);
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState(<></>);

  // Pseudo routing
  useEffect(() => {
    switch(state.screen) {
      case 'intro':
        setView(<Intro />);
        break;
      case 'menu':
        setView(<div>Menu</div>);
    }
  });

  return (
    <Wrapper className="App">
      <GameCtx.Provider value={{state, dispatch}}>
        {view}
      </GameCtx.Provider>
    </Wrapper>
  );
}

export default App;
