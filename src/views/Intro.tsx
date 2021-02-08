import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import {useSpring, animated} from 'react-spring';
import * as easings from 'd3-ease';
import { Image } from '../components/Image';
import Logo from '../assets/logo-retrolove.png';
import { SfxCtx } from '../context/SfxContext';
import { GameCtx } from '../context/GameContext';

const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden
`;

export const Intro = () => {
  const sfxEngine = useContext(SfxCtx);
  const { dispatch } = useContext(GameCtx);

  const logoAnimation = useSpring({
    top: '0',
    from: { top: '-140px' },
    config: { easing: easings.easeCubic, duration: 1500 },
    onRest: () => {
      sfxEngine.testAlert();
      dispatch({ type: 'CHANGE_SCREEN', screen: 'menu' });
    }
  });

  return (
    <Wrapper onClick={ () => sfxEngine.testAlert() } >
      <animated.div style={{...logoAnimation, position: 'relative'}}>
        <Image src={Logo} alt="" width="140" height="31" />
      </animated.div>
    </Wrapper>
  );
}
