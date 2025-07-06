import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SUN_COLOR = '#F97316';
const EARTH_COLOR = '#1E3A8A';
const L1_COLOR = '#7C3AED';
const SAT_COLOR = '#F97316';

function AdityaL1Satellite({ orbitRadius = 1.2, speed = 0.25 }) {
  const ref = useRef<any>();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed;
    ref.current.position.x = 2.5 + orbitRadius * Math.cos(angle);
    ref.current.position.z = orbitRadius * Math.sin(angle);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={SAT_COLOR} emissive={L1_COLOR} emissiveIntensity={0.2} />
    </mesh>
  );
}

const Orbit3DAnimation: React.FC = () => {
  return (
    <div className="bg-white rounded-card shadow-card p-4 flex flex-col items-center w-full">
      <div className="text-xs text-gray-500 mb-2">Real-time Sun–Earth–Aditya-L1 Position (3D)</div>
      <div style={{ width: 340, height: 180 }}>
        <Canvas camera={{ position: [0, 2.2, 5], fov: 40 }}>
          {/* Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />
          {/* Sun */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color={SUN_COLOR} emissive={SUN_COLOR} emissiveIntensity={0.5} />
          </mesh>
          {/* Earth */}
          <mesh position={[5, 0, 0]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color={EARTH_COLOR} emissive={EARTH_COLOR} emissiveIntensity={0.3} />
          </mesh>
          {/* L1 marker */}
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={L1_COLOR} emissive={L1_COLOR} emissiveIntensity={0.3} />
          </mesh>
          {/* Aditya-L1 satellite orbiting L1 */}
          <AdityaL1Satellite />
          {/* Orbits (dashed lines) */}
          <mesh position={[2.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.003, 8, 64]} />
            <meshStandardMaterial color={L1_COLOR} opacity={0.5} transparent />
          </mesh>
          {/* Labels */}
          <HtmlLabel position={[0, 0.6, 0]} text="Sun" color={SUN_COLOR} />
          <HtmlLabel position={[5, 0.35, 0]} text="Earth" color={EARTH_COLOR} />
          <HtmlLabel position={[2.5, 0.32, 0]} text="L1" color={L1_COLOR} />
          <HtmlLabel position={[3.7, 0.18, 0]} text="Aditya-L1" color={SAT_COLOR} />
          {/* Controls */}
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </div>
  );
};

// Helper for HTML labels in 3D
import { Html } from '@react-three/drei';
const HtmlLabel = ({ position, text, color }: { position: [number, number, number]; text: string; color: string }) => (
  <Html position={position} center style={{ pointerEvents: 'none' }}>
    <span style={{ color, fontWeight: 600, fontSize: 13, textShadow: '0 1px 4px #fff8' }}>{text}</span>
  </Html>
);

export default Orbit3DAnimation; 