import React, { useEffect, useMemo, useRef, useState } from "react";
import Sketch from "react-p5";
import { Character, characterHook } from "./structures/Character";

export const Screen: React.FC = () => {
  let hasReleased: boolean = true;

  let { current: mouseOnCanvas } = useRef(false);
  function mouseEnterListener(event: Event) {
    event.currentTarget?.addEventListener("mouseleave", mouseLeaveListener, { once: true });
    mouseOnCanvas = true;
  }

  function mouseLeaveListener(event: Event) {
    event.currentTarget?.addEventListener("mouseenter", mouseEnterListener, { once: true });
    mouseOnCanvas = false;
  }

  const character = characterHook();
  const [[width, height], setSize] = useState([
    window.innerWidth - 20 * 2 - 10 * 2,
    window.innerHeight / 2.5,
  ]);
  let { current: player } = useRef<Character>(null);
  const canvas = useMemo(
    () => (
      <Sketch
        style={{ width, height }}
        className={"viewport"}
        setup={(p5, canvasParentRef) => {
          p5.createCanvas(width, height).parent(canvasParentRef);
          canvasParentRef.addEventListener("mouseenter", mouseEnterListener, { once: true });
          player = character(p5);
        }}
        mouseMoved={(p5) => {
          if (!player) player = character(p5);
          if (player.hidden) player.show();
          if (!mouseOnCanvas) mouseOnCanvas = true;
        }}
        draw={(p5) => {
          p5.background("#1B2932");
          player?.display();
          if (p5.mouseIsPressed && hasReleased && mouseOnCanvas) {
            player?.shoot(() => (hasReleased = false));
          }
        }}
        mouseReleased={() => (hasReleased = true)}
      />
    ),
    [width, height],
  );

  useEffect(() => {
    const listener = () => setSize([window.innerWidth - 20 * 2 - 10 * 2, window.innerHeight / 2.5]);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  });

  return (
    <div className="screen" style={{ backgroundColor: "#1B2932" }}>
      {canvas}
    </div>
  );
};
