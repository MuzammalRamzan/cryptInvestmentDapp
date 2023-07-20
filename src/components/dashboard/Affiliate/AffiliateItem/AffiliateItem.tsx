import { Icon } from "@iconify/react";
import React from "react";

interface IAffiliateItem {
  label: string;
  value: string;
  onCopy: () => void;
}
const AffiliateItem: React.FC<IAffiliateItem> = ({ label, value, onCopy }) => {
  return (
    <div>
      <h4 className="text-white text-2xl">{label}</h4>
      <div className="flex items-center gap-3 bg-black pl-6 pr-2 py-2 mt-2 justify-between rounded-md">
        <p className="w-fit text-white truncate">{value}</p>
        <button
          onClick={() => onCopy()}
          className="h-12 px-3 w-fit rounded bg-dashboard-dark-purple text-white flex items-center justify-center text-2xl hover:bg-gray-800"
        >
          <Icon icon="material-symbols:file-copy-outline-rounded" />
        </button>
      </div>
    </div>
  );
};

export default AffiliateItem;
