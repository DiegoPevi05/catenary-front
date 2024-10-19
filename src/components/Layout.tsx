import {ReactNode} from "react";
import Sidebar from "./Sidebar";

interface propsLayout {
  children:ReactNode
}

const Layout = (props:propsLayout) => {

  const { children } = props;

  return(
    <div className="w-screen h-screen flex flex-col xl:grid xl:grid-cols-5 xl:grid-rows-1 gap-6 p-6">
      <div className="w-full h-auto xl:col-span-1 border-gray-light border-2 rounded-xl py-4 shadow-sm">
        <Sidebar/>
      </div>
      <div className="w-full h-full flex flex-col items-start justify-start xl:col-span-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;
