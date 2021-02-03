import React from "react";
import styled from 'styled-components/macro';

const PixelPerfect = styled.img`
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

export const Image = (props: React.HTMLProps<HTMLImageElement>) => {
  const {width, height, src, alt, style} = props;

  return <PixelPerfect width={width} height={height} src={src} alt={alt} style={style} />;
}
