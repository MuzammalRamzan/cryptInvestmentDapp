import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

const localeItems: Array<{ label: string; locale: string; icon: string }> = [
  {
    label: "English",
    locale: "en",
    icon: "emojione:flag-for-united-states",
  },
  {
    label: "Spanish",
    locale: "es",
    icon: "emojione:flag-for-spain",
  },
  {
    label: "French",
    locale: "fr",
    icon: "emojione:flag-for-france",
  },
  {
    label: "German",
    locale: "de",
    icon: "emojione:flag-for-germany",
  },
  {
    label: "Italian",
    locale: "it",
    icon: "emojione:flag-for-italy",
  },
  {
    label: "Portuguese",
    locale: "pt",
    icon: "emojione:flag-for-portugal",
  },
  {
    label: "Dutch",
    locale: "nl",
    icon: "emojione:flag-for-netherlands",
  },
  {
    label: "Romanian",
    locale: "ro",
    icon: "emojione:flag-for-romania",
  },
  {
    label: "Turkish",
    locale: "tr",
    icon: "emojione:flag-for-turkey",
  },
];

const LanguageSwitcher: React.FC<{ variant?: "light" | "dark" }> = ({
  variant = "dark",
}) => {
  const router = useRouter();
  const { locale } = router;
  const current = localeItems.find((item) => item.locale === locale) || {
    label: "English",
    locale: "en",
    icon: "emojione:flag-for-united-states",
  };
  return (
    <Menu as="div" className="relative leading-none">
      <Menu.Button
        as="button"
        className={clsx(
          "group relative w-full inline-flex items-center justify-center overflow-hidden text-base font-medium rounded-md group",
          "relative w-full flex items-center gap-1 transition-all ease-in duration-75",
          variant === "dark"
            ? "text-darkText dark:text-white"
            : "text-gray-black"
        )}
      >
        <span
          className={clsx(
            "text-[1em] flex items-center gap-1 capitalize w-11",
            variant === "dark" ? "text-darkText dark:text-white" : "text-black"
          )}
        >
          <Icon icon={current?.icon} fontSize={18} />
          {current?.locale}
        </span>
        <Icon icon="mdi:chevron-down" fontSize={24} />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className={clsx(
          "mt-4 absolute left-0 lg:left-auto right-0 lg:right-0 flex flex-col gap-2 min-w-[200px] py-3 rounded-md overflow-y-auto max-h-[300px] lg:max-h-fit z-50 shadow-md",
          variant === "dark" ? "bg-gray-50 dark:bg-black" : "bg-gray-50"
        )}
      >
        {localeItems.map((item) => (
          <Menu.Item
            as="li"
            className="group w-full flex gap-2 items-center cursor-pointer px-3 py-2 hover:bg-gradient-to-br from-[#6042ef] to-skin-pink"
            key={item.locale}
            onClick={() =>
              router.replace(router.pathname, router.asPath, {
                locale: item.locale,
              })
            }
          >
            <Icon icon={item.icon} fontSize={18} />
            <span
              className={clsx(
                "text-sm font-normal group-hover:text-white",
                variant === "dark"
                  ? "text-darkText dark:text-white"
                  : "text-black"
              )}
            >
              {item.label}
            </span>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default LanguageSwitcher;
