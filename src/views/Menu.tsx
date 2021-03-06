import React, { useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { WrapperBase } from "../styledComponents";
import { useSpring, animated } from "react-spring";
import * as easings from "d3-ease";
import { Image } from "../components/Image";
import Title from "../assets/title-logo.png";
import Button from "../components/Button";
import { GameCtx } from "../context/GameContext";
import { SfxCtx } from "../context/SfxContext";

const Wrapper = styled(WrapperBase)`
  text-align: center;
  padding-top: 20px;
  position: relative;
  overflow: hidden;
`;

const MenuContainer = styled.ul`
  list-style: none;
  padding: 0 0;
  margin: 10px 0 0 0;

  li {
    padding: 0 0;
    margin: 0 0;
  }
`;

export const Menu = () => {
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);

  useEffect(() => {
    dispatch({ type: "RESET_POINTS" });
  }, []);

  const logoAnimation = useSpring({
    top: "0",
    from: { top: "-140px" },
    config: { easing: easings.easeBounceOut, duration: 1200 },
  });

  return (
    <Wrapper>
      <animated.div style={{ ...logoAnimation, position: "relative" }}>
        <Image src={Title} alt="" width="200" height="104" />
      </animated.div>
      <MenuContainer>
        <li>
          <Button
            onClick={() => {
              playSfx("menu");
              dispatch({ type: "CHANGE_SCREEN", screen: "info" });
            }}
          >
            Start game
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              state.sound ? playSfx("off", true) : playSfx("menu", true);
              dispatch({ type: "TOGGLE_SFX" });
            }}
          >
            {state.sound ? "Disable sound" : "Enable sound"}
          </Button>
        </li>
        <li>
          <Button onClick={() => playSfx("menu")}>Highscores</Button>
        </li>
      </MenuContainer>
    </Wrapper>
  );
};
