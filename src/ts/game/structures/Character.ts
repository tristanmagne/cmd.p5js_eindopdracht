import { p5InstanceExtensions } from "p5";

export interface Character {
  hide(): void;
  show(): void;
  display(): void;
  shoot(): void;
}

export function character (p5: p5InstanceExtensions): Character {
  const SIZE = 5,
  MULTIPLIER = 3,
  DEADZONE = 0.1;
  const x0 = 0,
  y0 = 0,
  x1 = SIZE * MULTIPLIER,
  y1 = SIZE,
  x2 = SIZE * MULTIPLIER,
  y2 = SIZE * -1;

  let hidden = true,
  angle = 0.0;

  return {
    hide() {
      hidden = true;
    },
    show() {
      hidden = false;
    },
    display() {
      if (hidden) return;
      
      // go to new drawing layer
      p5.push();
      p5.fill(0);
      p5.translate(p5.mouseX, p5.mouseY);

      const dx = p5.pmouseX - p5.mouseX;
      const dy = p5.pmouseY - p5.mouseY;
      if (
        (dx > DEADZONE && dy > DEADZONE) ||
        (dx > DEADZONE && dy < DEADZONE * -1) ||
        (dx < DEADZONE * -1 && dy > DEADZONE) ||
        (dx < DEADZONE * -1 && dy < DEADZONE * -1)
      ) {
        angle = p5.atan2(dy, dx);
      }
      p5.text(`${p5.mouseX}\n${p5.mouseY}\n`, 15, 20);
      p5.rotate(angle);
      p5.triangle(
        // middle corner
        x0,
        y0,
        // left corner,
        x1,
        y1,
        // right corner
        x2,
        y2,
      );
    
      // exit the drawing layer
      p5.pop();
    },
    shoot() {
      p5.push();
      p5.stroke(255, 0, 255);
      p5.translate(p5.mouseX, p5.mouseY);
      p5.rotate(angle);
      p5.line(-5, 0, SIZE * MULTIPLIER * -2, 0);
      p5.pop();
    }
  }
}
