import p5, { p5InstanceExtensions } from "p5";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Sketch from "react-p5";
import { StateContext } from "~ts/State";
import { Character, characterHook } from "./structures/Character";

export const Screen: React.FC = () => {
  const { darkTheme } = useContext(StateContext);
  const character = characterHook();
  const [[width, height], setSize] = useState([
    window.innerWidth - 20 * 2 - 10 * 2,
    window.innerHeight / 2.5,
  ]);

  let { current: player } = useRef<Character>(null);
  let {current: mouseOnCanvas } = useRef(false);
  let {current: hasReleased } = useRef(true);
  let parentRef = useRef<HTMLDivElement>(null);
  let { current: myP5 } = useRef<p5InstanceExtensions>(null);

  function mouseEnterListener() {
    mouseOnCanvas = true;
    console.log("enter", mouseOnCanvas, hasReleased);
  };
  function mouseLeaveListener() {
    mouseOnCanvas = false;
    console.log("leave", mouseOnCanvas, hasReleased);
  };

  useEffect(() => {
    if (parentRef.current) {
      myP5 = new p5(p => {
        p.setup = () => {
          p.createCanvas(width, height);
          parentRef.current?.addEventListener("mouseenter", mouseEnterListener);
          parentRef.current?.addEventListener("mouseleave", mouseLeaveListener);
          player = character(p);
        };
        p.mouseMoved = () => {
          if (!player) player = character(p);
          if (player.hidden && mouseOnCanvas) player.show();
        };
        p.draw = () => {
          p.background(darkTheme ? "#1B2932" : "whitesmoke");
          player?.display();
          if (p.mouseIsPressed && hasReleased && mouseOnCanvas) {
            player?.shoot(() => (hasReleased = false));
          }
        };
        p.mouseReleased = () => (hasReleased = true);
    }, parentRef.current);
  }
    return () => {
      myP5 = null;
      document.querySelector("canvas")?.remove();
    };
  }, [parentRef.current, width, height, darkTheme]);

  useEffect(() => {
    const listener = () => setSize([window.innerWidth - 20 * 2 - 10 * 2, window.innerHeight / 2.5]);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <div className="screen" style={darkTheme ? { backgroundColor: "#1B2932" } : { boxShadow: "inset 0 0 0 1px black",}} ref={parentRef}>
    </div>
  );
};
