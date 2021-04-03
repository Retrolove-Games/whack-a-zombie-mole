import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { WrapperBase } from "../styledComponents";
import uniqid from "uniqid";
import { getRandomWithExclusions } from "../lib/helpers";
import { GameCtx } from "../context/GameContext";
import { SfxCtx } from "../context/SfxContext";
import { Mole, MoleType } from "../gameComponents/Mole";
import Config from "../Config";

const Wrapper = styled(WrapperBase)`
  overflow: hidden;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 0 10px;
`;

const TopGui = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: flex-start;
  padding: 5px 5px 10px 5px;

  .time {
    display: inline-block;
    min-width: 25px;
  }

  > :first-child {
    text-align: left;
    order: 0;
    flex: 1 1 auto;
    align-self: auto;
  }

  > :last-child {
    text-align: right;
    order: 0;
    flex: 1 1 auto;
    align-self: auto;
  }
`;

const BottomGui = styled.div`
  text-align: center;
  padding: 10px 0 0 0;
`;

const {
  initialGameSpeed,
  gameElements,
  gameSpeedup,
  speedupFactor,
  maximumSpeed,
  timeLimit,
  goodClickPoints,
  badClickPoints,
  maxComboFactor,
} = Config;

interface gameElement {
  active: boolean;
  type: MoleType;
  id: string;
  wasActive: boolean;
}

const initialGameState: Array<gameElement> = Array(gameElements)
  .fill({ id: 0, active: false, type: "mole", wasActive: false })
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
    (el) => el.active && el.type === "mole" && el.wasActive
  );

  // Active Princess
  const activePrincess = gameElements.findIndex(
    (el) => el.active && el.type === "princess" && el.wasActive
  );

  const randomMole = getRandomWithExclusions(gameElements.length, [
    activeMole,
    activePrincess,
  ]);
  const randomPrincess = getRandomWithExclusions(gameElements.length, [
    activeMole,
    activePrincess,
    randomMole,
  ]);

  return gameElements.map((item, index) => {
    if (index === randomMole) {
      return { ...item, active: true, wasActive: true, type: "mole" };
    } else if (index === randomPrincess) {
      return { ...item, active: true, wasActive: true, type: "princess" };
    } else {
      return { ...item, active: false, wasActive: false };
    }
  });
};

export const Game = () => {
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [time, updateTime] = useState(timeLimit);
  const [speed, updateSpeed] = useState(initialGameSpeed);
  const [gameElements, updateGameElements] = useState(initialGameState);
  const [comboFactor, updateComboFactor] = useState(1);
  const [hadSuccess, updateSuccess] = useState(false);

  /**
   * This is main game heartbeat.
   */
  useEffect(() => {
    if (time === 1) {
      dispatch({ type: "CHANGE_SCREEN", screen: "nick" });
    }

    if (time % speedupFactor === 0 && speed > maximumSpeed) {
      updateSpeed(speed - gameSpeedup);
    }

    const heartBeat = setTimeout(() => {
      updateTime(time - 1);
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
      // Check combo
      if (!hadSuccess) {
        updateComboFactor(1);
      }

      updateSuccess(false);

      updateGameElements(randomizeGameElements(gameElements));
    }, speed);

    return () => {
      clearTimeout(gameHeartbeat);
    };
  }, [gameElements]);

  return (
    <Wrapper>
      <TopGui>
        <div>Score: {state.points}</div>
        <div>Time: <span className="time">{time}</span></div>
      </TopGui>
      <GameGrid>
        {gameElements.map((item, index) => (
          <Mole
            key={item.id}
            active={item.active}
            type={item.type}
            speed={speed}
            clickHandler={() => {
              if (item.active) {
                // Update clicked element.
                updateGameElements(
                  gameElements.map((el) =>
                    el.id === item.id ? { ...el, active: false } : el
                  )
                );

                if (item.type === "mole") {
                  const points = goodClickPoints * comboFactor;

                  // If was clicked mark as success.
                  updateSuccess(true);

                  if (comboFactor < maxComboFactor) {
                    updateComboFactor(comboFactor + 1);
                  }

                  dispatch({ type: "INCREMENT_POINTS", points: points });
                  playSfx("hit");
                } else {
                  dispatch({
                    type: "DECREMENT_POINTS",
                    points: badClickPoints,
                  });
                  playSfx("princess");
                }
              }
            }}
          />
        ))}
      </GameGrid>
      <BottomGui>Combo: { comboFactor }x</BottomGui>
    </Wrapper>
  );
};
