import { delay } from "lodash";
import React, { useContext, useEffect } from "react";
import { action, ActionType, DispatchContext, StateContext } from "~ts/State";

const clipSize = 6;

export const AmmoClip: React.FC = () => {
  const { ammo, darkTheme } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (ammo < 1) {
      for (let index = 0; index < clipSize; index++) {
        delay(dispatch, 300 * (index + 1), action(ActionType.INC));
      }
    }
  }, [ammo]);

  function buildClip() {
    const clip: JSX.Element[] = [];
    for (let index = 0; index < clipSize; index++) {
      clip.push(
        <div key={`bullet_${index}`} className={`bullet ${darkTheme ? "-isDark" : "-isLight"}`}>
          {index < ammo ? (
            <div className={`bulletInner ${darkTheme ? "-isDark" : "-isLight"}`}></div>
          ) : null}
        </div>,
      );
    }
    return clip;
  }

  return <div className="ammoClip">{buildClip()}</div>;
};
