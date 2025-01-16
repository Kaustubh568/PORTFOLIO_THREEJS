import { useGLTF } from '@react-three/drei';
import React from 'react';
import birdModel from '../assets/3d/bird.glb';

const Bird = () => {
  const {scene , animations } = useGLTF(birdModel);
  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
    <primitive object= {scene} /> 
    </mesh>
  )
}

export default Bird