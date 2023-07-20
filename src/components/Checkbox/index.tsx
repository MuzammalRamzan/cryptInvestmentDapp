import clsx from "clsx";
import React from "react";

interface ICheckbox extends React.HTMLProps<HTMLInputElement> {
  label: string;
}
const Checkbox: React.FC<ICheckbox> = (props) => {
  const { type, id, label, ...rest } = props;
  return (
    <div className="flex items-center justify-center gap-3">
      <label
        className="w-fit flex items-center justify-center gap-2"
        htmlFor="analytics"
      >
        <input
          id="analytics"
          type="checkbox"
          // className="h-5 w-5 min-w-[20px] rounded-sm cursor-pointer appearance-none bg-transparent shadow-white border border-#ffffff20 duration-100 ease-in checked:border-white checked:bg-skin-pink checked:shadow-white"
          className={clsx(
            "relative float-left bg-transparent -ml-[1rem] mr-[3px] mt-[0.15rem] h-5 w-5 appearance-none rounded-sm border-[0.125rem] border-solid border-neutral-300 outline-none",
            "before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-['']",
            "checked:bg-skin-pink checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-[0.9px] checked:after:ml-[0.289rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
          )}
          {...rest}
        />
        <span className="text-darkText dark:text-[#eeeeee] text-sm font-normal cursor-pointer select-none">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
