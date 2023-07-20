import React, { useEffect, useRef, useState } from "react";

interface ITimer {
  d: number;
  h: number;
  m: number;
  s: number;
}
const CountdownTimer: React.FC<{ deadline: Date }> = ({ deadline }) => {
  const [countDown, setCountDown] = useState<ITimer>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      if (distance <= 0) {
        clearInterval(intervalId);
        setCountDown({ ...countDown, d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);
      setCountDown({
        ...countDown,
        d: daysRemaining,
        h: hoursRemaining,
        m: minutesRemaining,
        s: secondsRemaining,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  const isExpired = () => {
    return (
      countDown.d === 0 &&
      countDown.h === 0 &&
      countDown.m === 0 &&
      countDown.s === 0
    );
  };
  return isExpired() ? null : (
    <div className="flex items-center justify-between gap-3 md:gap-4">
      <TimerBox>{countDown.d.toString().padStart(2, "0")} d</TimerBox>
      <TimerBox>{countDown.h.toString().padStart(2, "0")} h</TimerBox>
      <TimerBox>{countDown.m.toString().padStart(2, "0")} m</TimerBox>
      <TimerBox>{countDown.s.toString().padStart(2, "0")} s</TimerBox>
    </div>
  );
};

export default CountdownTimer;

export const TimerBox: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between py-2 rounded-md bg-[#2f32417f] border border-[#ffffff26]">
      <span className="font-normal text-xl lg:text-2xl whitespace-nowrap text-white">
        {children}
      </span>
    </div>
  );
};
