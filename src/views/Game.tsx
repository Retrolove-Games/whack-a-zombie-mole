import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { GameCtx } from "../context/GameContext";
import { SfxCtx } from "../context/SfxContext";
import { Mole } from "../gameComponents/Mole";

const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  overflow: hidden;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 0 10px;
`;

const gameLenght = 100;

export const Game = () => { 
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [ time, updateTime ] = useState(gameLenght);

  // Main ticker
  useEffect(() => {
    let timer = gameLenght;

    const heartBeat = setInterval(() => {
      console.log("Clock beating...", timer);
      //console.log(process.env.NODE_ENV);
      if (timer > 0) {
        updateTime(--timer);
      } else {
        dispatch({ type: "CHANGE_SCREEN", screen: "menu" });
      }
    }, 1000);

    return () => { clearInterval(heartBeat); }
  }, []);

  return (
    <Wrapper>
      <p>Score: {state.points}</p>
      <p>Time: {time}</p>
      <GameGrid>
        {/* Row 1 */}
        <Mole active={false} clickHandler={ () => alert(1) } />
        <Mole active={false} clickHandler={ () => alert(1) } />
        <Mole active={false} clickHandler={ () => alert(1) } />
        <Mole active={true} clickHandler={ () =>  { dispatch( { type: "INCREMENT_POINTS", points: 10 } ); playSfx("hit"); } } />
        {/* Row 2 */}
      </GameGrid>
    </Wrapper>

  );
};
// onClick={ () => { dispatch( { type: "INCREMENT_POINTS", points: 10 } ); playSfx("hit"); } }
