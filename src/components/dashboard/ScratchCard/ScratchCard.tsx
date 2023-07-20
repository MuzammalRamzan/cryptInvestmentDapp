import React, { useRef, useState, useEffect } from "react";

interface IScratchCardProps {
  imageSrc: string;
  height: number;
  width: number;
  onComplete: () => void;
}

const ScratchCard: React.FC<IScratchCardProps> = ({
  imageSrc,
  height,
  width,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx: any = canvas?.getContext("2d");
    // Draw the background image
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, width, height);
    };
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 20;
    // ctx.globalCompositeOperation = "destination-out";
  }, [imageSrc, width, height]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as any;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillColor = "#ffffff";
    ctx.fill();
  };

  const getScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const imageData: any = ctx?.getImageData(0, 0, width, height);
    const data = imageData.data;
    let scratchedPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (
        data[i] === 0 &&
        data[i + 1] === 0 &&
        data[i + 2] === 0 &&
        data[i + 3] === 0
      ) {
        scratchedPixels++;
      }
    }
    return (scratchedPixels / (width * height)) * 100;
  };

  useEffect(() => {
    const percentage = getScratchPercentage();
    if (isScratching) {
      setScratchPercentage(percentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScratching]);

  useEffect(() => {
    if (scratchPercentage > 40) {
      onComplete();
    }
  }, [scratchPercentage, onComplete]);
  return (
    <div className="bg-white h-fit w-fit border border-white">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => setIsScratching(true)}
        onMouseUp={() => setIsScratching(false)}
        onMouseMove={(e) => {
          if (isScratching) {
            scratch(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          }
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ScratchCard;
