import { Fragment } from "react/jsx-runtime";
import { Canvas } from "@react-three/fiber";
import { Line, OrthographicCamera, Text } from "@react-three/drei";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";
import * as THREE from 'three';

const CantileverPage = () => {
  const cantilever = new GermanCantilever(
    "TDP<2.2", //type
    4500, //Contact Wire Height
    1600, //System Height
    -150, // Zig Zag
    262, // Isolator_top_eye_to_tube_length
    262, // Isolator_bottom_eye_to_tube_length
    4, // Superior Tube Inclincation
    0, // Inferior Tube Inclination
    4, // Inferior Tube Inclination
    400, // Bitola length
    0, // Height diference between pole fix point and bitola
    2150, // Distance between center of via and pole face
    123,//wire support wire to tube length
    200, //wire support wire to end of tube distance
    250, //wire support to eye clamp distance
    81, // eye clamp eye to tube length
    42, // fixed distance pole to pin
    42 // fixed distance pin to connection
  );

  return(
    <Layout>
      <h5 className="font-bold text-secondary-dark">Cantilever</h5>
      <ul>
          {cantilever.generateLinks().map((link, index) => (
            <li key={index}>{`[x1: ${link.x1}, y1: ${link.y1} - x2:${link.x2}, y2:${link.y2}]`}</li>
          ))}
      </ul>
      <div className="w-[400px] h-[600px] border-2 border-gray-light rounded-xl flex justify-center items-center">
        <Canvas>
          <OrthographicCamera
            makeDefault
            left={-1000}
            right={4000}
            top={7000}
            bottom={-1000}
            near={-5000}
            far={5000}
            position={[0, 0, 1]}
          />

          {cantilever.generateLinks().map((link, index) => {
            const start = new THREE.Vector3(link.x1, link.y1, 0);
            const end = new THREE.Vector3(link.x2, link.y2, 0);

            // Calculate the length and midpoint for dimension line
            const length = start.distanceTo(end);
            const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);

            // Calculate a perpendicular offset for the dimension line
            const direction = new THREE.Vector3().subVectors(end, start).normalize();
            const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0);
            const offsetDistance = 100; // Distance from the original line
            const offsetStart = start.clone().add(perpendicular.clone().multiplyScalar(offsetDistance));
            const offsetEnd = end.clone().add(perpendicular.clone().multiplyScalar(offsetDistance));
            const textPosition = midpoint.clone().add(perpendicular.clone().multiplyScalar(offsetDistance));

            return (
              <Fragment key={index}>
                {/* Main Link */}
                <Line points={[start.toArray(), end.toArray()]} color="blue" lineWidth={2} />

                {/* Dimension line and text if dimension_line is true */}
                {link.dimension_line && (
                  <>
                    {/* Dimension Line */}
                    <Line points={[offsetStart.toArray(), offsetEnd.toArray()]} color="red" lineWidth={1} dashed />

                    {/* Text for the Dimension */}
                    <Text
                      position={textPosition.toArray()}
                      fontSize={50}
                      color="black"
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
      </div>
    </Layout>
  );
}

export default CantileverPage;
