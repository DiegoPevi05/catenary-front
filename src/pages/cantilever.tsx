import { useState, useEffect } from "react";
import CantileverViewer from "../components/cantilevers/CantileverViewer";
import Model3D from "../assets/images/svg/common/3d.svg?react";
import Model2D from "../assets/images/svg/common/2d.svg?react";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";
import {useLocation, useNavigate} from "react-router-dom";
import ChevronLeftIcon from '../assets/images/svg/common/chevron-left.svg?react'

import CantileverForm from "../components/cantilevers/CantileverForm";
import CantileverResults from "../components/cantilevers/CantileverResults";


const CantileverPage = () => {

  const navigate = useNavigate();
  const location = useLocation(); 
  const previousRoute = location.state?.from || "/";


  const goToRoute = (route:string) => {
    navigate(route);
  };

  const [selectedCantilever, setSelectedCantilever] = useState<{ data:CantileverParams | null, cantilever:GermanCantilever | null  }>({data: null  , cantilever: null});
  const [typeOfView,setTypeOfView] = useState<'2D'|'3D'>('2D');

  const handleTypeOfView = (type:'2D'|'3D') => {
    setTypeOfView(type);
  }

  useEffect(()=>{

    const cantilever = location.state?.cantilever as CantileverParams;

    if (!cantilever) {
      navigate("/404");
      return;
    }

    setSelectedCantilever(
      { data: cantilever, cantilever: GermanCantilever.deserialize(cantilever.params) }
    )
  },[location.state])

  const handleChangeType = (code:ModelCode, name:string, type: TypeCantilever ) => {



    setSelectedCantilever((prevSelectedCantilever:any) => {
      if (!prevSelectedCantilever || !prevSelectedCantilever.data) {
        return prevSelectedCantilever;
      }
    
      // Clone the current cantilever
      const updatedCantilever = { ...prevSelectedCantilever.data };

      updatedCantilever.model.code = code;
      updatedCantilever.model.name = name;
      updatedCantilever.params.type = type;

      return {
        data:updatedCantilever,
        cantilever: GermanCantilever.deserialize(updatedCantilever.params)
      };

    });
  }

  const handleChange = (propertyPath: string, value: number) => {
    setSelectedCantilever((prevSelectedCantilever:any) => {
      if (!prevSelectedCantilever || !prevSelectedCantilever.data) {
        return prevSelectedCantilever;
      }

      // Clone the current cantilever
      const updatedCantilever = { ...prevSelectedCantilever.data };

      // Split the path by dots to access nested properties
      const properties = propertyPath.split('.');
      let current = updatedCantilever;

      // Traverse the object up to the second last property
      for (let i = 0; i < properties.length - 1; i++) {
        const key = properties[i];
        current[key] = { ...current[key] }; // Clone the object at each level
        current = current[key];
      }

      // Set the value on the last property in the path
      current[properties[properties.length - 1]] = value;

      return {
        data:updatedCantilever,
        cantilever: GermanCantilever.deserialize(updatedCantilever.params)
      };
    });
  };


  return(
    <Layout>
      <div className="h-full w-full grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl ">
          <div className="w-full h-full flex flex-col justify-start items-start p-4">
            <div className="w-full h-auto flex flex-row justify-start items-start gap-x-4">
              <div className="w-auto flex flex-row gap-x-4">
                <button onClick={()=>goToRoute(previousRoute)} className="w-10 h-10 p-2 bg-secondary-dark text-white duration-300  rounded-full hover:bg-primary active:scale-95">
                  <ChevronLeftIcon className="h-full w-full"/>
                </button>
                <h4 className="font-bold text-secondary-dark">Cantilever</h4>
              </div>
              <div className="w-full flex flex-row justify-end gap-x-2">
                <button onClick={()=>handleTypeOfView('2D')} className={`h-10 w-10 shadow-md rounded-lg active:scale-95 border-2 p-2  ${typeOfView == "2D" ? "bg-primary text-white" : "bg-secondary text-body"}`}>
                  <Model2D className="w-full h-full"/>
                </button>
                <button onClick={()=>handleTypeOfView('3D')} className={`h-10 w-10 shadow-md rounded-lg active:scale-95 border-2 p-2  ${typeOfView == "3D" ? "bg-primary text-white" : "bg-secondary text-body"}`}>
                  <Model3D className="w-full h-full"/>
                </button>
              </div>
            </div>
            {selectedCantilever.cantilever &&
              <CantileverViewer cantilever={selectedCantilever.cantilever}/>
            }
          </div>
        </div>
        <div className="col-span-1 row-span-2 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start gap-y-4">
          {selectedCantilever.cantilever && selectedCantilever.data && 
            <CantileverForm external_id={selectedCantilever.data.external_id} model={selectedCantilever.data.model} handleChange={handleChange} cantilever={selectedCantilever.cantilever} handleChangeType={handleChangeType}/>
          }
        </div>
        <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start gap-y-4 animation-group py-4">

          {selectedCantilever.cantilever && 
            <CantileverResults cantilever={selectedCantilever.cantilever}/>
          }
        </div>
      </div>
    </Layout>
  );
}

export default CantileverPage;
