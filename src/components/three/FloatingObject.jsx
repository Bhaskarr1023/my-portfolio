import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const FloatingObject = () => {
  const meshRef = useRef(null);
  const wireRef = useRef(null);
  const coreRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const groupRef = useRef(null);
  const isReducedMotion = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isReducedMotion || window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      // Normalize client coordinates to standard R3F coordinates (-1 to 1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (!isReducedMotion && window.innerWidth >= 1024) {
        // Smooth cursor tracking
        groupRef.current.position.x = THREE.MathUtils.lerp(
          groupRef.current.position.x,
          mouse.current.x * 0.4,
          0.05
        );
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          mouse.current.y * 0.4,
          0.05
        );
      } else {
        // Mobile or reduced motion: remain centered
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
      }
    }

    // Smooth rotations
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.x = Math.sin(t * 0.03) * 0.12;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.04;
      wireRef.current.rotation.z = Math.cos(t * 0.02) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = t * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = t * 0.06;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.03) * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.05;
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.025) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Ultra-transparent Crystal Glass Sphere (small & lightweight) */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.02}
          transmission={0.92}
          thickness={0.6}
          ior={1.3}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* 2. Delicate Holographic Wireframe Cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.25}
        />
      </mesh>

      {/* 3. Small Inner Glowing Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          wireframe={true}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* 4. Fine Orbiting Tech Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.95, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#93c5fd"
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* 5. Fine Orbiting Tech Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.05, 0.006, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#c084fc"
          emissiveIntensity={0.3}
          transparent={true}
          opacity={0.22}
        />
      </mesh>
    </group>
  );
};

export default FloatingObject;
