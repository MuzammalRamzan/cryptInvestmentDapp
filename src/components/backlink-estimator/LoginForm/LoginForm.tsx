import useDisclosure from "@/hooks/useDisclosure";
import useUserLogin from "@/hooks/user/useUserLogin";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Input from "../Input";

const LoginForm = () => {
  const t = useTranslations("BacklinkEstimator");
  const { login } = useUserLogin();
  const {
    isOpen: isLoading,
    onOpen: onStartLoading,
    onClose: onStopLoading,
  } = useDisclosure();
  const { setActiveSection, setIsAuthenticated, setProfile } = useAppStore();
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validate = () => {
    if (!email) {
      toast.error(t("Email is required"));
      return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error(t("Invalid email."));
      return false;
    }
    if (!password) {
      toast.error(t("Password is required"));
      return false;
    }
    if (password.length < 8) {
      toast.error(t("Password must be at least 8 characters"));
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (isLoading) return;
    const isValid = validate();
    if (!isValid) return;
    try {
      onStartLoading();
      const res = await login({ email, password });
      const data = await res.json();
      if (data.response) {
        toast.success(t("You're successfully loggedin"));
        setIsAuthenticated(true);
        setProfile(data.response);
        localStorage.setItem("user", JSON.stringify(data.response));
        return;
      }
      if (!data.success && data.message) {
        toast.error(data?.message || "Invalid credentials");
      }
    } catch (e) {
      toast.error(t("Connection failed"));
    } finally {
      onStopLoading();
    }
  };
  return (
    <div
      className="mt-10 shadow-md p-8 mb-7 flex gap-8"
      style={{
        boxShadow: "0px 4px 53px 0px rgba(170, 170, 170, 0.25)",
      }}
    >
      <div className="flex-1">
        <div className="flex gap-4 lg:gap-8 flex-col md:flex-row">
          <div className="flex-1">
            <label className="text-[#333641] font-bold text-sm mb-4 block">
              {t("Email")}
            </label>
            <Input
              placeholder={t("Enter email")}
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="flex-1">
            <label className="text-[#333641] font-bold text-sm mb-4 block">
              {t("Password")}
            </label>
            <Input
              placeholder={t("Enter Password")}
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-5 flex items-start md:items-center gap-4 lg:gap-6 flex-col md:flex-row">
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="outline-none border-none flex justify-center items-center rounded-md bg-gradient-to-r from-[#D03A9D] to-[#8540D5] h-[52px] px-4 text-sm font-medium w-full md:w-[212px] text-white hover:bg-gradient-to-r hover:from-[#D03A9D] hover:to-[#D03A9D] disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Icon icon="svg-spinners:bars-rotate-fade" fontSize={20} />
            ) : (
              t("Login")
            )}
          </button>
          <p className="flex items-center gap-3 font-normal text-[#93A1B1] text-base mt-3 whitespace-nowrap">
            {t("Don't have account ?")}{" "}
            <button
              className="border-none outlone-none bg-transparent hover:text-skin-pink"
              onClick={() => setActiveSection("register")}
            >
              {t("Sign Up")}
            </button>
          </p>
        </div>
      </div>
      <div className="w-52 hidden md:flex flex-col justify-center items-center p-4 lg:p-6 rounded-md border border-[#E8E8FF]">
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.4318 26.9077L19.6029 5.565C19.1552 4.81979 18.3691 4.375 17.5 4.375C16.6308 4.375 15.8448 4.81979 15.3985 5.56354L2.5681 26.9077C2.1131 27.6646 2.10143 28.611 2.53602 29.3796C2.96914 30.1481 3.78727 30.625 4.67102 30.625H30.3304C31.2127 30.625 32.0323 30.1481 32.4654 29.3796C32.9 28.611 32.8868 27.6646 32.4318 26.9077ZM18.2291 26.25H16.7708C16.3683 26.25 16.0416 25.9233 16.0416 25.5208V24.0625C16.0416 23.66 16.3683 23.3333 16.7708 23.3333H18.2291C18.6316 23.3333 18.9583 23.66 18.9583 24.0625V25.5208C18.9583 25.9233 18.6316 26.25 18.2291 26.25ZM17.5 20.4167C16.695 20.4167 16.0416 19.7633 16.0416 18.9583V14.5833C16.0416 13.7783 16.695 13.125 17.5 13.125C18.305 13.125 18.9583 13.7783 18.9583 14.5833V18.9583C18.9583 19.7633 18.305 20.4167 17.5 20.4167Z"
            fill="url(#paint0_linear_450_1025)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_450_1025"
              x1="3.1759"
              y1="10.5867"
              x2="30.7922"
              y2="27.5745"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.1983" stopColor="#D03A9D" />
              <stop offset="1" stopColor="#8540D5" />
            </linearGradient>
          </defs>
        </svg>
        <p className="mt-6 font-medium text-[#414D5B] text-sm lg:text-base leading-5 text-center">
          {t("Please login first to see the data")}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
