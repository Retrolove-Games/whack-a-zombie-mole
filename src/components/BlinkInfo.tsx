import React from "react";
import styled, { keyframes } from "styled-components/macro";

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

const InfoBox = styled.div`
  animation: ${blink} 0.75s steps(2, start) infinite;
`;

type Props = {
  children: React.ReactNode;
}

export const BlinkInfo = ({ children }: Props) => {
  return <InfoBox>{ children }</InfoBox>;
}
