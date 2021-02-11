import React from "react";

export interface Ctx {
  playSfx(sample: string): void
}

export const SfxCtx = React.createContext(
  {} as Ctx
);
