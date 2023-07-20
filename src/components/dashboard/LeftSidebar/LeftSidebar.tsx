import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tooltip from "../Tooltip";
import YPREDLogo from "../YPREDLogo";

const LeftSidebar = () => {
  return (
    <div className="hidden w-[80px] lg:w-[130px] bg-dashboard-light-purple h-screen md:block">
      <div className="p-4 md:p-5">
        <div className="relative h-16 w-full">
          {/* <Image
            src="/img/dashboard/logo.svg"
            alt="Logi Ypred"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          /> */}
          <Link href="/" passHref>
            <YPREDLogo layout="fill" />
          </Link>
        </div>
      </div>
      <ul className="w-full list-none mt-8">
        <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Dashboard">
            <Link href="/app">
              <Icon
                fontSize={40}
                icon="material-symbols:home-outline-rounded"
              />
            </Link>
          </Tooltip>
        </li>
        {/* <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Affiliate Program">
            <Link href="/affiliate">
              <Icon fontSize={40} icon="ri:hand-coin-fill" />
            </Link>
          </Tooltip>
        </li> */}
        <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Coming soon">
            <Icon fontSize={40} icon="tabler:layout-dashboard" />
          </Tooltip>
        </li>
        <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Coming soon">
            <Icon fontSize={40} icon="lucide:layout-template" />
          </Tooltip>
        </li>
        <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Coming soon">
            <Icon fontSize={40} icon="ion:extension-puzzle-outline" />
          </Tooltip>
        </li>
        <li className="text p-4 md:p-5 text-white text-16 flex justify-center w-full">
          <Tooltip label="Coming soon">
            <Icon fontSize={40} icon="ion:diamond-sharp" />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
