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
  

  > * {
    cursor: var(--cursor), auto;
  }
`;

const Screen = styled.div`
  --scale-factor: 1;

  @media (min-width: 1024px) {
    --scale-factor: 2;
  }

  @media (min-width: 1366px) {
    --scale-factor: 3;
  }

  transform: scale(var(--scale-factor, 2));
`;

export const ScreenWrapper = ({ children }: Props) => {
  return (
    <Background>
      <Screen>
        {children}
      </Screen>
    </Background>
  );
}
