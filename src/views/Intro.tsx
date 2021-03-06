import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import {useSpring, animated} from 'react-spring';
import * as easings from 'd3-ease';
import { Image } from '../components/Image';
import Logo from '../assets/logo-retrolove.png';
import { GameCtx } from '../context/GameContext';

const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Intro = () => {
  const { dispatch, state } = useContext(GameCtx);

  const logoAnimation = useSpring({
    from: { top: '-140px' },
    to: { top: '0' },
    config: { easing: easings.easeCubic, duration: 2500 },
    onRest: () => {
      // This hack eliminates problem with multiple onRest events.
      if(state.screen === "intro") {
        setTimeout(() => {
          dispatch({ type: 'CHANGE_SCREEN', screen: 'menu' });
        }, 1000);
      }
    } 
  });

  return (
    <Wrapper>
      <animated.div style={{...logoAnimation, position: 'relative'}}>
        <Image src={Logo} alt="" width="140" height="31" />
      </animated.div>
    </Wrapper>
  );
}
