import { LOGO} from "../assets/images";
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../contexts/AuthContext';
import SvgComponent from "./SvgComponent";

const routes:{label:string, icon:string, route:string}[] = [
  {
    label:"sidebar.dashboard",
    icon:"dashboard",
    route:"/"
  },
  {
    label:"Via",
    icon:"via",
    route:"/vias"
  },
  {
    label:"Vanes",
    icon:"vane",
    route:"/vanes"
  },
  {
    label:"sidebar.cantilevers",
    icon:"cantilever_gy_type_1",
    route:"/cantilevers"
  },
  {
    label:"Droppers",
    icon:"dropper",
    route:"/droppers"
  },
  {
    label:"Profile",
    icon:"user",
    route:"/profile"
  },
  {
    label:"Config",
    icon:"gear",
    route:"/config"
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
        <SvgComponent icon={icon} className="" />
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

  return(
    <nav className="w-full h-full flex flex-col justify-start items-start gap-y-6">
      <span className="w-full h-auto bg-secondary-dark flex items-center justify-center py-3">
        <img src={LOGO} alt="logo" className="h-8 w-auto"/>
      </span>

      <div className='w-full flex flex-col justify-start items-start px-4'>
        <span className="font-bold text-secondary-dark inline-flex gap-x-2">
          {t('sidebar.greeting')}<p className='text-primary'>{user?.username}</p>
        </span>
        <p>
          {t('sidebar.welcome')}
        </p>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-y-4">
        {routes.map((item,index)=>(
          <MenuButton
            key={`key-menu-button-${index}`}
            label={item.label}
            icon={item.icon}
            active={location.pathname === item.route}
            route={item.route}
            goToRoute={goToRoute}
          />
        ))}
        </div>
        <div className="mt-auto w-full p-none m-none">
          <MenuButton
            key={`logout-btn`}
            label="logout"
            icon={"door_open"}
            active={false}
            route={"/logout"}
            goToRoute={goToRoute}
          />
      </div>
    </nav>
  );
}

export default Sidebar;
