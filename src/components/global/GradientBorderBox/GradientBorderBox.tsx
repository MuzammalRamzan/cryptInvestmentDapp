import clsx from "clsx";
import React from "react";
const GradientBorderBox: React.FC<{
  children?: React.ReactNode;
  roundedClass?: string;
}> = ({ children, roundedClass = "rounded-[20px]" }) => {
  return (
    <div className={clsx("p-[1px] bg-gradient", roundedClass && roundedClass)}>
      <div
        className={clsx(
          "bg-[#030B1C] overflow-hidden h-full",
          roundedClass && roundedClass
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBorderBox;
