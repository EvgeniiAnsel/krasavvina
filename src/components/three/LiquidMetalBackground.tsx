import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ShaderMaterial } from "three";
import { Vector3 } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DEFAULT_LIQUID_METAL_CONFIG } from "./liquid-metal/config";
import {
  liquidMetalFragment,
  liquidMetalVertex,
} from "./liquid-metal/shaders";
import type { LiquidMetalConfig } from "./liquid-metal/types";
import { hexToVec3 } from "./liquid-metal/utils";

type PlaneProps = {
  config: LiquidMetalConfig;
  reduced: boolean;
};

function applyConfig(uniforms: ShaderMaterial["uniforms"], config: LiquidMetalConfig) {
  uniforms.scale.value = config.scale;
  uniforms.ax.value = config.ax;
  uniforms.ay.value = config.ay;
  uniforms.az.value = config.az;
  uniforms.aw.value = config.aw;
  uniforms.bx.value = config.bx;
  uniforms.by.value = config.by;
  (uniforms.color1.value as Vector3).set(...hexToVec3(config.color1));
  (uniforms.color2.value as Vector3).set(...hexToVec3(config.color2));
  (uniforms.color3.value as Vector3).set(...hexToVec3(config.color3));
  (uniforms.color4.value as Vector3).set(...hexToVec3(config.color4));
}

function LiquidMetalPlane({ config, reduced }: PlaneProps) {
  const material = useRef<ShaderMaterial>(null);
  const timeRef = useRef(0);
  const { viewport } = useThree();

  const initialUniforms = useRef({
    uTime: { value: 0 },
    uFlow: { value: 1 },
    scale: { value: config.scale },
    resolution: { value: [1, 1] as [number, number] },
    color1: { value: new Vector3(...hexToVec3(config.color1)) },
    color2: { value: new Vector3(...hexToVec3(config.color2)) },
    color3: { value: new Vector3(...hexToVec3(config.color3)) },
    color4: { value: new Vector3(...hexToVec3(config.color4)) },
    ax: { value: config.ax },
    ay: { value: config.ay },
    az: { value: config.az },
    aw: { value: config.aw },
    bx: { value: config.bx },
    by: { value: config.by },
  }).current;

  useEffect(() => {
    const mat = material.current;
    if (!mat) return;
    applyConfig(mat.uniforms, config);
    mat.uniforms.uFlow.value = reduced ? 0 : 1;
  }, [config, reduced]);

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;

    if (!reduced) {
      // shader-art: time в мс; timeSpeed — множитель скорости из dev-панели
      timeRef.current += delta * 1000 * config.timeSpeed;
    }

    mat.uniforms.uTime.value = timeRef.current;
    mat.uniforms.uFlow.value = reduced ? 0 : 1;
    mat.uniforms.resolution.value[0] = state.size.width * state.viewport.dpr;
    mat.uniforms.resolution.value[1] = state.size.height * state.viewport.dpr;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={initialUniforms}
        vertexShader={liquidMetalVertex}
        fragmentShader={liquidMetalFragment}
      />
    </mesh>
  );
}

type Props = {
  config?: LiquidMetalConfig;
};

/**
 * Фон Hero — liquid metal из reference/liquid-metal.
 * Uniforms настраиваются через LiquidMetalDevPanel (dev).
 */
export function LiquidMetalBackground({
  config = DEFAULT_LIQUID_METAL_CONFIG,
}: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor("#530909", 1);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
        });
      }}
    >
      <Suspense fallback={null}>
        <LiquidMetalPlane config={config} reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
