import {CircleX, DownloadIcon, Eye} from "lucide-react";
import {useCallback, useState} from "react";
import Modal from "./Modal";
import Button from "./Button";
import SvgComponent from "./SvgComponent";

interface CantileverCard {
  cantilever:CantileverParams;
  onHandler:(cantileverId:number)=>void;
  openHandler:(cantileverId:number)=>void;
  onDelete:(cantileverId:number)=>void;
  onDownload:(cantileverId:number)=>void;
  index:number;
}

const CantileverCard = (props:CantileverCard) => {
  const { cantilever, onHandler, openHandler, onDelete, onDownload, index } = props;

  const onHandlerCantilever = useCallback(() => {
    onHandler(cantilever.id)
  },[cantilever.id,onHandler])

  const onOpenCantilever = useCallback(() => {
    openHandler(cantilever.id)
  },[cantilever.id,openHandler])

  const onDeleteCantilever = useCallback(() => {
    onDelete(cantilever.id)
  },[cantilever.id,onDelete])

  const onDownloadCantilever = useCallback(() => {
    onDownload(cantilever.id)
  },[cantilever.id,onDownload])
  
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  }

  return(
    <>
      <div onClick={onHandlerCantilever} key={`cantilever-${cantilever.id}-${index}`} className="border border-2 border-gray-light rounded-xl flex flex-row justify-start items-start w-full h-auto p-4 duration-300 hover:bg-primary group animation-element slide-in-up bg-white">
        <div className="w-24 h-full p-4 flex justify-center items-center group-active:scale-95 duration-300 text-body group-hover:text-white">
          <SvgComponent icon="cantilever_gy_type_1"/>
        </div>
        <div className="w-auto h-full flex flex-col justify-start items-start gap-y-1 text-body group-hover:text-white">
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Cantilever:</p>
            <p className="font-bold text-sm">{cantilever.external_id}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Pole:</p>
            <p className="font-bold text-sm">{cantilever.pole}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Via:</p>
            <p className="font-bold text-sm">{cantilever.via}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Location:</p>
            <p className="font-bold text-sm">{cantilever.location}</p>
          </div>
        </div>
        <div className="w-auto h-full flex flex-col justify-start items-start gap-y-1 text-body group-hover:text-white ml-12">
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Model:</p>
            <p className="font-bold text-sm">{cantilever.model.name}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Type:</p>
            <p className="font-bold text-sm">{cantilever.params.type}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Updated:</p>
            <p className="font-bold text-sm">{cantilever.updated_at.toISOString().split("T")[0]}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="text-sm">Created by:</p>
            <p className="font-bold text-sm">{cantilever.created_by}</p>
          </div>
        </div>
        <div className="ml-auto w-auto h-full flex flex-col items-center justify-center gap-y-2 text-body group-hover:text-white">
          <p className="font-bold">Actions</p>
          <div className="w-auto flex flex-row justify-center gap-x-2">
            <span onClick={onOpenCantilever} className="w-auto h-auto hover:bg-white hover:text-primary duration-300 p-2 rounded-full active:scale-95 cursor-pointer">
              <Eye className="w-6 h-6"/>
            </span>

            <span onClick={toggleDeleteModal} className="w-auto h-auto hover:bg-white hover:text-primary duration-300 p-2 rounded-full active:scale-95 cursor-pointer">
              <CircleX className="w-6 h-6"/>
            </span>

            <span onClick={onDownloadCantilever} className="w-auto h-auto hover:bg-white hover:text-primary duration-300 p-2 rounded-full active:scale-95 cursor-pointer">
              <DownloadIcon className="w-6 h-6"/>
            </span>
        </div>
      </div>
    </div>
    <Modal key={`modal-delete-${cantilever.id}`} isOpen={openDeleteModal} onClose={toggleDeleteModal}>
      <div  className="w-full h-auto flex flex-col items-center justify-center text-secondary p-12 gap-y-4">
        <div className="w-24 h-full p-4 flex justify-center items-center active:scale-95 duration-300">
          <SvgComponent icon="cantilever_gy_type_1"/>
        </div>
        <p className="text-primary">Are you sure you want to delete this Cantilever</p>
        <div className="w-full h-auto gap-x-4 flex items-center justify-center">
          <Button onClick={toggleDeleteModal}>Cancel</Button>
          <Button onClick={onDeleteCantilever}>Delete</Button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default CantileverCard
