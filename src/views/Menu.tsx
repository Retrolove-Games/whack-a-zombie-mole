import React from 'react';
import { Image } from '../components/Image';
import Title from '../assets/title-logo.png';

export const Menu = () => {
  return (
    <div>
      <Image src={Title} alt="" width="200" height="104" />
      <p>Start Game</p>
    </div>
  );
}
