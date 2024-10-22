import GermanCantilever from "../../models/cantilevers/GermanCantilever";
import ChevronDown from "../../assets/images/svg/common/chevron-down.svg?react";
import ChevronUp from "../../assets/images/svg/common/chevron-up.svg?react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import SvgComponent from "../SvgComponent";
import { OptionsCantileverData } from "../../models/cantilevers/data";

interface PropsCantileverSelector {
  options:{ id:number, model:ModelInterface, icon:string }[];
  currentOption: { model:ModelInterface };
  onChangeType:(model:ModelInterface ) => void;
}

const CantileverSelector = (props:PropsCantileverSelector) => {

  const {options, currentOption, onChangeType} = props;

  const currentIcon = options.find((item) => (item.model.code == currentOption.model.code && item.model.type.configuration == currentOption.model.type.configuration && item.model.type.contactWireConfiguration ==  currentOption.model.type.contactWireConfiguration))

  const [showOptions,setShowOptions] = useState<boolean>(false);

  const toggleShow = () => {
    setShowOptions(!showOptions);
  }

  const handleSelectOption = (option:{ id:number, model:ModelInterface, icon:string }) => {
    onChangeType(option.model);
    setShowOptions(false);
  }

  return(
    <div className="w-full h-auto relative my-4">
      <div onClick={toggleShow} className="w-[95%] h-auto flex flex-row items-center text-body shadow-sm border border-gray-light rounded-xl px-6 py-4 hover:bg-primary hover:text-white cursor-pointer active:scale-95 duration-300 mx-auto">
        <span className="h-full w-24">
          <SvgComponent icon={currentIcon?.icon ?? ""}/>
        </span>
        <div className="w-full h-full flex flex-col items-end">
          <span className="h-auto w-auto flex flex-row gap-x-4">
            <p className="">Model:</p>
            <p className=" font-bold">{currentOption.model.name}</p>
          </span>
          <span className="h-auto w-auto flex flex-row gap-x-4">
            <p className="">Type:</p>
            <p className=" font-bold">{currentOption.model.type.configuration}</p>
          </span>
          <span className="h-auto w-auto flex flex-row gap-x-4">
            <p className="">Contact Wire Configuration:</p>
            <p className=" font-bold">{currentOption.model.type.contactWireConfiguration}</p>
          </span>
        </div>
      </div>
      {showOptions && 
        <div className="absolute top-[110%] w-[95%] left-[2.5%] max-h-[400px] h-auto py-4 shadow-sm rounded-xl border-2 border-gray-light bg-transparent flex flex-col gap-y-4 justify-start items-start overflow-y-scroll bg-white animation-element slide-in-up">
          {options.map((option,index)=>{
            return(
              <div onClick={()=>handleSelectOption(option)} key={"key_option_cantilever_"+index} className="w-[95%] h-auto flex flex-row items-center text-body shadow-sm border border-gray-light rounded-xl px-6 py-4 hover:bg-primary hover:text-white cursor-pointer active:scale-95 duration-300 mx-auto">
                <span className="h-full w-24">
                  <SvgComponent icon={option.icon}/>
                </span>
                <div className="w-full h-full flex flex-col items-end">
                  <span className="h-auto w-auto flex flex-row gap-x-4">
                    <p className="">Model:</p>
                    <p className=" font-bold">{option.model.name}</p>
                  </span>
                  <span className="h-auto w-auto flex flex-row gap-x-4">
                    <p className="">Type</p>
                    <p className=" font-bold">{option.model.type.configuration}</p>
                  </span>
                  <span className="h-auto w-auto flex flex-row gap-x-4">
                    <p className="">Contact Wire Configuration:</p>
                    <p className=" font-bold">{option.model.type.contactWireConfiguration}</p>
                  </span>
                </div>
              </div>
            )
          })}
        </div> 
      }
    </div>
  )
}


interface SectionProps {
  children:React.ReactNode;
  label:string;
  defaultOpen?:boolean
}

const SectionForm = (props:SectionProps) => {
  const { children, label, defaultOpen = false } = props;
  const {t} = useTranslation();

  const [isOpen,setIsOpen] = useState<boolean>(defaultOpen);

  const toogleOpen = () => {
    setIsOpen(!isOpen);
  }

  return(
    <div className="w-full h-auto flex flex-col">
      <span onClick={toogleOpen} className="flex flex-row justify-between items-center text-primary bg-secondary hover:bg-gray-100 px-4 py-2 cursor-pointer">
        <label className="capitalize font-bold">{t(label)}</label>
        {isOpen ?
          <ChevronDown className="h-10 w-10"/>
        :
          <ChevronUp className="h-10 w-10"/>
        }
      </span>
      <div className={`${isOpen ? "h-[400px]" : "h-[0px]"} w-full no-scroll-bar overflow-y-scroll duration-300 transition-all`}>
        <div className={`w-full ${isOpen ? "" : "hidden"} duration-300 transition-all grid grid-cols-2 p-4 gap-4`}>
          {children}
        </div>
      </div>
    </div>
  )
};


interface CantileverFormProps {
  external_id:string;
  model:ModelInterface;
  cantilever:GermanCantilever;
  handleChange: (propertyPath: string, value: number) => void;
  handleChangeType:(model:ModelInterface ) => void;
}

