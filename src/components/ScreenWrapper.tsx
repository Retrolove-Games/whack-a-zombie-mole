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
  width: 960px;
  height: 630px;
  overflow: hidden;
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
