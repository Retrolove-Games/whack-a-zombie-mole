import React, { useContext } from "react";
import styled from "styled-components/macro";
import { WrapperBase } from "../styledComponents";

const Wrapper = styled(WrapperBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Nick = () => {
  return (
    <Wrapper>
      {process.env.NODE_ENV}
    </Wrapper>
  );
}

export default Nick;
