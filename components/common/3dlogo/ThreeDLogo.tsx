"use client";

// import { useRef, useEffect, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import * as THREE from "three";

// // Props interface
// interface RotatingLogoProps {
//   scrollY: number;
// }

// // 3D Rotating Logo Component using .glb format
// const RotatingLogo: React.FC<RotatingLogoProps> = ({ scrollY }) => {
//   const objRef = useRef<THREE.Object3D | null>(null);

//   // Load GLTF model
//   const gltf = useLoader(GLTFLoader, "/static/logo/Facelogo.glb");

//   useFrame(() => {
//     if (objRef.current) {
//       objRef.current.rotation.y = scrollY * 0.005; // Scroll-based rotation
//     }
//   });

//   return (
//     <primitive
//       ref={objRef}
//       object={gltf.scene}
//       scale={1}
//       position={[0, -1, 1]}
//     />
//   );
// };

// Main 3D Logo Component
const ThreeDLogo: React.FC = () => {
  // const [scrollY, setScrollY] = useState<number>(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="fixed bottom-5 right-5 w-[100px] h-[100px] z-30">
      {/* <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} intensity={4} />
        <RotatingLogo scrollY={scrollY} />
      </Canvas> */}
    </div>
  );
};

export default ThreeDLogo;
