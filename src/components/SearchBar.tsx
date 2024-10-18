import Search from "../assets/images/svg/common/search.svg?react";
import PlusIcon from "../assets/images/svg/common/plus.svg?react";
import Filter from "../assets/images/svg/common/filter.svg?react";

import Button from "./Button"
import {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {toast} from "sonner";

interface propsDropDown {
  currentStatus:{ value:string, label:string };
  options:{value:string, label:string}[];
  handleChangeOption:(value: string, label:string) => void;
}

const DropDownComponent = (props:propsDropDown) => {
  const {t} = useTranslation();
  const {currentStatus, options, handleChangeOption} = props;
  const [show,setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const onClickOption = useCallback((value:string,label:string) => {
    handleChangeOption(value,label)
  },[currentStatus,handleChangeOption]);

  return(
    <div className="min-w-36 w-auto px-4 h-full py-1 bg-primary relative flex items-center justify-center text-white rounded-xl border-2 hover:border-white hover:bg-primary-dark cursor-pointer active:scale-95 duration-300 z-[50]" onClick={toggleShow}>
      <label className="inline-flex gap-x-2 cursor-pointer font-bold">{currentStatus.label} <Filter className="w-5 h-5"/></label>
      {show && 
        <div 
          className="absolute top-full w-full h-auto flex flex-col mt-2 z-[50] border-2 border-gray-light rounded-xl">
          {options.map((option,index)=> {
            return(
              <span onClick={()=>onClickOption(option.value,option.label)}  key={`option_${currentStatus.value}_${index}`} className={`w-auto px-4 py-2 bg-white text-secondary-dark  inline-flex items-center justify-center hover:bg-secondary-dark hover:text-white duration-300 ${ index == 0 ? "rounded-t-xl " : "" } ${index == options.length -1 ? "rounded-b-xl" : "" }`}>{t(option.label)}</span>
            )
          })}
        </div>
      }
    </div>
  );
}

interface propsSearchBar {
  input_placeholder:string;
  onSearch:(value:string, filter:string) => void;
  filters:{ value:string, label:string }[];
  btnLabel:string;
  btnAction:() =>void;
}

const SearchBar = (props:propsSearchBar) => {
  const { input_placeholder, onSearch, filters , btnLabel, btnAction } = props;
  const [selectedFitler,setSelectedFilter] = useState({value:filters[0].value, label:filters[0].label});

  const hanldeUpdateSelectedFilter = (value:string,label:string) => {
    setSelectedFilter({value,label})
  }

  const handleOnSearch = useCallback(() => {
    const inputSearch = (document.querySelector("input[name='value_search']") as HTMLInputElement).value;
    if(!inputSearch || inputSearch.length == 0){
      toast.error("Search a valid value");
      return;
    }
    onSearch(inputSearch,selectedFitler.value)
  },[onSearch,selectedFitler])

  return(
    <div className="w-full h-auto flex flex-row justify-start items-end gap-x-4">
      <div className="w-full h-auto flex flex-row border-2 border-gray-light rounded-lg ps-2 text-body">
        <input name="value_search" className="w-full focus:outline-none py-3" placeholder={input_placeholder}/>
        <button onClick={handleOnSearch} className="rounded-lg px-3 py-3 duration-300 hover:bg-gray-100 active:scale-95 group">
          <Search className="group-active:scale-95 w-5 h-5"/>
        </button>
      </div>
      <DropDownComponent currentStatus={selectedFitler} options={filters} handleChangeOption={hanldeUpdateSelectedFilter} />
      <Button onClick={btnAction} rightIcon={<PlusIcon className="w-5 h-5"/>} size="sm" className="h-full font-bold text-nowrap">{btnLabel}</Button>
    </div>
  )
}


export default SearchBar;
