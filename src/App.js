import { Canvas } from "@react-three/fiber";
import Vaporscene from "./Container/Vaporscene";

import { Suspense } from "react";

function App() {
  return (
    <Canvas style={{ background: "#434343", height: "100vh", width: "100vw" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 0]} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Vaporscene position={[-1.2, 0, 0]} />
        <Vaporscene position={[1.2, 0, 0]} />
      </Suspense>
    </Canvas>
  );
}

export default App;
