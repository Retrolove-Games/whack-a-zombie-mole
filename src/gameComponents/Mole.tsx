import React from "react";
import styled from "styled-components/macro";
import Sprite from "../assets/game-sprite-test.png";

interface StyledMoleProps {
  active: boolean
}

const StyledMole = styled.div<StyledMoleProps >`
  width: 60px;
  height: 40px;
  background-image: url(${Sprite});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 60px 40px;
  image-rendering: pixelated;
  opacity: ${ props => props.active ? 1 : 0.2 }
`;

interface MoleProps {
  active: boolean,
  type: "mole" | "princess",
  clickHandler: Function
};

export const Mole = ({active, type, clickHandler}: MoleProps) => {
  return <StyledMole active={active} onClick={() => clickHandler()} />;
}
