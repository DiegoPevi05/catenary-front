import Compas from "../../assets/images/svg/common/results.svg?react";
import GermanCantilever from "../../models/cantilevers/GermanCantilever";
import Diameter from "../../assets/images/svg/common/diameter.svg?react";

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
          <div className="col-span-2 text-secondary-dark flex flex-row gap-x-4">
            <Compas className="h-8 w-8"/>
            <h5 className="font-bold">Results</h5>
          </div>
          <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
              <label className="font-bold text-secondary-dark">Stay Tube</label>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.stay_tube.tube.d}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Thick Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.stay_tube.tube.s}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Length Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "stay_tube")?.length_tube}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Cut Length (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "stay_tube")?.cut_length}
                readOnly
              />
            </div>
          </div>
          <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
              <label className="font-bold text-secondary-dark">Bracket Tube</label>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"

                value={cantilever.bracket_tube.tube.d}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Thick Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.bracket_tube.tube.s}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Length Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "bracket_tube")?.length_tube}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Cut Length (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "bracket_tube")?.cut_length}
                readOnly
              />
            </div>
          </div>

          <div className="col-span-2 gap-y-2 grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full h-auto border-b-gray-light border-b-2 pb-2 mb-4">
              <label className="font-bold text-secondary-dark">Steady Arm</label>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm inline-flex gap-x-2"><Diameter className="w-5 h-5"/> Tube Diameter (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.steady_arm.tube.d}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Thick Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={cantilever.steady_arm.tube.s}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Length Tube (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "steady_arm")?.length_tube}
                readOnly
              />
            </div>
            <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
              <p className="font-bold text-primary text-sm">Cut Length (mm)</p>
              <input
                className="border-[3px] border-gray-lights text-body rounded-xl focus:outline-none focus:border-[3px] w-full px-2 py-2 text-center"
                value={results.find(item=> item.name == "steady_arm")?.cut_length}
                readOnly
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CantileverResults;
