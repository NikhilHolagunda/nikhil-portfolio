"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Pointer in normalised [-1, 1] space, tracked on window because the
// canvas itself is pointer-events: none (the hero text sits above it).
const pointer = { x: 0, y: 0 };
const STRIPS = ["#5ef2ff", "#8b5cf6", "#f472b6", "#5ef2ff", "#6d28d9", "#22d3ee", "#f472b6", "#8b5cf6"];

function Core() {
  const group = useRef<THREE.Group>(null);
  const cage = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const offsetX = viewport.aspect > 1.1 ? viewport.width * 0.3 : 0;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.6, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.4, 3, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, offsetX + pointer.x * 0.25, 2, dt);
    if (cage.current) {
      cage.current.rotation.y -= dt * 0.15;
      cage.current.rotation.z += dt * 0.07;
    }
    // slow breathing scale
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group} position={[offsetX, 0.35, 0]}>
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.05, 32]} />
          <MeshDistortMaterial
            color="#ffffff"
            roughness={0.22}
            metalness={1}
            envMapIntensity={0.85}
            distort={0.42}
            speed={1.6}
          />
        </mesh>
        <mesh ref={cage} scale={1.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#5ef2ff" wireframe transparent opacity={0.22} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Deterministic pseudo-random so renders are pure.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + rand() * 6;
      const t = rand() * Math.PI * 2;
      const p = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.025;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, pointer.y * 0.12, 1.5, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#9ff7ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Stop rendering when the hero is off-screen.
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 3, 4]} color="#5ef2ff" intensity={60} />
        <pointLight position={[-4, -2, 3]} color="#a855f7" intensity={70} />
        <pointLight position={[0, 4, -3]} color="#f472b6" intensity={25} />
        {/* Procedural studio lighting — no HDR file is fetched. */}
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#05060a"]} />
          {/* Ring of coloured strips → smooth iridescent bands on the chrome */}
          {STRIPS.map((c, i) => {
            const a = (i / STRIPS.length) * Math.PI * 2;
            return (
              <Lightformer
                key={i}
                form="rect"
                intensity={1.8}
                color={c}
                position={[Math.cos(a) * 5, 0, Math.sin(a) * 5]}
                rotation={[0, -a + Math.PI / 2, 0]}
                scale={[2.6, 12, 1]}
              />
            );
          })}
          <Lightformer form="rect" intensity={0.6} color="#ffffff" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
        </Environment>
        <Core />
        <Particles />
      </Canvas>
    </div>
  );
}
