import { useState, useEffect } from "react";
import CantileverViewer from "../components/CantileverViewer";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";
import {CantileversData} from "../models/cantilevers/data";
import {useLocation, useNavigate} from "react-router-dom";
import {ChevronLeftIcon} from "lucide-react";


const CantileverPage = () => {

  const navigate = useNavigate();
  const location = useLocation(); 
  const previousRoute = location.state?.from || "/";

  const goToRoute = (route:string) => {
    navigate(route);
  };

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
        prevSelectedCantilever.cantilever.bitola,
        prevSelectedCantilever.cantilever.esc,
        prevSelectedCantilever.cantilever.pv,
        prevSelectedCantilever.cantilever.stay_tube,
        prevSelectedCantilever.cantilever.bracket_tube,
        prevSelectedCantilever.cantilever.register_arm,
        prevSelectedCantilever.cantilever.steady_arm
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
            <div className="w-auto h-auto flex flex-row justify-start items-start gap-x-4">
              <button onClick={()=>goToRoute(previousRoute)} className="w-10 h-10 p-2 bg-secondary-dark text-white duration-300  rounded-full hover:bg-primary active:scale-95">
                <ChevronLeftIcon className="h-full w-full"/>
              </button>
              <h4 className="font-bold text-secondary-dark">Cantilever</h4>
            </div>
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
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4 gap-y-4 animation-group">
          <label className="font-bold text-secondary-dark">Data</label>
        </div>
      </div>
    </Layout>
  );
}

export default CantileverPage;
