import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import uniqid from "uniqid";
import { getRandomWithOneExclusion } from "../lib/helpers";
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

const gameElements = 12;
const initialGameSpeed = 800;
const gameSpeedup = 50;
const maximumSpeed = 200;

interface gameElement {
  active: boolean;
  type: MoleType;
  id: string;
}

const initialGameState: Array<gameElement> = Array(gameElements)
  .fill({ id: 0, active: false, type: "mole" })
  .map((item) => ({ ...item, id: uniqid() }));

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
  const [time, updateTime] = useState(0);
  const [speed, updateSpeed] = useState(initialGameSpeed);
  const [gameElements, updateGameElements] = useState(initialGameState);

  /**
   * This is main game heartbeat.
   */
  useEffect(() => {
    if (time % 10 === 0 && speed > maximumSpeed) {
      updateSpeed(speed - gameSpeedup);
    }

    const heartBeat = setTimeout(() => {
      updateTime(time + 1);
    }, 1000);

    return () => {
      clearTimeout(heartBeat);
    };
  }, [time, dispatch]);

  /**
   * This is game speed hearbeat.
   */
  useEffect(() => {
    const gameHeartbeat = setTimeout(() => {
      updateGameElements(randomizeGameElements(gameElements));
    }, speed);

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
                // Update clicked element.
                updateGameElements(
                  gameElements.map((el) =>
                    el.id === item.id ? { ...el, active: false } : el
                  )
                );

                if (item.type === "mole") {
                  dispatch({ type: "INCREMENT_POINTS", points: 10 });
                  playSfx("hit");
                } else {
                  dispatch({ type: "DECREMENT_POINTS", points: 10 });
                  playSfx("princess");
                }
              }
            }}
          />
        ))}
      </GameGrid>
    </Wrapper>
  );
};
