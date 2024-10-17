import Home from "../assets/images/svg/common/home.svg?react";
import Button from "../components/Button";
import LoaderVane from "../components/loaders/VaneLoader";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return(
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-primary gap-y-4">
      <LoaderVane/>
      <h5 className="font-bold text-primary">Page not found</h5>
      <Button onClick={()=>navigate("/")} size="sm" rightIcon={<Home/>}>Go Back </Button>
    </div>
  )
}

export default NotFoundPage;
