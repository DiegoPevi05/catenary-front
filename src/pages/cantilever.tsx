import { useState, useEffect } from "react";
import CantileverViewer from "../components/CantileverViewer";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";
import {CantileverParams} from "../types/cantilever";
import {CantileversData} from "../models/cantilevers/data";

const CantileverPage = () => {
  const [cantilevers, setCantilevers] = useState<CantileverParams[]>(CantileversData);
  const [selectedCantilever, setSelectedCantilever] = useState<{ data:CantileverParams | null, cantilever:GermanCantilever | null  }>({data: null  , cantilever: null});

  useEffect(()=>{
    setSelectedCantilever(
      { data: CantileversData[0], 
        cantilever: GermanCantilever.deserialize(CantileversData[0].params)
      }
    )
  },[])

    const handleChange = (property: keyof GermanCantilever, value: number) => {
    setSelectedCantilever((prevSelectedCantilever) => {
      if (!prevSelectedCantilever || !prevSelectedCantilever.cantilever) return prevSelectedCantilever;

      // Clone the current cantilever and update the specified property
      const updatedCantilever = new GermanCantilever(
        prevSelectedCantilever.cantilever.type,
        prevSelectedCantilever.cantilever.contact_wire_height,
        prevSelectedCantilever.cantilever.system_height,
        prevSelectedCantilever.cantilever.zig_zag,
        prevSelectedCantilever.cantilever.upper_isolator_length,
        prevSelectedCantilever.cantilever.bottom_isolator_length,
        prevSelectedCantilever.cantilever.alpha_superior_tube,
        prevSelectedCantilever.cantilever.alpha_registration_arm,
        prevSelectedCantilever.cantilever.alpha_steady_arm,
        prevSelectedCantilever.cantilever.bitola,
        prevSelectedCantilever.cantilever.esc,
        prevSelectedCantilever.cantilever.pv,
        prevSelectedCantilever.cantilever.wire_support_wire_to_tube_length,
        prevSelectedCantilever.cantilever.wire_support_end_distance,
        prevSelectedCantilever.cantilever.wire_support_to_eye_clamp_distance,
        prevSelectedCantilever.cantilever.eye_clamp_eye_to_tube_length,
        prevSelectedCantilever.cantilever.swivel_with_clevis_pole_to_pin_distance,
        prevSelectedCantilever.cantilever.swivel_with_clevis_pin_to_fix_connection_length,
        prevSelectedCantilever.cantilever.clevis_end_fitting_pin_to_tube_length,
        prevSelectedCantilever.cantilever.cw_swivel_clip_holder,
        prevSelectedCantilever.cantilever.steady_arm_end_point_distance,
      );

      // Update the property with the new value
      (updatedCantilever as any)[property] = value;

      // Return updated state with new cantilever
      return {
        ...prevSelectedCantilever,
        cantilever: updatedCantilever,
      };
    });
  };


  return(
    <Layout>
      <div className="h-full w-full grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl ">
          <div className="w-full h-full flex flex-col justify-start items-start p-4">
            <label className="font-bold text-secondary-dark">Cantilever</label>
            {selectedCantilever.cantilever == null ?
              <span>{"There is no cantilever selected"}</span>
            :
              <CantileverViewer cantilever={selectedCantilever.cantilever}/>
            }
          </div>
        </div>
        <div className="col-span-1 row-span-2 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4 gap-y-4">
          <label className="font-bold text-secondary-dark">Params</label>
          <div className="w-full h-auto grid grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-xs">Contact Wire</p>
              <input
                type="number"
                className="border-b-2 border-b-primary focus:outline-none w-full px-2"
                value={selectedCantilever.cantilever?.contact_wire_height}
                onChange={(e) => handleChange('contact_wire_height', parseFloat(e.target.value))}
              />
            </div>

            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-xs">System Height</p>
              <input
                type="number"
                className="border-b-2 border-b-primary focus:outline-none w-full px-2"
                value={selectedCantilever.cantilever?.system_height}
                onChange={(e) => handleChange('system_height', parseFloat(e.target.value))}
              />
            </div>

          </div>
        </div>
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4">
          <label className="font-bold text-secondary-dark">Cantilevers</label>
          {cantilevers.map((cantilever,index)=>{
            return(
              <div key={`cantilever-${cantilever.external_id}-${index}`} className="border border-2 border-gray-light rounded-xl flex justify-start items-start w-full h-auto">
                <div className="w-auto h-full flex flex-col justify-start items-start">
                  <div className="flex flex-row">
                    <p>Cantilever</p>
                    <p className="font-bold">{cantilever.external_id}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
}

export default CantileverPage;
