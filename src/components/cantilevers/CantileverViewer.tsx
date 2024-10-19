import { Fragment } from "react/jsx-runtime";
import { Canvas } from "@react-three/fiber";
import {PerspectiveCamera, Line, Text, OrbitControls, useGLTF } from "@react-three/drei";
import GermanCantilever from "../../models/cantilevers/GermanCantilever";
import * as THREE from 'three';
//// Load GLB model and position it at (0, 0, 0)
interface PropsRailModel {
  pv:number;
}

const RailModel = (props:PropsRailModel) => {
  const {pv}= props;
  const { scene } = useGLTF("/models/rail.glb"); // Replace with the actual path to your GLB model

  return <primitive object={scene} position={[pv, 0, 0]} scale={1000} />;
};

interface PropsTrainModel {
  pv:number;
}

const TrainModel = (props:PropsTrainModel) => {
  const {pv}= props;
  const { scene } = useGLTF("/models/train.glb"); // Replace with the actual path to your GLB model

  return <primitive object={scene} position={[pv, 0, 0]} scale={1000} />;
}

interface GenerateWiresProps {
  point: { x: number; y: number; z: number };
  length: number;
}

const GenerateWires: React.FC<GenerateWiresProps> = ({ point, length }) => {

  const start_point = { x:point.x, y:point.y, z:(point.z - length)  };
  const end_point = { x:point.x, y:point.y, z: (point.z + length)  };

  const start = new THREE.Vector3(start_point.x, start_point.y, start_point.z);
  const end = new THREE.Vector3(end_point.x, end_point.y, end_point.z);

  return(
    <Line points={[start.toArray(), end.toArray()]} color="#E0E0E0" lineWidth={3} />

  )
}

interface CantileverViewerProps{
  cantilever: GermanCantilever;
  type:'2D'|'3D';
  labels:boolean;
  ambient:boolean;
}

const CantileverViewer = (props:CantileverViewerProps) => {

  const {cantilever,type, labels, ambient} = props;

  const CameraPositionX = type == "2D" ? cantilever.getCenters().cantilever_center.x : cantilever.getCenters().global_center.x*2;

  const CameraPositionY = type == "2D" ? cantilever.getCenters().cantilever_center.y : cantilever.getCenters().global_center.x*2;

  const CameraPositionZ = type == "2D" ? cantilever.getCenters().cantilever_center.z : cantilever.getCenters().global_center.y*3/2;

  const targetPositionX  = type == "2D" ? cantilever.getCenters().cantilever_center.x : 0;

  const targetPositionY  = type == "2D" ? cantilever.getCenters().cantilever_center.y : cantilever.getCenters().global_center.y;

  const targetPositionZ  = type == "2D" ? 0 :  0;


  const cameraPosition:[number,number,number] = [CameraPositionX, CameraPositionY, CameraPositionZ]; // Position the camera
  const target:[number,number,number] = [targetPositionX, targetPositionY, targetPositionZ]; // Target at XY plane

  return(
    <Canvas>
      {/* Update to PerspectiveCamera for better 3D viewing experience */}
      <PerspectiveCamera
        makeDefault
        fov={75} // Set your desired field of view
        position={cameraPosition} // Position the camera above the centroid
        near={0.1} // Near clipping plane
        far={100000} // Far clipping plane
      />

      <OrbitControls
        enableZoom={true}
        enableRotate={type == "2D" ? false : true} // Disable rotation
        enablePan={true}
        target={target} // Set target to the centroid
        minDistance={500} // Minimum zoom distance
        maxDistance={100000} // Maximum zoom distance
      />
      <axesHelper args={[1000]} />

      {type == "3D" && labels && (
        <>
          <GenerateWires point={cantilever.getCwAxis()} length={2000} />
          <GenerateWires point={cantilever.getMwAxis()} length={2000} />

          <Line points={[new THREE.Vector3(cantilever.pv,0,0), new THREE.Vector3(cantilever.pv,cantilever.getMwAxis().y+1000,0)]} color="#FFFF00" lineWidth={4}  dashed/>
        </>
      )}
      {type == "3D" && ambient && (
        <>
          <ambientLight intensity={10} /> {/* General ambient light */}
          <directionalLight intensity={4} position={[10, 10, 5]} /> {/* Strong directional light */}
          <pointLight intensity={4} position={[-10, -10, -5]} /> 
          <RailModel pv={cantilever.pv}/>
          <TrainModel pv={cantilever.pv}/>
        </>
      )}
      {/* Iterate over links, now with 3D positions */}
      {cantilever.generateLinks().map((link, index) => {
        const start = new THREE.Vector3(link.x1, link.y1, link.z1);
        const end = new THREE.Vector3(link.x2, link.y2, link.z2);

        //Calculate the length and midpoint for dimension line
        const length = start.distanceTo(end);
        const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);

        // Calculate a perpendicular offset for the dimension line in 3D
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        //const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0); // This works for 2D
        const offsetDistance = 100; // Distance from the original line
        
        // Ensure the perpendicular direction works for 3D by using cross product with another axis
        const upVector = new THREE.Vector3(0, 0, 1); // Assuming z-up world
        const perpendicular3D = new THREE.Vector3().crossVectors(direction, upVector).normalize();

        const offsetStart = start.clone().add(perpendicular3D.clone().multiplyScalar(offsetDistance));
        const offsetEnd = end.clone().add(perpendicular3D.clone().multiplyScalar(offsetDistance));
        const textPosition = midpoint.clone().add(perpendicular3D.clone().multiplyScalar(offsetDistance));

        return (
          <Fragment key={index}>
            {/* Main Link in 3D */}
            <Line points={[start.toArray(), end.toArray()]} color="#3CA4E0" lineWidth={3} />

            {/* Dimension line and text if dimension_line is true */}
            {link.dimension_line && labels && (
              <>
                {/* Dimension Line in 3D */}
                <Line points={[offsetStart.toArray(), offsetEnd.toArray()]} color="#5C6C7B" lineWidth={1} dashed />
                {/* Text for the Dimension in 3D */}
                <Text
                  position={textPosition.toArray()}
                  fontWeight={700}
                  fontSize={50}
                  color="#5C6C7B"
                  anchorX="center"
                  anchorY="middle"
                >
                {length.toFixed(2)}
                </Text>
              </>
            )}
          </Fragment>
        );
      })}
    </Canvas>

  )
}
export default CantileverViewer;
