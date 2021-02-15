import React from "react";
import styled, { keyframes, css } from "styled-components/macro";
import Sprite from "../assets/game-sprite-test.png";
import SpriteSheet from "../assets/mole-sprite-sheet.png";

export type MoleType = "mole" | "princess";

interface StyledMoleProps {
  active: boolean;
  type: MoleType;
  speed: number;
}

const handleAnimation = (active: boolean, type: MoleType) => {
  if (active) {
    return (type === 'mole') ? css`transform: rotate(30deg);` : css`transform: scale(2);`;
  }
}

const up = keyframes`
  100% { background-position: -360px 0; }
`;

const down = keyframes`
  0% { background-position: -360px 0; }
  100% { background-position: 0 0; }
`;

const StyledMole = styled.div<StyledMoleProps >`
  width: 60px;
  height: 40px;

  background: url(${Sprite});
  background-repeat: no-repeat;
  image-rendering: pixelated;

  // transform: rotate(0deg);
  transition: all .2s ease-out;
  
  ${({active, type}) => handleAnimation(active, type) };
`;

interface MoleProps {
  active: boolean,
  type: MoleType,
  clickHandler: Function,
  speed: number
};

export const Mole = ({active, type, clickHandler, speed}: MoleProps) => {
  return <StyledMole active={active} type={type} speed={speed} onClick={() => clickHandler()} />;
}
