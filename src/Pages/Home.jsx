import {Suspense, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../Components/Loader';
import Island from '../Models/Island';
import Sky from '../Models/Sky';
import Bird from '../Models/Bird';
import Plane from '../Models/Plane';

const Home = () => {
  const [isRotating, setisRotating] = useState(false);
  const [currentStage, setcurrentStage] = useState(1);

  const adjustislandforscreen = () =>{
    let screenscale= null;
    let screenposition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth< 768){
      screenscale = [0.9, 0.9, 0.9];
    }
    else{
      screenscale = [1, 1, 1];
    }
    return [screenscale, screenposition, rotation];
  }

  const adjustPlaneforscreen = () =>{
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  
  const [planeposition, planescale] = adjustPlaneforscreen();
  const [islandscale, islandposition, rotation] = adjustislandforscreen();
  return (
    <section className="w-full h-screen relative">
    <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
    {currentStage && <HomeInfo currentStage={currentStage} />}
    </div>
    <Canvas 
  className= {`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing': 'cursor-grab'}`}
    camera={{near: 0.1, far:1000}}
    >
    <Suspense fallback={<Loader />}>
    <directionalLight position={[1, 1, 1]} intensity={1}/>
    <ambientLight intensity={0.5} />
    <hemisphereLight skyColor= "#b1e1ff" groundColor="#0000000" intensity={1}/>
    <Bird />
    <Sky isRotating={isRotating}/>
    <Island 
      position= {islandposition}
      scale= {islandscale}
      rotation={rotation}
      isRotating={isRotating}
      setisRotating={setisRotating}
      setCurrentStage={setcurrentStage}
    />
    <Plane 
       planeposition= {planeposition}
      //scale= {planescale}
      rotation={[0, 20, 0]}
      isRotating={isRotating}
    />
    </Suspense>
    </Canvas>
    </section>
  )
}

export default Home