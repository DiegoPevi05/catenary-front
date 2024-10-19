import React from 'react';
import CantileverGYType1 from "../assets/images/svg/cantilevers/cantilever_gy_type_1.svg?react"; // Ensure you're using this import
import CantileverGYType2 from "../assets/images/svg/cantilevers/cantilever_gy_type_2.svg?react"; // Ensure you're using this import
import CantileverGYType3 from "../assets/images/svg/cantilevers/cantilever_gy_type_3.svg?react"; // Ensure you're using this import
import CantileverGYType4 from "../assets/images/svg/cantilevers/cantilever_gy_type_4.svg?react"; // Ensure you're using this import
import Via from "../assets/images/svg/via/via.svg?react"; // Ensure you're using this import
import Vane from "../assets/images/svg/vane/vane.svg?react"; // Ensure you're using this import
import Dropper from "../assets/images/svg/dropper/dropper.svg?react"; // Ensure you're using this import
import Dashboard from "../assets/images/svg/common/dashboard.svg?react"; // Ensure you're using this import
import User from "../assets/images/svg/common/user.svg?react"; // Ensure you're using this import
import Gear from "../assets/images/svg/common/gear.svg?react"; // Ensure you're using this import
import DoorOpen from "../assets/images/svg/common/door-open.svg?react"; // Ensure you're using this import


type IconKeys = 'cantilever_gy_type_1'|'cantilever_gy_type_2'|'cantilever_gy_type_3'|'cantilever_gy_type_4'|'via'|'vane'|'dropper'|'dashboard'|'gear'|'user'|'door_open'; // Extend this type as needed

const optionsIcons: Record<IconKeys, React.FC<React.SVGProps<SVGSVGElement>>> = {
  user:User,
  gear:Gear,
  door_open:DoorOpen,
  via:Via,
  vane:Vane,
  dropper:Dropper,
  dashboard:Dashboard,
  cantilever_gy_type_1: CantileverGYType1,
  cantilever_gy_type_2: CantileverGYType2,
  cantilever_gy_type_3: CantileverGYType3,
  cantilever_gy_type_4: CantileverGYType4
};

interface PropsSvgComponent {
  className?: string;
  icon: string; // Allow any string to be passed
}

const SvgComponent: React.FC<PropsSvgComponent> = ({ icon, className = '' }) => {
  // Type assertion with runtime validation
  const isValidIconKey = (key: string): key is IconKeys => {
    return key in optionsIcons;
  };

  if (!isValidIconKey(icon)) {
    console.warn(`Invalid icon key: ${icon}`); // Warn about invalid keys
    return null; // or return a fallback element if desired
  }

  const SelectedIcon = optionsIcons[icon]; // Get the icon component

  return (
    <span className={className} style={{ display: 'inline-flex', color: 'inherit' }}>
      <SelectedIcon width="full" height="full"/>
    </span>
  );
};

export default SvgComponent;
