import Image from "next/image";
import React from "react";

interface IYPREDProps {
  layout?: "fill" | "responsive" | "fixed";
  height?: number;
  width?: number;
}

const YPREDLogo: React.FC<IYPREDProps> = ({
  layout = "fixed",
  height = 60,
  width = 54,
}) => {
  return (
    <Image
      src="/img/dashboard/YPRED.png"
      layout={layout}
      {...(layout !== "fill" && { height, width })}
      alt="YPRED"
      objectFit="contain"
    />
  );
};

export default YPREDLogo;
