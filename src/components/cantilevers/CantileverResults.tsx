import Compas from "../../assets/images/svg/common/results.svg?react";
import GermanCantilever from "../../models/cantilevers/GermanCantilever";
import Diameter from "../../assets/images/svg/common/diameter.svg?react";
import Download from "../../assets/images/svg/common/download.svg?react";

interface ResultsProps {
  cantilever:GermanCantilever;
}
const CantileverResults = (props:ResultsProps) => {

  const {cantilever} = props;

  const results = cantilever.generateResults();

  return(
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll">
        <div className="w-full duration-300 transition-all grid grid-cols-2 px-4 gap-4">
          <div className="col-span-1 text-secondary-dark flex flex-row gap-x-4">
            <Compas className="h-8 w-8"/>
            <h5 className="font-bold">Results</h5>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <span className="h-10 w-10 shadow-md rounded-lg active:scale-95 border-2 p-2 hover:bg-primary hover:text-white cursor-pointer">
              <Download className="h-full w-full"/>
            </span>
          </div>
          <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
              <p className="font-bold text-secondary-dark">Stay Tube</p>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.stay_tube.tube.d}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Thick Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.stay_tube.tube.s}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Length Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "stay_tube")?.length_tube}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Cut Length (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "stay_tube")?.cut_length}
                readOnly
              />
            </div>
          </div>
          <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
              <p className="font-bold text-secondary-dark">Bracket Tube</p>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary  inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"

                value={cantilever.bracket_tube.tube.d}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Thick Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.bracket_tube.tube.s}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Length Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "bracket_tube")?.length_tube}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary ">Cut Length (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "bracket_tube")?.cut_length}
                readOnly
              />
            </div>
          </div>

          {results.filter((item) => item.name == "steady_arm").map((std_arm,index)=>{
            return(
              <div key={`steady_arm_${index}`} className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
                <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
                  <p className="font-bold text-secondary-dark">Steady Arm {index + 1}</p>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                  <p className="font-bold text-primary  inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
                  <input
                    className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                    value={cantilever.steady_arm.tube.d}
                    readOnly
                  />
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                  <p className="font-bold text-primary ">Thick Tube (mm)</p>
                  <input
                    className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                    value={cantilever.steady_arm.tube.s}
                    readOnly
                  />
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                  <p className="font-bold text-primary ">Length Tube (mm)</p>
                  <input
                    className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                    value={std_arm.length_tube}
                    readOnly
                  />
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                  <p className="font-bold text-primary ">Cut Length (mm)</p>
                  <input
                    className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                    value={std_arm.cut_length}
                    readOnly
                  />
                </div>
              </div>
            );
          })}

          {cantilever.model.type.configuration == "SBA" && cantilever.steady_arm.stainless_steel_wire_rope && (

            results.filter((item) => item.name == "steel_cable").map((st_cable,index)=>{
              return(
                <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
                  <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
                    <p className="font-bold text-secondary-dark">Stainless Steel Wire {index + 1}</p>
                  </div>
                  <div className="col-span-2 flex flex-col justify-start items-start gap-y-2">
                    <p className="font-bold text-primary  inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Stainless Steel Diameter(mm)</p>
                    <input
                      className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                      value={cantilever.steady_arm.stainless_steel_wire_rope?.d}
                      readOnly
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                    <p className="font-bold text-primary ">Length Wire (mm)</p>
                    <input
                      className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"

                      value={st_cable.length_tube}
                      readOnly
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
                    <p className="font-bold text-primary ">Cut Length (mm)</p>
                    <input
                      className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                      value={st_cable.cut_length}
                      readOnly
                    />
                  </div>
                </div>
              )
            })
          )}

        </div>
      </div>
    </div>
  );
}

export default CantileverResults;
