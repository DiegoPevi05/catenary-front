import { Fragment } from "react/jsx-runtime";
import { Canvas } from "@react-three/fiber";
import { Line, OrthographicCamera, Text } from "@react-three/drei";
import GermanCantilever from "../../models/cantilevers/GermanCantilever";
import * as THREE from 'three';

interface CantileverViewerProps{
  cantilever: GermanCantilever;
}

const CantileverViewer = (props:CantileverViewerProps) => {

  const {cantilever} = props;

  return(
        <Canvas>
          <OrthographicCamera
            makeDefault
            left={cantilever.getMarginViewer().left}
            right={cantilever.getMarginViewer().right}
            top={cantilever.getMarginViewer().top}
            bottom={cantilever.getMarginViewer().bottom}
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
                <Line points={[start.toArray(), end.toArray()]} color="#3CA4E0" lineWidth={3} />

                {/* Dimension line and text if dimension_line is true */}
                {link.dimension_line && (
                  <>
                    {/* Dimension Line */}
                    <Line points={[offsetStart.toArray(), offsetEnd.toArray()]} color="#5C6C7B" lineWidth={1} dashed />

                    {/* Text for the Dimension */}
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
