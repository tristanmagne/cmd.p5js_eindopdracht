import React from "react";
import { UI } from "./UI/UI";
import { Screen } from "./game/Screen";

export const App = () => (
  <div className="app">
    <Screen />
    <UI />
  </div>
);
