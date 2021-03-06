import React from "react";
import styled from "styled-components/macro";
import { WrapperBase } from "../styledComponents";

const Wrapper = styled(WrapperBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Info = () => {
  return (
    <>
      <Wrapper>
        Tralala
      </Wrapper>
    </>
  );
};

export {};
