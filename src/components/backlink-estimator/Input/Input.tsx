import React, { DetailedHTMLProps, HTMLAttributes } from "react";

const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  return (
    <input
      className="outline-none border border-[#E8E8FF] rounded-[6px] h-[52px] px-4 text-sm font-medium placeholder:text-[#93A1B1] w-full focus:border-skin-pink"
      type="text"
      {...props}
    />
  );
};

export default Input;
