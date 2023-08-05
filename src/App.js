import React, { useState } from "react";
import Select from "react-select";
import { Drawer } from "@material-tailwind/react";
import DrawerMenu from "./components/Drawer";
import "./App.css"

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(true);
  };

  const toggleClose = () => {
    setIsOpen(false);
  }
  return (
    <div className="bg-[#847d7e] min-h-[100vh]">
      <div className="w-full bg-[#32c1ae] py-5 px-10 flex items-center">
        <i class="fa-solid fa-arrow-left mr-10 cursor-pointer mt-1 text-white flex items-center"></i>
        <p className="font-bold text-xl text-white">View Audience</p>
      </div>
      <div className="">
        <button
          className="text-white m-10 px-10 py-2 border-[2px] rounded border-white"
          onClick={toggleDrawer}
        >
          Save segment
        </button>
      </div>
      <DrawerMenu isOpen={isOpen} toggleClose={toggleClose} />
    </div>
  );
};

export default App;