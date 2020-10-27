import React, { useImperativeHandle, useState } from "react";

const clipSize = 6;

export const AmmoClip = React.forwardRef(function AmmoClip(_props, ref) {
  const [amount, setAmount] = useState<number>(clipSize);
  function buildClip() {
    const clip: JSX.Element[] = [];
    for (let index = 0; index < clipSize; index++) {
      clip.push(
        <div className="bullet">{index < amount ? <div className="bulletInner"></div> : null}</div>,
      );
    }
    return clip;
  }

  // pass updateClip function as a reference to the parent component
  useImperativeHandle(ref, () => ({
    updateClip(amount: number) {
      setAmount((a) => a + amount);
    },
  }));

  return <div className="ammoClip">{buildClip()}</div>;
});
