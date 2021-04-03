import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
} from "react";
import styled from "styled-components/macro";
import Trophy from "../assets/trophy.png";
import { BlinkInfo } from "../components/BlinkInfo";
import * as easings from "d3-ease";
import { useSpring, animated, AnimatedValue } from "react-spring";
import { Image } from "../components/Image";
import { WrapperBase } from "../styledComponents";
import { GameCtx } from "../context/GameContext";
import { sendScore } from "../api/Api";

const Wrapper = styled(WrapperBase)`
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 30px;
`;

const Container = styled.div`
  text-align: center;

  width: 80%;

  .trophy {
    display: block;
    margin-bottom: 5px;
  }

  .score {
    text-align: center;
    margin-bottom: 20px;
  }

  .instructions {
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  -webkit-appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  text-align: center;
  color: var(--color-text);
  cursor: var(--cursor), auto;
  width: 100px;
`;

const Button = styled.button`
  -webkit-appearance: none;
  outline: none;
  background-color: var(--color-text);
  border: none;
  text-align: center;
  color: var(--color-background);
  cursor: var(--cursor), auto;

  &:hover {
    color: var(--color-text);
    background-color: var(--color-hover);
  }
`;

export const Nick = () => {
  const { dispatch, state } = useContext(GameCtx);
  const [nickname, setNickname] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const spring = useSpring({
    from: { val: 0 },
    to: { val: state.points },
    config: { easing: easings.easeCubicIn, duration: 1000 },
  }) as AnimatedValue<{ val: number }>;

  useEffect(() => {
    const localName = localStorage.getItem("nickname");

    if (localName) {
      setNickname(localName);
    }

    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("nickname", nickname);
    setSaving(true);
    sendScore(
      {
        nickname,
        score: state.points,
      },
      "whack-a-zombie-mole"
    )
      .then((data) => {
        dispatch({ type: "CHANGE_SCREEN", screen: "highscores" });
      })
      .catch((e) => {
        setSaving(false);
        alert("Sorry, something went wrong :/");
        console.log(e);
      });
  };

  return (
    <Wrapper>
      <Container>
        <div className="trophy">
          <Image src={Trophy} alt="trophy" width="64" height="32" />
        </div>
        <div className="score">
          <animated.span className="score">
            {spring.val.interpolate((val: number) => Math.floor(val))}
          </animated.span>
        </div>
        <div className="instructions">Please enter your name:</div>
        <div className="form">
          <Input
            type="text"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            autoComplete="off"
            ref={inputRef}
            spellCheck="false"
            maxLength={10}
          />
          {saving
            ? <BlinkInfo>Saving</BlinkInfo>
            : <Button type="button" onClick={handleSubmit}>OK</Button>
          }
        </div>
      </Container>
      <p>{state.nickname}</p>
    </Wrapper>
  );
};

export default Nick;
