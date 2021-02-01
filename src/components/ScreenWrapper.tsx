import React from "react";
import styled from 'styled-components/macro';

type Props = {
  children?: React.ReactNode;
}

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: Blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Screen = styled.div`
  transform: scale(var(--scale-factor, 2));
`;

export const ScreenWrapper = ({ children }: Props) => {
  return (
    <Background>
      <Screen style={{'--scale-factor': 3} as React.CSSProperties}>
        {children}
      </Screen>
    </Background>
  );
}
