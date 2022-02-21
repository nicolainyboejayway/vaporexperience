import { Canvas } from "@react-three/fiber";
import Vaporscene from "./Container/Vaporscene";
import { usePlane, Physics } from "@react-three/cannon";

import { Suspense, useState, useEffect } from "react";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

export default function App() {
  const [boxPosition, setBoxPosition] = useState([]);

  useEffect(() => {
    setBoxPosition([Math.random() * 4, Math.random(), Math.random() * 3]);
  }, []);

  const handleClick = () => {};
  return (
    <Canvas
      style={{ background: "#434343", height: "100vh", width: "100vw" }}
      dpr={[1, 2]}
      shadows
      //camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <spotLight
          angle={0.5}
          penumbra={0.5}
          position={[0, 10, 5]}
          castShadow
        />
        <directionalLight color="orange" position={[0, 0, 5]} />

        <Physics>
          <Plane />
          <Vaporscene position={boxPosition} onClick={handleClick} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
