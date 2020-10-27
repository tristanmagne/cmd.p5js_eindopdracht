import { delay } from "lodash";
import React from "react";
import Sketch from "react-p5";
import { character, Character } from "./structures/Character";

export const Screen: React.FC = () => {
  const width = window.innerWidth / 2.5;
  const height = window.innerHeight / 2.5;
  let player: Character;
  let hasReleased: boolean = true;

  return (
    <div
      className="screen"
    >
      <Sketch
          style={{ width, height }}
          className={"viewport"}
          setup={(p5, canvasParentRef) => {
            p5.createCanvas(width, height).parent(canvasParentRef);
            player = character(p5);
          }}
          draw={(p5) => {
            p5.background("#fff");
            player.display();
            if (p5.mouseIsPressed && hasReleased) {
              player.shoot();
              delay(() => (hasReleased = false), 50);
            }
          }}
          mouseMoved={() => (player.show())}
          mouseReleased={() => (hasReleased = true)}
        />
    </div>
  );
};
