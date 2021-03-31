import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { WrapperBase } from "../styledComponents";
import { GameCtx } from "../context/GameContext";
import { getScores, scoreInterface } from "../api/Api";

const Wrapper = styled(WrapperBase)`
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Highscores = () => {
  const [highscores, setHighscores] = useState<Array<scoreInterface>>([]);

  useEffect(() => {
    getScores("whack-a-zombie-mole").then(response => {
      if (response.ok) {
        response.json().then(data => {
          setHighscores(data as Array<scoreInterface>);
        });
      }
    })
  }, []);

  return (
    <Wrapper>
      {highscores.map((score) => (
        <div>{score.nickname} {score.score}</div>
      ))}
    </Wrapper>
  );
}
