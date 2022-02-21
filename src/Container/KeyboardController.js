import { useEffect, useState } from "react";

function actionByKey(key) {
  const keys = {
    ArrowUp: "moveForward",
    ArrowDown: "moveBackward",
    ArrowLeft: "moveLeft",
    ArrowRight: "moveRight",
  };
  return keys[key];
}

export default function KeyboardController() {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }
    };
    const handleKeyUp = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
}
