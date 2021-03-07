import React, { useContext } from "react";
import styled from "styled-components/macro";
import Trophy from "../assets/trophy.png";
import * as easings from "d3-ease";
import { useSpring, animated, AnimatedValue } from "react-spring";
import { Image } from "../components/Image";
import { WrapperBase } from "../styledComponents";
import { GameCtx } from "../context/GameContext";

const Wrapper = styled(WrapperBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  text-align: center;

  width: 80%;

  .trophy {
    display: block;
    margin-bottom: 10px;
  }

  .score {
    text-align: center;
  }
`;

export const Nick = () => {
  const { dispatch, state } = useContext(GameCtx);
  const spring = useSpring({
    from: { val: 0 },
    to: { val: state.points },
    config: { easing: easings.easeCubicIn, duration: 1000 }
  }) as AnimatedValue<{ val: number }>;

  return (
    <Wrapper>
      <Container>
        <div className="trophy">
          <Image src={Trophy} alt="trophy" width="64" height="32" />
        </div>
        <div className="score">
          <animated.span className="score">
            {spring.val.interpolate((val: number) => Math.floor(val))}
          </animated.span>
        </div>
        <div className="instructions">
          Enter your name:
        </div>
        <div className="form">
          <input type="text" />
        </div>
      </Container>
      <p>{state.nickname}</p>
    </Wrapper>
  );
};

export default Nick;
