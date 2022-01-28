import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

function Vaporscene({ onClick, ...props }) {
  // This reference will give us direct access to the mesh
  //const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += 0.005));
  // Return view, these are regular three.js elements expressed in JSX

  const [ref] = useBox(() => ({ mass: 9, ...props }));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      // onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      onClick={(e) => onClick(ref)}
    >
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={hovered ? "blue" : "orange"} />
    </mesh>
  );
}

export default Vaporscene;
