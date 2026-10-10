import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Particles = ({ count = 400 }) => {
  const pointsRef = useRef(null);

  // Generate particle positions in a spherical/ellipsoid cloud
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Standard random distribution in a radius
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slowly rotate particle field
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.005) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#171717"
        size={0.03}
        sizeAttenuation={true}
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export default Particles;
