import React from "react";
import styled from "styled-components/macro";
import Sprite from "../assets/game-sprite-test.png";

export const Mole = styled.div`
  width: 60px;
  height: 40px;
  background-image: url(${Sprite});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 60px 40px;
  image-rendering: pixelated;
`;
