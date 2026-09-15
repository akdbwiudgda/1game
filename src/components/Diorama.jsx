import React, { Component, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { stateLabel } from "../lib/states.js";

const COLORS = {
  green: "#365b49",
  pale: "#b7c5a5",
  ivory: "#e9e4cd",
  gold: "#bd9250",
  dark: "#284239",
  wood: "#9c7952",
  blue: "#7caaa9",
  ink: "#34453b",
};
function Material({ color = COLORS.ivory, metal = false, ...props }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={metal ? 0.38 : 0.82}
      metalness={metal ? 0.65 : 0.05}
      {...props}
    />
  );
}
function Box({
  position,
  size = [1, 1, 1],
  color,
  radius = 0.035,
  rotation,
  ...props
}) {
  return (
    <RoundedBox
      args={size}
      radius={radius}
      smoothness={3}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      {...props}
    >
      <Material color={color} />
    </RoundedBox>
  );
}
function Cylinder({
  position,
  args = [0.2, 0.2, 0.1, 40],
  color,
  rotation,
  metal = false,
  ...props
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      {...props}
    >
      <cylinderGeometry args={args} />
      <Material color={color} metal={metal} />
    </mesh>
  );
}
function Rod({ from, to, radius = 0.035, color = COLORS.gold }) {
  const { mid, length, quaternion } = useMemo(() => {
    const start = new THREE.Vector3(...from),
      end = new THREE.Vector3(...to),
      direction = end.clone().sub(start);
    return {
      mid: start.add(end).multiplyScalar(0.5),
      length: direction.length(),
      quaternion: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize(),
      ),
    };
  }, [from.join(), to.join()]);
  return (
    <mesh position={mid} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <Material color={color} metal />
    </mesh>
  );
}
function Arch({ color, small = false }) {
  const geometry = useMemo(() => {
    const r = small ? 1.7 : 2.75,
      bottom = 0.14,
      shoulder = small ? 1.65 : 1.45;
    const shape = new THREE.Shape();
    shape.moveTo(-r, bottom);
    shape.lineTo(r, bottom);
    shape.lineTo(r, shoulder);
    shape.absarc(0, shoulder, r, 0, Math.PI, false);
    shape.lineTo(-r, bottom);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      bevelSegments: 3,
      steps: 1,
      curveSegments: 40,
    });
  }, [small]);
  return (
    <mesh geometry={geometry} position={[0, 0, -1.7]} castShadow receiveShadow>
      <Material color={color} />
    </mesh>
  );
}
function Lamp({ value = "right", small = false }) {
  const side = value === "left" ? -0.22 : 0.22;
  return (
    <group scale={small ? 0.75 : 1}>
      <Cylinder
        position={[0, 0.09, 0]}
        args={[0.46, 0.53, 0.18, 48]}
        color={COLORS.gold}
        metal
      />
      <Cylinder
        position={[0, 0.2, 0]}
        args={[0.3, 0.34, 0.07, 48]}
        color={COLORS.dark}
      />
      <Rod from={[0, 0.2, 0]} to={[0, 1.85, 0]} radius={0.055} />
      <Rod from={[0, 1.85, 0]} to={[0.68 + side, 2.25, 0]} radius={0.055} />
      <Cylinder
        position={[0, 1.85, 0]}
        args={[0.105, 0.105, 0.14, 32]}
        rotation={[Math.PI / 2, 0, 0]}
        color={COLORS.gold}
        metal
      />
      <group position={[0.7 + side, 2.12, 0]} rotation={[0, 0, -0.18]}>
        <mesh castShadow>
          <coneGeometry args={[0.58, 0.58, 64, 1, true]} />
          <Material color={COLORS.gold} side={THREE.DoubleSide} metal />
        </mesh>
        <Cylinder
          position={[0, -0.28, 0]}
          args={[0.57, 0.57, 0.035, 64]}
          color="#f4df9d"
        />
        {value !== "off" && (
          <mesh position={[0, -0.98, 0]}>
            <coneGeometry args={[0.85, 1.42, 48, 1, true]} />
            <meshBasicMaterial
              color="#f9e5a0"
              transparent
              opacity={0.1}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
function Chair({ shaded = false }) {
  return (
    <group>
      {[
        [-0.33, -0.3],
        [0.33, -0.3],
        [-0.33, 0.3],
        [0.33, 0.3],
      ].map(([x, z], i) => (
        <Rod
          key={i}
          from={[x, 0.03, z]}
          to={[x, 0.67, z]}
          radius={0.045}
          color={COLORS.wood}
        />
      ))}
      <Box
        position={[0, 0.65, 0]}
        size={[0.9, 0.12, 0.85]}
        color={shaded ? "#81937c" : "#e8d9ad"}
      />
      <Box
        position={[0, 1.09, -0.34]}
        size={[0.9, 0.77, 0.11]}
        color={shaded ? "#a0b091" : "#ebdfbd"}
        rotation={[-0.09, 0, 0]}
      />
      <Box
        position={[0, 1.13, -0.267]}
        size={[0.67, 0.035, 0.012]}
        color={shaded ? "#869779" : "#cdbf99"}
      />
    </group>
  );
}
function Moth({ moving, reducedMotion, color = "#efe7d0" }) {
  const wings = useRef();
  useFrame(({ clock }) => {
    if (wings.current && !reducedMotion) {
      wings.current.position.y = moving
        ? Math.sin(clock.elapsedTime * 2) * 0.08
        : 0;
      wings.current.rotation.z = moving
        ? Math.sin(clock.elapsedTime * 2.6) * 0.13
        : 0;
    }
  });
  return (
    <group ref={wings}>
      {[-1, 1].map((side) => (
        <group key={side} rotation={[0.2, 0, side * -0.4]}>
          <mesh
            position={[side * 0.22, 0.07, 0]}
            rotation={[0, 0, side * -0.45]}
            scale={[0.29, 0.36, 0.035]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 12]} />
            <Material color={color} />
          </mesh>
          <mesh
            position={[side * 0.17, -0.2, 0]}
            rotation={[0, 0, side * 0.35]}
            scale={[0.2, 0.23, 0.03]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 12]} />
            <Material color={color} />
          </mesh>
        </group>
      ))}
      <Cylinder
        position={[0, -0.015, 0.05]}
        args={[0.027, 0.045, 0.52, 16]}
        color={COLORS.gold}
      />
      <Rod from={[0, 0.23, 0.05]} to={[-0.12, 0.4, 0.05]} radius={0.012} />
      <Rod from={[0, 0.23, 0.05]} to={[0.12, 0.4, 0.05]} radius={0.012} />
    </group>
  );
}
function Shutter({ closed }) {
  return (
    <group>
      <Box
        position={[0, 0.12, 0]}
        size={[0.95, 0.2, 0.48]}
        color={COLORS.wood}
      />
      <Rod from={[-0.4, 0.2, 0]} to={[-0.4, 1.6, 0]} />
      <Rod from={[0.4, 0.2, 0]} to={[0.4, 1.6, 0]} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          position={[0, 0.4 + i * 0.22, 0]}
          size={[0.8, 0.2, 0.055]}
          rotation={[closed ? 0 : -0.95, 0, 0]}
          color={COLORS.green}
        />
      ))}
      <Cylinder
        position={[0.54, 0.75, 0]}
        args={[0.12, 0.12, 0.08, 24]}
        rotation={[0, 0, Math.PI / 2]}
        color={COLORS.gold}
        metal
      />
    </group>
  );
}
function Fan({ value, reducedMotion }) {
  const rotor = useRef();
  useFrame((_, delta) => {
    if (
      rotor.current &&
      !reducedMotion &&
      !["off", "still", "closed"].includes(value)
    )
      rotor.current.rotation.z += delta * (value === "left" ? -1 : 1);
  });
  return (
    <group>
      <Cylinder
        position={[0, 0.08, 0]}
        args={[0.4, 0.46, 0.16, 32]}
        color={COLORS.green}
      />
      <Rod from={[0, 0.1, 0]} to={[0, 1.3, 0]} radius={0.07} />
      <mesh position={[0, 1.28, 0]}>
        <torusGeometry args={[0.62, 0.035, 12, 64]} />
        <Material color={COLORS.gold} metal />
      </mesh>
      <group ref={rotor} position={[0, 1.28, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
            <Box
              position={[0.23, 0.22, 0]}
              size={[0.24, 0.6, 0.045]}
              color={COLORS.pale}
              radius={0.1}
              rotation={[0, 0.2, -0.5]}
            />
          </group>
        ))}
        <Cylinder
          args={[0.11, 0.11, 0.16, 32]}
          rotation={[Math.PI / 2, 0, 0]}
          color={COLORS.gold}
          metal
        />
      </group>
    </group>
  );
}
function Flag({ value }) {
  const left = ["left", "wait", "folded", "down", "still"].includes(value);
  return (
    <group>
      <Cylinder
        position={[0, 0.07, 0]}
        args={[0.28, 0.33, 0.14, 32]}
        color={COLORS.gold}
        metal
      />
      <Rod from={[0, 0.1, 0]} to={[0, 1.7, 0]} radius={0.028} />
      <Box
        position={[left ? -0.3 : 0.3, 1.35, 0]}
        size={[0.6, 0.4, 0.035]}
        rotation={[0, left ? -0.35 : 0.15, left ? -0.1 : 0.1]}
        color={COLORS.pale}
      />
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.055, 16, 12]} />
        <Material color={COLORS.gold} metal />
      </mesh>
    </group>
  );
}
function Boat({ value }) {
  return (
    <group
      position={[value === "left" ? -0.2 : value === "right" ? 0.2 : 0, 0, 0]}
    >
      <Cylinder
        position={[0, 0.05, 0]}
        args={[0.66, 0.7, 0.09, 48]}
        color={COLORS.blue}
      />
      <mesh position={[0, 0.23, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.56, 0.32, 4]} />
        <Material color={COLORS.ivory} />
      </mesh>
      <Rod from={[0, 0.23, 0]} to={[0, 1.15, 0]} radius={0.018} />
      <mesh position={[0.15, 0.74, 0]} rotation={[0, 0, -0.15]} castShadow>
        <circleGeometry args={[0.4, 3]} />
        <Material color="#f2e9cf" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
function Flower({ value }) {
  return (
    <group>
      <Cylinder
        position={[0, 0.22, 0]}
        args={[0.34, 0.24, 0.42, 32]}
        color={COLORS.ivory}
      />
      <Rod
        from={[0, 0.4, 0]}
        to={[0, 1.2, 0]}
        radius={0.025}
        color={COLORS.green}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <group
          key={i}
          position={[0, 1.15, 0]}
          rotation={[0, 0, (i * Math.PI) / 3]}
        >
          <mesh
            position={[0, value === "closed" ? 0.1 : 0.22, 0]}
            scale={[0.13, value === "closed" ? 0.18 : 0.29, 0.045]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 12]} />
            <Material color={COLORS.gold} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.15, 0.055]}>
        <sphereGeometry args={[0.12, 24, 16]} />
        <Material color={COLORS.wood} />
      </mesh>
    </group>
  );
}
function Lighthouse({ value }) {
  return (
    <group>
      <Cylinder
        position={[0, 0.1, 0]}
        args={[0.55, 0.65, 0.2, 48]}
        color={COLORS.gold}
      />
      <Cylinder
        position={[0, 0.86, 0]}
        args={[0.27, 0.46, 1.4, 48]}
        color={COLORS.ivory}
      />
      <Cylinder
        position={[0, 1.46, 0]}
        args={[0.32, 0.35, 0.15, 48]}
        color={COLORS.green}
      />
      <Cylinder
        position={[0, 1.7, 0]}
        args={[0.31, 0.31, 0.35, 48]}
        color={value === "low" ? "#7e8b6e" : "#e8c36e"}
      />
      <mesh position={[0, 2.02, 0]} castShadow>
        <coneGeometry args={[0.48, 0.35, 48]} />
        <Material color={COLORS.green} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <Rod
          key={i}
          from={[
            Math.cos((i * Math.PI) / 2) * 0.27,
            1.5,
            Math.sin((i * Math.PI) / 2) * 0.27,
          ]}
          to={[
            Math.cos((i * Math.PI) / 2) * 0.27,
            1.9,
            Math.sin((i * Math.PI) / 2) * 0.27,
          ]}
          radius={0.025}
        />
      ))}
      <Box
        position={[0, 0.42, 0.385]}
        size={[0.2, 0.42, 0.07]}
        color={COLORS.green}
        radius={0.07}
      />
    </group>
  );
}
function Gauge({ value, domain = [], water = false }) {
  const index = Math.max(0, domain.indexOf(value));
  return (
    <group>
      <Box
        position={[0, 0.15, 0]}
        size={[0.85, 0.3, 0.65]}
        color={water ? COLORS.blue : COLORS.green}
      />
      <group position={[0, 0.84, 0]}>
        <Cylinder
          args={[0.5, 0.5, 0.17, 48]}
          rotation={[Math.PI / 2, 0, 0]}
          color={COLORS.gold}
          metal
        />
        <Cylinder
          position={[0, 0, 0.1]}
          args={[0.43, 0.43, 0.035, 48]}
          rotation={[Math.PI / 2, 0, 0]}
          color={COLORS.ivory}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            position={[
              Math.sin((i - 2) * 0.65) * 0.32,
              Math.cos((i - 2) * 0.65) * 0.32,
              0.125,
            ]}
            size={[0.018, 0.065, 0.015]}
            color={COLORS.dark}
            rotation={[0, 0, -(i - 2) * 0.65]}
          />
        ))}
        <group
          rotation={[
            0,
            0,
            1.1 - index * (2.2 / Math.max(1, domain.length - 1)),
          ]}
        >
          <Box
            position={[0, 0.14, 0.15]}
            size={[0.027, 0.31, 0.024]}
            color={COLORS.dark}
          />
        </group>
        <Cylinder
          position={[0, 0, 0.16]}
          args={[0.055, 0.055, 0.025, 24]}
          rotation={[Math.PI / 2, 0, 0]}
          color={COLORS.gold}
        />
      </group>
    </group>
  );
}
function Paper({ value, envelope }) {
  const closed = [
    "sealed",
    "closed",
    "finished",
    "dry",
    "ready",
    "delivered",
  ].includes(value);
  return (
    <group>
      <Box position={[0, 0.1, 0]} size={[1.1, 0.19, 0.8]} color={COLORS.wood} />
      <Box
        position={[0, 0.24, 0]}
        size={[0.86, 0.045, 0.63]}
        color={closed ? COLORS.ivory : "#d5c9a9"}
      />
      {envelope && (
        <mesh
          position={[0, closed ? 0.28 : 0.5, -0.16]}
          rotation={[closed ? -Math.PI / 2 : -0.65, 0, Math.PI]}
        >
          <circleGeometry args={[0.42, 3]} />
          <Material color="#f2e9cf" side={THREE.DoubleSide} />
        </mesh>
      )}
      {!envelope && (
        <mesh
          position={[0, 0.27, 0]}
          rotation={[-Math.PI / 2, 0, 0.5]}
          scale={[0.13, 0.24, 1]}
        >
          <circleGeometry args={[1, 24]} />
          <Material color={COLORS.green} />
        </mesh>
      )}
      <Cylinder
        position={[0.2, 0.3, 0.03]}
        args={[0.085, 0.085, 0.025, 24]}
        color={COLORS.gold}
      />
    </group>
  );
}
function Basin({ value, domain }) {
  const level = 0.2 + Math.max(0, domain.indexOf(value)) * 0.09;
  return (
    <group>
      <Cylinder
        position={[0, 0.13, 0]}
        args={[0.58, 0.48, 0.26, 48]}
        color={COLORS.blue}
      />
      <Cylinder
        position={[0, 0.28, 0]}
        args={[0.5, 0.5, 0.045, 48]}
        color="#aac3b5"
      />
      <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.54, 0.055, 12, 48]} />
        <Material color={COLORS.ivory} />
      </mesh>
      <Rod
        from={[-0.36, 0.1, -0.22]}
        to={[-0.36, 1.15, -0.22]}
        radius={0.065}
      />
      <Rod
        from={[-0.36, 1.15, -0.22]}
        to={[0.08, 1.15, -0.22]}
        radius={0.065}
      />
      {!["off", "empty", "dry", "closed"].includes(value) && (
        <Cylinder
          position={[0.08, 0.7, -0.22]}
          args={[0.024, 0.04, 0.8 - level, 16]}
          color="#a2c9c5"
        />
      )}
    </group>
  );
}
function GenericModel({ id, value, domain, collection, reducedMotion }) {
  const key = id.toLowerCase();
  if (/lamp/.test(key)) return <Lamp value={value} small />;
  if (/fan|wheel|rotor/.test(key))
    return <Fan value={value} reducedMotion={reducedMotion} />;
  if (/flag|ribbon|banner|kite/.test(key)) return <Flag value={value} />;
  if (/boat|ferry/.test(key)) return <Boat value={value} />;
  if (/flower|leaf|plant/.test(key)) return <Flower value={value} />;
  if (/moth|gull|bird/.test(key))
    return (
      <group position={[0, 0.85, 0]}>
        <Rod from={[0, -0.85, 0]} to={[0, 0, 0]} radius={0.012} />
        <Moth
          moving={["moving", "awake"].includes(value)}
          reducedMotion={reducedMotion}
        />
      </group>
    );
  if (/shutter|gate|vent|door|screen|window|diffuser|filter/.test(key))
    return (
      <Shutter
        closed={["closed", "frosted", "soft", "blocked"].includes(value)}
      />
    );
  if (/letter|envelope|parcel|postcard|card|tray/.test(key))
    return <Paper value={value} envelope={!/postcard/.test(key)} />;
  if (/power/.test(key) && collection === "L")
    return <Lighthouse value={value} />;
  if (
    /water|cup|pool|basin|fountain|puddle|tap|valve|cloud|level|tank/.test(key)
  )
    return <Basin value={value} domain={domain} />;
  return <Gauge value={value} domain={domain} water={collection === "W"} />;
}
function Interactive({
  id,
  index,
  position,
  label,
  state,
  selected,
  onSelect,
  children,
  active,
  source,
}) {
  const [hovered, setHovered] = useState(false);
  const marker =
    id === "lamp"
      ? [0, 2.6, 0]
      : id === "shutter"
        ? [0, 1.9, 0]
        : id === "shadow"
          ? [-0.45, 0, 1.1]
          : id === "moth"
            ? [0.4, 0.35, 0]
            : [0, -0.01, 0.9];
  return (
    <group
      position={position}
      onClick={
        active
          ? (e) => {
              e.stopPropagation();
              onSelect(id);
            }
          : undefined
      }
      onPointerOver={
        active
          ? (e) => {
              e.stopPropagation();
              setHovered(true);
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={
        active
          ? () => {
              setHovered(false);
              document.body.style.cursor = "";
            }
          : undefined
      }
    >
      {children}
      {active && (
        <Html position={marker} center zIndexRange={[5, 0]}>
          <button
            className={`object-pin ${selected === id ? "selected" : ""} ${hovered ? "hovered" : ""}`}
            onClick={() => onSelect(id)}
            aria-label={`${label}: ${state}. ${source ? "Source control" : "Derived effect"}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="pin-label">
              {label}
              <small>{state}</small>
            </span>
          </button>
        </Html>
      )}
    </group>
  );
}
function Scene({
  exhibit,
  state,
  active,
  selected,
  onSelect,
  reducedMotion,
  locale,
  thumbnail,
}) {
  const collection = exhibit.id[0],
    accent =
      collection === "L"
        ? "#aab69a"
        : collection === "A"
          ? "#91b5a6"
          : "#8dacab";
  const keys = [
    ...Object.keys(exhibit.sources),
    ...Object.keys(exhibit.derived),
  ];
  const positions =
    exhibit.id === "L01"
      ? [
          [state.lamp === "left" ? -2.25 : 2.25, 0.3, -0.9],
          [-0.15, 0.3, -0.9],
          [-1.2, 0.315, 0.6],
          [-0.75, 0.3, 0.82],
          [1.27, 0.3, 0.6],
          [1.6, 1.96, 0.65],
        ]
      : [
          [-2, 0.3, -0.35],
          [0.0, 0.3, -0.7],
          [1.9, 0.3, -0.4],
          [-1.7, 0.3, 1.08],
          [0.15, 0.3, 1],
          [1.95, 0.3, 1.05],
        ];
  return (
    <>
      <ambientLight intensity={1.25} />
      <hemisphereLight args={["#fff6dd", "#849580", 1.5]} />
      <directionalLight
        position={[-3, 8, 5]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
        shadow-normalBias={0.025}
      />
      <group position={[0, -0.3, 0]}>
        <Box
          position={[0, 0.0, 0]}
          size={[6.8, 0.42, 4.3]}
          radius={0.2}
          color="#c5ba98"
        />
        <Box
          position={[0, 0.18, 0]}
          size={[6.85, 0.075, 4.35]}
          radius={0.13}
          color={COLORS.gold}
        />
        <Box
          position={[0, 0.25, 0]}
          size={[6.75, 0.1, 4.25]}
          radius={0.12}
          color="#e1dcc4"
        />
        {[-2.25, -1.1, 0, 1.1, 2.25].map((x) => (
          <Box
            key={x}
            position={[x, 0.304, 0.1]}
            size={[0.008, 0.006, 3.8]}
            color="#c9c5ae"
            radius={0.002}
          />
        ))}
        {[-1.1, 0, 1.1].map((z) => (
          <Box
            key={z}
            position={[0, 0.305, z]}
            size={[6.3, 0.006, 0.008]}
            color="#c9c5ae"
            radius={0.002}
          />
        ))}
        <Arch color={accent} />
        <group position={[-0.4, 0, 0.17]}>
          <Arch color={collection === "W" ? "#b2c7ba" : "#c8cbb0"} small />
        </group>
        <mesh
          position={[1.67, 2.88, -1.5]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.54, 0.54, 0.055, 64]} />
          <Material color="#d8b66e" metal />
        </mesh>
        <mesh position={[1.67, 2.88, -1.454]}>
          <torusGeometry args={[0.68, 0.01, 8, 64]} />
          <Material color="#d6d2ad" />
        </mesh>
        <Box
          position={[-2.52, 0.59, -1.19]}
          size={[0.8, 0.6, 0.7]}
          color="#c8c9ac"
        />
        <Box
          position={[-2.77, 0.43, -0.95]}
          size={[0.6, 0.27, 0.8]}
          color="#d3d0b4"
        />
        <Box
          position={[0, -0.018, 2.17]}
          size={[0.9, 0.17, 0.025]}
          color={COLORS.gold}
          radius={0.018}
        />
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            position={[0, -0.015 + i * 0.036, 2.187]}
            size={[0.4 - i * 0.09, 0.007, 0.006]}
            color="#715e3e"
            radius={0.002}
          />
        ))}
        {keys.map((id, index) => (
          <Interactive
            key={id}
            id={id}
            index={index}
            position={positions[index]}
            label={exhibit.objects?.[id]?.[locale] || id}
            state={stateLabel(state[id], locale, exhibit.id, id)}
            source={!!exhibit.sources[id]}
            active={active}
            selected={selected}
            onSelect={onSelect}
          >
            {exhibit.id === "L01" ? (
              id === "lamp" ? (
                <group rotation={[0, state.lamp === "right" ? Math.PI : 0, 0]}>
                  <Lamp value={state.lamp} />
                </group>
              ) : id === "shutter" ? (
                <Shutter closed={state.shutter === "closed"} />
              ) : id === "shadow" ? (
                <group position={[state.shadow === "right" ? 2.1 : 0, 0, 0]}>
                  <mesh
                    rotation={[-Math.PI / 2, 0, -0.15]}
                    scale={[0.6, 0.9, 1]}
                  >
                    <circleGeometry args={[1, 48]} />
                    <meshBasicMaterial
                      color="#4c6151"
                      transparent
                      opacity={state.shadow === "none" ? 0 : 0.33}
                      depthWrite={false}
                    />
                  </mesh>
                </group>
              ) : id === "moth" ? (
                <Moth
                  moving={state.moth === "moving"}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <Chair shaded={state[id] === "shaded"} />
              )
            ) : (
              <GenericModel
                id={id}
                value={state[id]}
                domain={exhibit.sources[id] || exhibit.derived[id]}
                collection={collection}
                reducedMotion={reducedMotion}
              />
            )}
          </Interactive>
        ))}
      </group>
      {!thumbnail && (
        <ContactShadows
          position={[0, -0.52, 0]}
          opacity={0.32}
          scale={13}
          blur={2.8}
          far={7}
          resolution={512}
          color="#405044"
          frames={1}
        />
      )}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={!thumbnail}
        target={[0, 1.3, 0]}
        minPolarAngle={0.65}
        maxPolarAngle={1.3}
        minAzimuthAngle={-0.8}
        maxAzimuthAngle={0.8}
        autoRotate={false}
      />
    </>
  );
}
class CanvasBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="canvas-fallback">
        3D is unavailable on this device. Every object and control is available
        in Object list.
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function Diorama({
  exhibit,
  state,
  active = false,
  selected,
  onSelect = () => {},
  reducedMotion = false,
  locale = "en",
  thumbnail = false,
}) {
  const [available, setAvailable] = useState(() => {
    try {
      const context = document.createElement("canvas").getContext("webgl2");
      if (!context) return false;
      context.getExtension("WEBGL_lose_context")?.loseContext();
      return true;
    } catch {
      return false;
    }
  });
  if (!available)
    return (
      <div className="canvas-fallback">
        {locale === "ru"
          ? "3D недоступно на этом устройстве. Все объекты и настройки доступны в списке объектов."
          : "3D is unavailable on this device. Every object and control is available in Object list."}
      </div>
    );
  return (
    <CanvasBoundary>
      <Canvas
        shadows={!thumbnail}
        dpr={[1, thumbnail ? 1 : 1.75]}
        camera={{ position: [7.8, 6.2, 10.5], fov: thumbnail ? 32 : 29 }}
        frameloop={thumbnail || reducedMotion ? "demand" : "always"}
        onCreated={({ gl }) =>
          gl.domElement.addEventListener(
            "webglcontextlost",
            () => setAvailable(false),
            { once: true },
          )
        }
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "pan-y" }}
        aria-label={`Interactive 3D exhibit: ${exhibit.title}`}
      >
        <Suspense fallback={null}>
          <Scene
            {...{
              exhibit,
              state,
              active,
              selected,
              onSelect,
              reducedMotion,
              locale,
              thumbnail,
            }}
          />
        </Suspense>
      </Canvas>
    </CanvasBoundary>
  );
}
