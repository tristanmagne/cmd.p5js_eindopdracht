import React, { useEffect, useImperativeHandle, useState } from "react";

const maxHearts = 3;

enum HeartState {
  FULL,
  THREE_QUARTERS,
  HALF,
  ONE_QUARTER,
  EMPTY,
}

interface HeartContainer {
  state: HeartState;
}

export const HeartContainers: React.FC = () => {
  const [heartContainers, setHeartContainers] = useState<HeartContainer[]>([]);

  // runs once when component gets mounted
  useEffect(() => {
    const initHearts: HeartContainer[] = [];
    for (let index = 0; index < maxHearts; index++) {
      initHearts.push({ state: HeartState.FULL });
    }
    setHeartContainers(initHearts);
  }, []);

  function getHeartContainerClass(state: HeartState): string {
    switch (state) {
      case HeartState.FULL:
        return " -isFull";
      case HeartState.THREE_QUARTERS:
        return " -isThreeQuarters";
      case HeartState.HALF:
        return " -isHalf";
      case HeartState.ONE_QUARTER:
        return " -isOneQuarter";
      case HeartState.EMPTY:
      default:
        return "";
    }
  }

  return (
    <div className="heartContainers">
      {heartContainers.map((container) => (
        <div className={"heartContainer" + getHeartContainerClass(container.state)}></div>
      ))}
    </div>
  );
};
