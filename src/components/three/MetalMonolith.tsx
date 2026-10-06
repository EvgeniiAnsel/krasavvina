import { useRef, Suspense } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Float, RoundedBox } from "@react-three/drei";

import type { Group } from "three";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";



const STEEL = "#c4c6cd";



function Monolith({ reduced }: { reduced: boolean }) {

  const group = useRef<Group>(null);

  const { camera } = useThree();

  const target = useRef({ x: 0, y: 0 });



  useFrame((state) => {

    const g = group.current;

    if (!g) return;



    const vh = window.innerHeight || 1;

    const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);

    camera.position.z = 5.4 + progress * 2.6;

    camera.position.y = progress * -0.8;

    camera.lookAt(0, 0, 0);



    if (reduced) {

      g.rotation.set(0.1, 0.5, 0.08);

      return;

    }



    const px = state.pointer.x;

    const py = state.pointer.y;

    target.current.x += (py * 0.25 - target.current.x) * 0.04;

    target.current.y += (px * 0.5 - target.current.y) * 0.04;

    g.rotation.x = target.current.x;

    g.rotation.y = target.current.y + state.clock.elapsedTime * 0.14;

  });



  return (

    <group ref={group}>

      <RoundedBox args={[1.25, 3.1, 1.25]} radius={0.08} smoothness={6}>

        <meshStandardMaterial

          color={STEEL}

          metalness={0.92}

          roughness={0.18}

          envMapIntensity={0.6}

        />

      </RoundedBox>



      <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.6} floatIntensity={reduced ? 0 : 1.1}>

        <mesh position={[1.7, 1.1, -0.6]} rotation={[0.5, 0.3, 0.2]}>

          <icosahedronGeometry args={[0.42, 0]} />

          <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.22} />

        </mesh>

      </Float>

      <Float speed={reduced ? 0 : 1.5} rotationIntensity={reduced ? 0 : 0.8} floatIntensity={reduced ? 0 : 1.4}>

        <mesh position={[-1.8, -1.3, 0.4]} rotation={[0.2, 0.8, 0.5]}>

          <octahedronGeometry args={[0.55, 0]} />

          <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.26} />

        </mesh>

      </Float>

    </group>

  );

}



function Scene({ reduced }: { reduced: boolean }) {

  return (

    <>

      <ambientLight intensity={0.45} />

      <directionalLight position={[5, 7, 5]} intensity={1.4} />

      <directionalLight position={[-3, 2, -4]} intensity={0.35} />

      <pointLight position={[-4, -2, 3]} intensity={50} color="#ff5a2a" />

      <pointLight position={[3, 4, -2]} intensity={28} color="#ff9a4d" />

      <Monolith reduced={reduced} />

    </>

  );

}



export function MetalMonolith() {

  const reduced = usePrefersReducedMotion();

  return (

    <Canvas

      dpr={[1, 1.5]}

      camera={{ position: [0, 0, 5.4], fov: 42 }}

      gl={{

        antialias: true,

        alpha: true,

        powerPreference: "high-performance",

      }}

      style={{ width: "100%", height: "100%" }}

      onCreated={({ gl }) => {

        gl.domElement.addEventListener("webglcontextlost", (e) => {

          e.preventDefault();

        });

      }}

    >

      <Suspense fallback={null}>

        <Scene reduced={reduced} />

      </Suspense>

    </Canvas>

  );

}

