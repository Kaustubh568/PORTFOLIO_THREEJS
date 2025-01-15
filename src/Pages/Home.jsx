import {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../Components/Loader';
import Island from '../Models/Island'

const Home = () => {
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
  
  const [islandscale, islandposition, rotation] = adjustislandforscreen();
  return (
    <section className="w-full h-screen relative">
    {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
    POPUP
    </div> */}
    <Canvas 
    className= "w-full h-screen bg-transparent"
    camera={{near: 0.1, far:1000}}
    >
    <Suspense fallback={<Loader />}>
    <Island 
      position= {islandposition}
      scale= {islandscale}
      rotation={rotation}
    />
    </Suspense>
    </Canvas>
    </section>
  )
}

export default Home