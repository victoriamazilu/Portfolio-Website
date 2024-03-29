import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import HomeInfo from "../components/HomeInfo";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustIsland = () => {
        let screenPos, screenScale;
        let rotation = [0, 24.2, 0];

        if (window.innerWidth < 768) {
            screenPos = [0, -30, -40];
            screenScale = [0.04, 0.04, 0.04];
        } else {
            screenPos = [0, -32, -40];
            screenScale = [0.05, 0.05, 0.05];
        }

        return [screenScale, screenPos, rotation];
    };

    const adjustPlane = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            screenScale = [0.5, 0.5, 0.5];
            screenPosition = [0, -0.8, 0];
        } else {
            screenScale = [1.2, 1.2, 1.2];
            screenPosition = [0, 0, -4];
        }

        return [screenScale, screenPosition];
    };

    const [islandScale, islandPos, islandRot] = adjustIsland();
    const [planeScale, planePos] = adjustPlane();

    return (
        <section className="w-full h-screen relative">
            <div className="absolute top-20 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight postion={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={2} />
                    <hemisphereLight
                        skyColor="#b1e1ff"
                        groundColor="#000000"
                        intensity={1}
                    />

                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        scale={islandScale}
                        position={islandPos}
                        rotation={islandRot}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        scale={planeScale}
                        position={planePos}
                        isRotating={isRotating}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;
