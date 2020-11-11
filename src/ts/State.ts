import { createContext, Dispatch } from "react";

export interface Action<T> {
  type: T;
  [key: string]: any;
}

interface State {
  ammo: number;
  darkTheme: boolean;
}

export enum ActionType {
  INC = "increment",
  DEC = "decrement",
  RESET = "reset",
  TOGGLE_THEME = "toggleTheme"
}

export const initialState: State = { ammo: 6, darkTheme: true };

export function reducer(state: State, action: Action<ActionType>): State {
  switch (action.type) {
    case ActionType.INC:
      return state.ammo + 1 > 6 ? state : { ...state, ammo: state.ammo + 1 };
    case ActionType.DEC:
      return state.ammo - 1 < 0 ? state : { ...state, ammo: state.ammo - 1 };
    case ActionType.RESET:
      return initialState;
    case ActionType.TOGGLE_THEME:
      return { ...state, darkTheme: !state.darkTheme };
    default:
      throw new Error("Invalid action type!");
  }
}

export function action<T = ActionType>(type: T, actionObject?: { [key: string]: any }): Action<T> {
  return { type, ...(actionObject ? actionObject : {}) };
}

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action<ActionType>>>(() => {});
