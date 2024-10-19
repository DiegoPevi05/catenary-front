import { LOGO} from "../assets/images";
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../contexts/AuthContext';
import SvgComponent from "./SvgComponent";
import Align from "../assets/images/svg/common/align.svg?react"
import X from "../assets/images/svg/common/x.svg?react"
import {useState} from "react";

const routes:{label:string, icon:string, route:string, subroutes:string[]}[] = [
  {
    label:"sidebar.dashboard",
    icon:"dashboard",
    route:"/",
    subroutes:[],
  },
  {
    label:"sidebar.via",
    icon:"via",
    route:"/vias",
    subroutes:[],
  },
  {
    label:"sidebar.vanes",
    icon:"vane",
    route:"/vanes",
    subroutes:[],
  },
  {
    label:"sidebar.cantilevers",
    icon:"cantilever_gy_type_1",
    route:"/cantilevers",
    subroutes:["/cantilever"]
  },
  {
    label:"sidebar.droppers",
    icon:"dropper",
    route:"/droppers",
    subroutes:[],
  },
  {
    label:"sidebar.profile",
    icon:"user",
    route:"/profile",
    subroutes:[],
  },
  {
    label:"sidebar.config",
    icon:"gear",
    route:"/config",
    subroutes:[]
  }
]

interface propMenuButton {
  label:string;
  icon:string;
  active:boolean;
  route:string;
  goToRoute:(route:string) => void;
}

const MenuButton = (props:propMenuButton) => {

  const {t} = useTranslation();

  const {label, active, icon ,route, goToRoute} = props;

  return(
    <div onClick={()=>goToRoute(route)} className={`
      w-full h-auto flex flex-row cursor-pointer
      hover:bg-gray-100 duration-300 group
      hover:text-secondary-dark py-2
      ${active ? 'text-secondary-dark border-r-4 border-secondary-dark' : 'text-body' }`}>
      <div className="w-[40%] flex justify-center items-center group-active:scale-95 duration-300">
        <SvgComponent icon={icon} className="h-8 xl:h-10 w-8 x:w-10" />
      </div>
      <div className="w-[60%] flex justify-start items-center group-active:scale-95 duration-300">
        <p className="font-bold">{t(label)}</p>
      </div>
    </div>
  )
}


const Sidebar = () => {
  const navigate  = useNavigate();
  const location = useLocation();
  const {user} = useAuth();
  const {t} =  useTranslation();

  const goToRoute = (route:string) => {
    navigate(route)
  };

  const [openNavbar,setOpenNavbar] = useState<boolean>(false);

  const toggleOpenNavbar = () => {
    setOpenNavbar(!openNavbar);
  }

  return(
    <>
      <div className="xl:hidden w-full flex flex-row items-center justify-start px-2">
        <button onClick={toggleOpenNavbar} className="bg-white text-primary hover:bg-primary hover:text-primary duration-300 active:scale-95 rounded-xl shadow-sm p-2 border border-gray-light">
          <Align className="w-5 h-5"/>
        </button>
        <div className='w-full flex flex-col justify-start items-start px-4'>
          <span className="font-bold text-secondary-dark inline-flex gap-x-2">
            {t('sidebar.greeting')}<p className='text-primary'>{user?.username}</p>
          </span>
          <p>
            {t('sidebar.welcome')}
          </p>
        </div>
      </div>
      <nav className={`${ openNavbar ? "max-xl:left-0" : "max-xl:-left-[300px]"  } duration-300 transition-all max-xl:fixed  max-xl:top-0 max-xl:h-screen w-[300px] max-xl:py-6 xl:w-full h-full flex flex-col justify-start items-start gap-y-6 z-[120] bg-white`}>
        <button onClick={toggleOpenNavbar} className="xl:hidden bg-white text-primary hover:bg-primary hover:text-white duration-300 active:scale-95 rounded-xl ml-auto mr-4 p-1 border border-gray-light">
          <X className="w-8 h-8"/>
        </button>
        <span className="w-full h-auto bg-secondary-dark flex items-center justify-center py-3">
          <img src={LOGO} alt="logo" className="h-8 w-auto"/>
        </span>
        <div className='w-full hidden xl:flex flex-col justify-start items-start px-4'>
          <span className="font-bold text-secondary-dark inline-flex gap-x-2">
            {t('sidebar.greeting')}<p className='text-primary'>{user?.username}</p>
          </span>
          <p>
            {t('sidebar.welcome')}
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-y-none">
          {routes.map((item,index)=>(
            <MenuButton
              key={`key-menu-button-${index}`}
              label={item.label}
              icon={item.icon}
              active={location.pathname === item.route ||  item.subroutes.some(subroute => location.pathname.startsWith(subroute))}
              route={item.route}
              goToRoute={goToRoute}
            />
          ))}
        </div>
        <div className="mt-auto w-full p-none m-none">
          <MenuButton
            key={`logout-btn`}
            label="sidebar.logout"
            icon={"door_open"}
            active={false}
            route={"/logout"}
            goToRoute={goToRoute}
          />
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
