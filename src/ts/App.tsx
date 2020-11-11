import React, { useReducer } from "react";
import { initialState, reducer, StateContext, DispatchContext } from "./State";
import { Menu } from "./ui/Menu";
import { Screen } from "./game/Screen";
import { AmmoClip } from "./ui/AmmoClip";



export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app" style={{ backgroundColor: state.darkTheme ? "#0E1920" : "whitesmoke"}}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Menu />
          <Screen />
          <AmmoClip />
        </DispatchContext.Provider>
      </StateContext.Provider>
      
    </div>
  );
};
