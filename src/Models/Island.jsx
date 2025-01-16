import { useRef , useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

import islandScene from '../assets/3d/island.glb';

export function Island({
  isRotating,
  setisRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}){
  const islandRef = useRef();
  
  const {gl, viewport}= useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationspeed = useRef(0);
  const dampingFactor = 0.95;

  const handlepointerdown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setisRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;

  }

  const handlepointerup = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setisRotating(false);
  }

  const handlepointermove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating){
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) /viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationspeed.current = delta * 0.01 * Math.PI;
    }
  }
  const handlekeydown = (e) => {
    if (e.key === "ArrowLeft"){
      if(!isRotating) setisRotating(true);
      islandRef.current.rotation.y += -0.01 * Math.PI;
    }else if(e.key ==="ArrowRight"){
      if(!isRotating) setisRotating(true);
      islandRef.current.rotation.y -= -0.01 * Math.PI;
    }
  }

  const handlekeyup = (e) => {
    if (e.key === "ArrowLeft" || e.key ==="ArrowRight"){
      setisRotating(false);
    }
  }
  useFrame(() => {
    if(!isRotating){
      rotationspeed.current *= dampingFactor;
    }
    if(Math.abs(rotationspeed.current)< 0.001 ){
      rotationspeed.current = 0;
    }else{
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
      
    }
  })
  
  useEffect(() =>{
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlepointerdown);
    canvas.addEventListener('pointerup', handlepointerup);
    canvas.addEventListener('pointermove', handlepointermove);
    document.addEventListener('keydown', handlekeydown);
    document.addEventListener('keyup', handlekeyup);

    return () =>{
      canvas.removeEventListener('pointerdown', handlepointerdown);
      canvas.removeEventListener('pointerup', handlepointerup);
      canvas.removeEventListener('pointermove', handlepointermove);
      document.removeEventListener('keydown', handlekeydown);
      document.removeEventListener('keyup', handlekeyup);
    }

  },[gl, handlepointerdown, handlepointermove, handlepointerup])

  return (
    <a.group ref= {islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  )
}

export default Island;