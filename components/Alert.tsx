/** @format */

import { ReactNode } from "react";

const Alert = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center mt-8 uppercase font-black text-3xl text-red-500">
      {children}
    </div>
  );
};

export default Alert;
