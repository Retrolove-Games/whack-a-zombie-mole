import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components/macro";
import { WrapperBase } from "../styledComponents";
import { Mole } from "../gameComponents/Mole";
import { GameCtx } from "../context/GameContext";
import { SfxCtx } from "../context/SfxContext";


const Wrapper = styled(WrapperBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 80%;
  grid-row-gap: 20px;

  .header,
  .footer {
    grid-column-start: 1;
    grid-column-end: 13;
    text-align: center;
  }

  .footer {
    animation: ${blink} 0.6s steps(2, start) infinite;
  }

  .sprite {
    grid-column-start: 1;
    grid-column-end: 5;
    text-align: center;
  }

  .sprite-description {
    grid-column-start: 5;
    grid-column-end: 13;
    align-self: center;
    line-height: 200%;
  }
`;

export const Info = () => {
  const { dispatch, state } = useContext(GameCtx);
  const [display, setDisplay] = useState(false);
  const { playSfx } = useContext(SfxCtx);

  useEffect(() => {
    const gameHeartbeat = setTimeout(() => {
      setDisplay(!display);
    }, 1000);

    return () => {
      clearTimeout(gameHeartbeat);
    };
  }, [display]);

  return (
    <Wrapper
      onClick={() => {
        dispatch({ type: "CHANGE_SCREEN", screen: "game" });
        playSfx("start");
      }}
    >
      <InfoBox>
        <div className="header">Use your cursor to:</div>
        <div className="sprite">
          <Mole
            active={display}
            type="mole"
            clickHandler={() => {}}
            speed={600}
          />
        </div>
        <div className="sprite-description">
          Whack all
          <br />
          zombie moles
        </div>
        <div className="sprite">
          <Mole
            active={display}
            type="princess"
            clickHandler={() => {}}
            speed={600}
          />
        </div>
        <div className="sprite-description">
          Be careful
          <br />
          with ladies!
        </div>
        <div className="footer">CLICK TO START</div>
      </InfoBox>
    </Wrapper>
  );
};
