import React, { useContext } from "react";
import { action, ActionType, DispatchContext, StateContext } from "~ts/State";

export const Menu: React.FC = () => {
  const { darkTheme } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div className="menu">
      <div className="menuStart">
        <a
          onClick={() => dispatch(action(ActionType.RESET))}
          className={darkTheme ? "-isDark" : "-isLight"}
        >
          reset
        </a>
      </div>
      <div className="menuEnd">
        <a
          onClick={() => dispatch(action(ActionType.TOGGLE_THEME))}
          className={darkTheme ? "-isDark" : "-isLight"}
        >
          {darkTheme ? "Go Light!" : "Go Dark!"}
        </a>
      </div>
    </div>
  );
};
