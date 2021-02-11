import React, { ButtonHTMLAttributes } from "react";
import styled from 'styled-components/macro';

const StyledButton = styled.button`
  line-height: 100%;
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  padding: 5px;
  cursor: var(--cursor), auto;

  &:hover {
    color: var(--color-hover);
  }
`;

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
}

const Button = (props: MyButtonProps) => {
  const { children } = props;

  return <StyledButton { ...props }>{ children }</StyledButton>;
}

export default Button;
