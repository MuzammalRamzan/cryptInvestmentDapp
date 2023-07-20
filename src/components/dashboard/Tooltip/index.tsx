import React from "react";

const Tooltip: React.FC<{ children?: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <div className="group relative">
      {children}
      <span
        className="group-hover:opacity-100 whitespace-nowrap transition-opacity  bg-gray-600 px-1.5 py-1 text-[10px] text-gray-100 rounded-sm absolute -bottom-2 left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 mx-auto z-50"
      >
        {label}
      </span>
    </div>
  );
};

export default Tooltip;
