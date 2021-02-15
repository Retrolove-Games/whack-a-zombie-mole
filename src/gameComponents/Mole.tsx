import React from "react";
import styled, { css } from "styled-components/macro";
import MoleSprite from "../assets/mole.png";
import PrincessSprite from "../assets/princess.png";
import Frame from "../assets/frame.png";

export type MoleType = "mole" | "princess";

interface StyledMoleProps {
  active: boolean;
  type: MoleType;
  speed: number;
}

const handleAnimation = (active: boolean) => {
  if (!active) {
    return css`transform: translateY(100%);`;
  }
}

const StyledMole = styled.div<StyledMoleProps>`
  width: 60px;
  height: 40px;
  background-color: #404040;
  position: relative;

  background-repeat: no-repeat;
  image-rendering: pixelated;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-image: url(${Frame});
    background-repeat: no-repeat;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    background-image: url(${ ({type}) => type === 'mole' ? MoleSprite : PrincessSprite });
    background-repeat: no-repeat;
    transition: all .2s ease-out;
    ${({active}) => handleAnimation(active) };
  }
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
