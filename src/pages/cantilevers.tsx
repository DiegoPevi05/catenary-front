import { useState, useEffect } from "react";
import CantileverViewer from "../components/CantileverViewer";
import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";
import {CantileversData} from "../models/cantilevers/data";
import CantileverCard from "../components/CantileverCard";
import SearchBar from "../components/SearchBar";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {Eye} from "lucide-react";


const CantileversPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cantilevers, setCantilevers] = useState<CantileverParams[]>(CantileversData);
  const [selectedCantilever, setSelectedCantilever] = useState<{ data:CantileverParams | null, cantilever:GermanCantilever | null  }>({data: null  , cantilever: null});

  useEffect(()=>{
    setSelectedCantilever(
      { data: CantileversData[0], 
        cantilever: GermanCantilever.deserialize(CantileversData[0].params)
      }
    )
  },[])

  const handleSelectCantilever = (cantileverId:number) => {
    const searchedCantilever = CantileversData.find(cantilever => cantilever.id == cantileverId); 
    if(searchedCantilever){
      setSelectedCantilever(
        { data: searchedCantilever, 
          cantilever: GermanCantilever.deserialize(searchedCantilever.params)
        }
      )
    }
  };

  const handleDeleteCantilever = (cantileverId:number) => {
    console.log(`Modal Deleted: ${cantileverId}`);
  };

  const handleDownloadCantilever = (cantileverId:number) => {
    console.log(`Download Cantilever: ${cantileverId}`);
  }

  const handleSearchCantilevers = (value:string, filter:string) => {
    console.log(`Search Cantilever: ${value},  value ${filter}`);
  } 

  const handleAddCantilever = () => {
    console.log(`Add Cantilever`);
  };


  const handleClickCantilever = (cantileverId: number) => {
    navigate(`/cantilever/${cantileverId}`, {
      state: { from: location.pathname }, // Pass the current route as `from`
    });
  };

  console.log(cantilevers)


  return(
      <Layout>
        <div className="h-full w-full grid grid-cols-3 gap-4">
          <div className="col-span-2 row-span-1 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4 gap-y-4 animation-group">
            <div className="w-auto h-auto flex flex-row justify-start items-center gap-x-4">
              <h4 className="font-bold text-body">Cantilevers</h4>
              <span className="bg-body text-white rounded-full h-8 w-8 font-bold flex items-center justify-center">
                {cantilevers.length}
              </span>
            </div>
            <SearchBar 
              input_placeholder="Search Cantilever" 
              onSearch={handleSearchCantilevers}
              filters={[{value:"model",label:"Model"}, {value:"type",label:"Type"}, {value:"via",label:"Via"}]}
              btnLabel={"Add Cantilever"} 
              btnAction={handleAddCantilever}
            />
            {cantilevers.map((cantilever,index)=>{
              return(
                <CantileverCard 
                  key={index} 
                  cantilever={cantilever} 
                  index={index} 
                  onHandler={handleSelectCantilever}
                  openHandler={handleClickCantilever}
                  onDelete={handleDeleteCantilever}
                  onDownload={handleDownloadCantilever}
                />
              )
            })}
          </div>
          <div className="col-span-1 border-2 border-gray-light rounded-xl flex flex-col justify-start items-start p-4 gap-y-4">
            <h5 className="font-bold text-secondary-dark">{`Cantilever: ${selectedCantilever.data?.external_id}`}</h5>
            { 
              selectedCantilever &&
              selectedCantilever.cantilever &&
              selectedCantilever.data  &&
              (

                <>
                  <div className="w-full h-[300px] flex flex-col justify-start items-start p-4">
                      <CantileverViewer cantilever={selectedCantilever.cantilever}/>
                  </div>
                  <div className="w-full h-auto grid grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                      <p className="font-bold text-xs">Contact Wire</p>
                      <span className="border-b-2 border-b-primary focus:outline-none w-full px-2">
                        {selectedCantilever.cantilever?.contact_wire_height}
                      </span>
                    </div>

                    <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                      <p className="font-bold text-xs">System Height</p>
                      <span className="border-b-2 border-b-primary focus:outline-none w-full px-2">
                        {selectedCantilever.cantilever?.system_height}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-auto flex flex-row justify-end">
                    <Button onClick={()=>handleClickCantilever(selectedCantilever.data.id)} rightIcon={<Eye/>} size="sm" className="h-full font-bold text-nowrap">{"See Details"}</Button>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </Layout>
  );
}

export default CantileversPage;
