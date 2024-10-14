import { useState } from "react";
import CantileverViewer from "../components/CantileverViewer";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";

const CantileverPage = () => {
  const [cantilever, setCantilever] = useState(new GermanCantilever(
    "TDP<2.2", // type
    4500, // Contact Wire Height
    1600, // System Height
    -150, // Zig Zag
    262, // Isolator_top_eye_to_tube_length
    262, // Isolator_bottom_eye_to_tube_length
    4, // Superior Tube Inclination
    0, // Inferior Tube Inclination
    0, // Inferior Tube Inclination
    400, // Bitola length
    0, // Height difference between pole fix point and bitola
    2150, // Distance between center of via and pole face
    123, // Wire support wire to tube length
    200, // Wire support wire to end of tube distance
    250, // Wire support to eye clamp distance
    81, // Eye clamp eye to tube length
    42, // Fixed distance pole to pin
    42, // Fixed distance pin to connection
    54, // Clevis end fitting pin to tube length
    { eye_to_cw_x: 15.99, eye_to_cw_y: 100, angle_to_cw: 94 }, // CW Swivel Clip Holder
    40 // End point distance
  ));

  // Handle input changes for specific cantilever properties
  const handleChange = (property: keyof GermanCantilever, value: number) => {
    // Update the cantilever state with the new value for the specified property
    setCantilever((prevCantilever: any) => {
      // Create a new instance with updated property values
      const updatedCantilever = { ...prevCantilever, [property]: value };
      return new GermanCantilever(
        updatedCantilever.type,
        updatedCantilever.contact_wire_height,
        updatedCantilever.system_height,
        updatedCantilever.zig_zag,
        updatedCantilever.upper_isolator_length,
        updatedCantilever.bottom_isolator_length,
        updatedCantilever.alpha_superior_tube,
        updatedCantilever.alpha_registration_arm,
        updatedCantilever.alpha_steady_arm,
        updatedCantilever.bitola,
        updatedCantilever.esc,
        updatedCantilever.pv,
        updatedCantilever.wire_support_wire_to_tube_length,
        updatedCantilever.wire_support_end_distance,
        updatedCantilever.wire_support_to_eye_clamp_distance,
        updatedCantilever.eye_clamp_eye_to_tube_length,
        updatedCantilever.swivel_with_clevis_pole_to_pin_distance,
        updatedCantilever.swivel_with_clevis_pin_to_fix_connection_length,
        updatedCantilever.clevis_end_fitting_pin_to_tube_length,
        updatedCantilever.cw_swivel_clip_holder,
        updatedCantilever.steady_arm_end_point_distance,
      );
    });
  };

  return(
    <Layout>
      <div className="h-full w-full grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl ">
          <div className="w-full h-full flex flex-col justify-start items-start p-4">
            <label className="font-bold text-secondary-dark">Cantilever</label>
            <CantileverViewer cantilever={cantilever}/>
          </div>
        </div>
        <div className="col-span-1 row-span-2 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4 gap-y-4">
          <label className="font-bold text-secondary-dark">Params</label>
          <div className="w-full h-auto grid grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-xs">Contact Wire</p>
              <input
                type="number"
                className="border-b-2 border-b-primary focus:outline-none w-full"
                value={cantilever.contact_wire_height}
                onChange={(e) => handleChange('contact_wire_height', parseFloat(e.target.value))}
              />
            </div>

            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-xs">System Height</p>
              <input
                type="number"
                className="border-b-2 border-b-primary focus:outline-none w-full"
                value={cantilever.system_height}
                onChange={(e) => handleChange('system_height', parseFloat(e.target.value))}
              />
            </div>

          </div>
        </div>
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl flex justify-start items-start p-4">
          <label className="font-bold text-secondary-dark">Cantilevers</label>
        </div>
      </div>
    </Layout>
  );
}

export default CantileverPage;
