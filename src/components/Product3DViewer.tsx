'use client';

import { useRef, useState } from 'react';
import { useThree, Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import { Product } from '@/data/products';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import * as THREE from 'three';

interface Product3DViewerProps {
  product: Product;
}

// Simple 3D Box representation since we don't have actual 3D models
function ProductModel({ product }: { product: Product }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2.5, 0.5]} />
      <meshStandardMaterial 
        color={hovered ? '#00f0ff' : '#1a1a1a'}
        metalness={0.8}
        roughness={0.2}
        emissive={hovered ? '#00f0ff' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
}

export function Product3DViewer({ product }: Product3DViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setZoom(1);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        key={resetKey}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
        
        <ProductModel product={product} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        <Environment preset="city" />
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          onClick={handleReset}
          className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.min(z + 0.5, 3))}
          className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
          className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-xs text-gray-500">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}