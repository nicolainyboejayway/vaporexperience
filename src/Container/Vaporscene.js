import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import KeyboardController from "./KeyboardController";
import { Vector3 } from "three";

const SPEED = 6;

function Vaporscene({ onClick, ...props }) {
  const { camera } = useThree();
  // This reference will give us direct access to the mesh

  // Set up state for the hovered and active state

  const velocity = useRef([0, 0, 0]);
  const { moveForward, moveBackward, moveLeft, moveRight } =
    KeyboardController();
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(({ clock }) => {
    camera.position.copy(ref.current.position);
    //camera.lookAt(new Vector3(ref.current.position - 10));

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    //console.log(direction);

    //api.position.set(Math.sin(clock.getElapsedTime()) * 5, 0, 0);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    ref.current.getWorldPosition(ref.current.position);
  });

  return (
    <mesh {...props} ref={ref} onClick={(e) => onClick(ref)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

export default Vaporscene;
