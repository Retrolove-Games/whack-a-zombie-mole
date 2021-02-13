import React from "react";
import styled from "styled-components/macro";
import Sprite from "../assets/game-sprite-test.png";

export type MoleType = "mole" | "princess";

interface StyledMoleProps {
  active: boolean;
  type: MoleType;
}

const StyledMole = styled.div<StyledMoleProps >`
  width: 60px;
  height: 40px;
  background-image: url(${Sprite});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 60px 40px;
  image-rendering: pixelated;
  opacity: ${ props => props.active ? 1 : 0.2 };
  border: ${ props => props.type === "mole" ? "solid 1px Yellow" : "solid 1px White" };
`;

interface MoleProps {
  active: boolean,
  type: MoleType,
  clickHandler: Function
};

export const Mole = ({active, type, clickHandler}: MoleProps) => {
  return <StyledMole active={active} type={type} onClick={() => clickHandler()} />;
}
