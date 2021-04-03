import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { BlinkInfo } from "../components/BlinkInfo";
import { WrapperBase } from "../styledComponents";
import { SfxCtx } from "../context/SfxContext";
import { GameCtx } from "../context/GameContext";
import { getScores, scoreInterface } from "../api/Api";

const Wrapper = styled(WrapperBase)`
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Highscores = () => {
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [highscores, setHighscores] = useState<Array<scoreInterface>>([]);

  useEffect(() => {
    getScores("whack-a-zombie-mole").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setHighscores(data as Array<scoreInterface>);
        });
      }
    });
  }, []);

  return (
    <Wrapper
      onClick={() => {
        dispatch({ type: "CHANGE_SCREEN", screen: "menu" });
        playSfx("start");
      }}
    >
      {highscores.map((score, index) => (
        <div key={index}>
          {score.nickname} {score.score}
        </div>
      ))}
      <div className="footer">
        <BlinkInfo>CLICK TO RESTART</BlinkInfo>
      </div>
    </Wrapper>
  );
};
