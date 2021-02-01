import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Image } from '../components/Image';
import Logo from '../assets/logo-retrolove.png';
import { SfxCtx } from '../context/SfxContext';

const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Intro = () => {
  const sfxEngine = useContext(SfxCtx);
  return <Wrapper onClick={ () => sfxEngine.testAlert() } ><Image src={Logo} alt="" width="140" height="31" /></Wrapper>;
}
