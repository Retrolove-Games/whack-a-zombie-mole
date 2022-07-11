import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { BlinkInfo } from "../components/BlinkInfo";
import { WrapperBase } from "../styledComponents";
import { SfxCtx } from "../context/SfxContext";
import { GameCtx } from "../context/GameContext";
import { getScores, scoreInterface } from "../api/Api";
import Config from "../Config";

const Wrapper = styled(WrapperBase)`
  text-align: center;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-transform: uppercase;
  margin-bottom: 15px;
  color: #a8843c;
  font-size: 2em;
`;

const LoadingInfo = styled.div`
  padding: 40px 0 0 0;
`;

const ScoreList = styled.table`
  text-align: left;
  width: 100%;
  margin-bottom: 5px;

  tr {
    th {
      padding-bottom: 5px;
      color: #b4586c;
    }

    td {
      padding-bottom: 5px;
    }

    th:nth-of-type(1) {
      width: 30%;
      text-align: center;
    }

    th:nth-of-type(2) {
      width: 40%;
    }

    th:nth-of-type(3) {
      text-align: center;
    }

    td:nth-of-type(1) {
      text-align: center;
    }

    td:nth-of-type(3) {
      text-align: center;
    }
  }
`;

export const Highscores = () => {
  const { dispatch, state } = useContext(GameCtx);
  const { playSfx } = useContext(SfxCtx);
  const [highscores, setHighscores] = useState<Array<scoreInterface>>([]);

  useEffect(() => {
    getScores(Config.projectName).then((response) => {
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
      <Title>* Hall of fame! *</Title>
      <ScoreList>
        <tr>
          <th>Rank</th>
          <th>Nick</th>
          <th>Points</th>
        </tr>
        {highscores.map((score, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{score.nickname}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </ScoreList>
      {highscores.length === 0 ? (
        <LoadingInfo>
          <BlinkInfo>Loading scores...</BlinkInfo>
        </LoadingInfo>
      ) : (
        <div className="footer">
          <BlinkInfo>CLICK TO RESTART</BlinkInfo>
        </div>
      )}
    </Wrapper>
  );
};
