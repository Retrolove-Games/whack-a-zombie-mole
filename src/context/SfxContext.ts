import React from "react";

export interface Ctx {
  playSfx(sample: string, force?: boolean): void
}

export const SfxCtx = React.createContext(
  {} as Ctx
);