const CantileverForm = (props:CantileverFormProps) => {

  const { external_id, model,  cantilever, handleChange, handleChangeType } = props;

  return(
    <div className="w-full h-full flex flex-col py-4 z-20">
      <h4 className="font-bold text-secondary-dark px-4 my-2">{"Cantilever "+external_id}</h4>

      <label className="font-bold text-secondary-dark px-4">Cantilever Type</label>
      <CantileverSelector currentOption={{model}} options={OptionsCantileverData} onChangeType={handleChangeType}/>
      <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll">
        <SectionForm label={"Main Params"} defaultOpen={true}>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">System Height (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.system_height}
              onChange={(e) => handleChange('params.system_height', parseFloat(e.target.value))}
            />
          </div>

          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Contact Wire Height (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.contact_wire_height}
              onChange={(e) => handleChange('params.contact_wire_height', parseFloat(e.target.value))}
            />
          </div>

          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Zig Zag (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.zig_zag}
              onChange={(e) => handleChange('params.zig_zag', parseFloat(e.target.value))}
            />
          </div>

          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">PV (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.pv}
              onChange={(e) => handleChange('params.pv', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Esc (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.esc}
              onChange={(e) => handleChange('params.esc', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Bitola (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.bitola}
              onChange={(e) => handleChange('params.bitola', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Stay Tube Inclination (degrees)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.alpha}
              onChange={(e) => handleChange('params.stay_tube.alpha', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Steady Arm Angle (degrees)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.alpha}
              onChange={(e) => handleChange('params.steady_arm.alpha', parseFloat(e.target.value))}
            />
          </div>
        </SectionForm>
        <SectionForm label={"Stay Tube"}>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Isolator</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Full Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.isolator.eye_length}
              onChange={(e) => handleChange('params.stay_tube.isolator.eye_length', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Tube Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.isolator.tube_length}
              onChange={(e) => handleChange('params.stay_tube.isolator.tube_length', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Wire Support</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Distance Eye Clamp (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.mw_support.eye_clamp_distance}
              onChange={(e) => handleChange('params.stay_tube.mw_support.eye_clamp_distance', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">End Distance (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.mw_support.end_distance}
              onChange={(e) => handleChange('params.stay_tube.mw_support.end_distance', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Vertical Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.mw_support.wireSupport.h}
              onChange={(e) => handleChange('params.stay_tube.mw_support.wireSupport.h', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Eye Clamp - Tube to Pin Length</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.eye_clamp.h}
              onChange={(e) => handleChange('params.stay_tube.eye_clamp.h', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Fixed Point</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Pole - Swivel Pin</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.swivel_bracket.x_pin}
              onChange={(e) => handleChange('params.stay_tube.swivel_bracket.x_pin', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Pin - Pin  (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.swivel_clevis.pin_eye}
              onChange={(e) => handleChange('params.stay_tube.swivel_clevis.pin_eye', parseFloat(e.target.value))}
            />
          </div>
        </SectionForm>
        <SectionForm label={"Bracket Tube"}>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Isolator</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Full Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.isolator.eye_length}
              onChange={(e) => handleChange('params.stay_tube.isolator.eye_length', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Tube Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.isolator.tube_length}
              onChange={(e) => handleChange('params.stay_tube.isolator.tube_length', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Fixed Point</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Pole - Swivel Pin</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.bracket_tube.swivel_bracket.x_pin}
              onChange={(e) => handleChange('params.bracket_tube.swivel_bracket.x_pin', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Pin - Pin  (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.bracket_tube.swivel_clevis.pin_eye}
              onChange={(e) => handleChange('params.bracket_tube.swivel_clevis.pin_eye', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Clevis End Fitting</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Full Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.bracket_tube.clevis_end_fitting.L}
              onChange={(e) => handleChange('params.bracket_tube.clevis_end_fitting.L', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Tube Length  (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.bracket_tube.clevis_end_fitting.a}
              onChange={(e) => handleChange('params.bracket_tube.clevis_end_fitting.a', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Eye Clamp</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Tube to Pin Length</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.stay_tube.eye_clamp.h}
              onChange={(e) => handleChange('params.stay_tube.eye_clamp.h', parseFloat(e.target.value))}
            />
          </div>
        </SectionForm>
        <SectionForm label={"Steady Arm"}>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Swivel Clip</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">End Distance (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.end_distance}
              onChange={(e) => handleChange('params.steady_arm.end_distance', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Center to Cw (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.swivel_clip.cw_height}
              onChange={(e) => handleChange('params.steady_arm.swivel_clip.cw_height', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Angle to Cw (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.swivel_clip.cw_angle}
              onChange={(e) => handleChange('params.steady_arm.swivel_clip.cw_angle', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label className="font-bold text-secondary-dark">Hook End Fitting</label>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Full Length (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.hook_end_fitting.L}
              onChange={(e) => handleChange('params.steady_arm.hook_end_fitting.L', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-2">
            <p className="font-bold text-primary ">Tube Length  (mm)</p>
            <input
              type="number"
              className="border-b-[2px] border-b-primary focus:outline-none focus:border-b-[3px] w-full px-2 py-2"
              value={cantilever.steady_arm.hook_end_fitting.a}
              onChange={(e) => handleChange('params.steady_arm.hook_end_fitting.a', parseFloat(e.target.value))}
            />
          </div>
        </SectionForm>
      </div>
    </div>
  )
}

export default CantileverForm;
