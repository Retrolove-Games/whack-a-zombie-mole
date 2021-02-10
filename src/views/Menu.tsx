import React from 'react';
import styled from 'styled-components/macro';
import {useSpring, animated} from 'react-spring';
import * as easings from 'd3-ease';
import { Image } from '../components/Image';
import Title from '../assets/title-logo.png';

const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  text-align: center;
  padding-top: 20px;
  position: relative;
  overflow: hidden
`;

const MenuContainer = styled.ul`
  list-style: none;
  padding: 0 0;
  margin: 15px 0 0 0;

  li {
    margin-bottom: 10px;
  }
`;

export const Menu = () => {

  const logoAnimation = useSpring({
    top: '0',
    from: { top: '-140px' },
    config: { easing: easings.easeBounceOut, duration: 1200 },
  });

  return (
    <Wrapper>
      <animated.div style={{...logoAnimation, position: 'relative'}}>
        <Image src={Title} alt="" width="200" height="104" />
      </animated.div>
      <MenuContainer>
        <li>Start Game</li>
        <li>Enable sound</li>
        <li>Highscores</li>
      </MenuContainer>
    </Wrapper>
  );
}
