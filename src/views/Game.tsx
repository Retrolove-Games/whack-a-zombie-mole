import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import uniqid from "uniqid";
import { GameCtx } from "../context/GameContext";
import { SfxCtx } from "../context/SfxContext";
import { Mole, MoleType } from "../gameComponents/Mole";

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

const gameLenght = 20;
const gameElements = 12;
const gameSpeed = 800;

interface gameElement {
  active: boolean;
  type: MoleType;
  id: string;
}

const initialGameState: Array<gameElement> = Array(gameElements)
  .fill({ id: 0, active: false, type: "mole" })
  .map((item) => ({ ...item, id: uniqid() }));

//
function getRandomWithOneExclusion(lengthOfArray: number, indexToExclude: number): number {
  var rand = null; //an integer

  while (rand === null || rand === indexToExclude) {
    rand = ~~(Math.random() * (lengthOfArray - 1));
  }

  return rand;
}

/**
 * Randomize game board.
 *
 * @param gameElements
 * @returns A list of game elements after mutation.
 */
const randomizeGameElements = function (
  gameElements: Array<gameElement>
): Array<gameElement> {

  // Active Mole
  const activeMole = gameElements.findIndex(
    (el) => el.active && el.type === "mole"
  );

  // Active Princess
  const activePrincess = gameElements.findIndex(
    (el) => el.active && el.type === "princess"
  );

  const randomMole = getRandomWithOneExclusion(gameElements.length, activeMole);
  const randomPrincess = getRandomWithOneExclusion(gameElements.length, activePrincess);

  return gameElements.map((item, index) => {
    if (index === randomMole) {
      return { ...item, active: true, type: "mole" };
    } else if(index === randomPrincess) {
      return { ...item, active: true, type: "princess" };
    } else {
      return { ...item, active: false };
    }
  });
};

export const Game = () => {
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [time, updateTime] = useState(gameLenght);
  const [gameElements, updateGameElements] = useState(initialGameState);

  /**
   * This is main game heartbeat.
   */
  useEffect(() => {
    const heartBeat = setTimeout(() => {
      updateTime(time - 1);

      if (time === 1) {
        dispatch({ type: "CHANGE_SCREEN", screen: "menu" });
      }
    }, 1000);

    return () => {
      clearTimeout(heartBeat);
    };
  }, [time]);

  /**
   * This is game speed hearbeat.
   */
  useEffect(() => {
    const gameHeartbeat = setTimeout(() => {
      updateGameElements(randomizeGameElements(gameElements));
    }, gameSpeed);

    return () => {
      clearTimeout(gameHeartbeat);
    };
  }, [gameElements]);

  return (
    <Wrapper>
      <p>Score: {state.points}</p>
      <p>Time: {time}</p>
      <GameGrid>
        {gameElements.map((item, index) => (
          <Mole
            key={item.id}
            active={item.active}
            type={item.type}
            clickHandler={() => {
              if (item.active) {
                updateGameElements(
                  gameElements.map((el) =>
                    el.id === item.id ? { ...el, active: false } : el
                  )
                );
                // updateGameElements(randomizeGameElements(gameElements));

                if (item.type === "mole") {
                  dispatch({ type: "INCREMENT_POINTS", points: 10 });
                  playSfx("hit");
                } else {
                  dispatch({ type: "DECREMENT_POINTS", points: 10 });
                }
              }
            }}
          />
        ))}
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
