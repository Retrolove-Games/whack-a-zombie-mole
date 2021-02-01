import React from "react";

export interface Ctx {
  testAlert(): void
}

export const SfxCtx = React.createContext(
  {} as Ctx
);
