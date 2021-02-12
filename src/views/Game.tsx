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
const gameElements = 12;

interface gameElement {
  active: boolean,
  type: "mole" | "princess"
}

const initialGameState: Array<gameElement> = Array(gameElements).fill({active: false, type: 'mole'});

const randomizeGameElements = (gameElements: Array<gameElement>): Array<gameElement> => {
  const randomIndex = Math.floor(Math.random() * gameElements.length);
  gameElements[randomIndex].active = true;
  console.log("updating", randomIndex);
  return gameElements;
}

export const Game = () => { 
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [ time, updateTime ] = useState(gameLenght);
  const [ gameElements, updateGameElements ] = useState(initialGameState); 

  // Main ticker
  useEffect(() => {
    let timer = gameLenght;

    const heartBeat = setInterval(() => {
      console.log("Clock beating...", timer);
      //console.log(process.env.NODE_ENV);
      if (timer > 0) {
        const randomIndex = Math.floor(Math.random() * gameElements.length);

        let changedState = gameElements.map((item, index) => {
          if (index === randomIndex) {
            return { ...item, active: true}
          } else {
            return item;
          }
        });

        updateGameElements(changedState);
        
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
        {
          gameElements.map( (item, index) => <Mole key={index} active={item.active} type={item.type} clickHandler={ () => alert(1) } />) 
        }
      </GameGrid>
    </Wrapper>

  );
};
// onClick={ () => { dispatch( { type: "INCREMENT_POINTS", points: 10 } ); playSfx("hit"); } }
/**
 

        <Mole active={false} type="mole" clickHandler={ () => alert(1) } />
        <Mole active={false} type="mole" clickHandler={ () => alert(1) } />
        <Mole active={false} type="mole" clickHandler={ () => alert(1) } />
        <Mole active={true} type="mole" clickHandler={ () =>  { dispatch( { type: "INCREMENT_POINTS", points: 10 } ); playSfx("hit"); } } />
}

 */
