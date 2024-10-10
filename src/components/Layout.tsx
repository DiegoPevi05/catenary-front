import {ReactNode} from "react";
import Sidebar from "./Sidebar";

interface propsLayout {
  children:ReactNode
}

const Layout = (props:propsLayout) => {

  const { children } = props;

  return(
    <div className="w-screen h-screen grid grid-cols-5 grid-rows-1 gap-6 p-6">
      <div className="col-span-1 border-gray-light border-2 rounded-xl py-4 shadow-xl">
        <Sidebar/>
      </div>
      <div className="col-span-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
