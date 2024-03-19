import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  const { ...csConfig } = useControls("Contact Shadows", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1, step: 0.01 },
    blur: { value: 2.8, min: 0, max: 10, step: 0.01 },
  });

  const { sunPosition } = useControls("Sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
    "Environment Map",
    {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    }
  );

  return (
    <>
      {/* <Environment
        ground={{ height: envMapHeight, radius: envMapRadius, scale: envMapScale }}
        preset="sunset"
      > */}
      {/* <color args={["#000000"]} attach="background" />
        <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <BakeShadows /> */}
      {/* <color args={["ivory"]} attach="background" /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows position={[0, 0, 0]} scale={10} resolution={512} far={5} {...csConfig} /> */}

      {/* <ambientLight intensity={1.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <mesh position-x={-2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
      </mesh> */}

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="greenyellow" />
      </mesh> */}
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
        </mesh>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
}
