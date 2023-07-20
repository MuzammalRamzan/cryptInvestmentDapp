import Head from 'next/head';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import SuccessLottie from '../../assets/lottie/success.json';
interface ModalThankyouProps {
  isOpen: boolean;
  onClose: () => void;
  revenue: number;
}

const ModalThankyou: React.FC<ModalThankyouProps> = ({
  isOpen,
  onClose,
  revenue,
}) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
  }, [isOpen]);
  return isOpen ? (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://rajsharma.iljmp.com/improvely.js"
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          improvely.init('rajsharma', 1);
improvely.conversion({
	goal: 'sale',    
	revenue: ${revenue},
	reference: '1160'
});
          `,
          }}
        />
      </Head>

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-3 sm:px-0">
        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-neutral-900 opacity-25"
          onClick={onClose}
        ></div>
        <div className="relative w-auto my-0 md:my-6 mx-auto max-w-3xl md:max-w-full">
          <div className="absolute z-10 right-2 md:px-1 top-1 items-stretch px-0 py-1 text-black-500 font-bold uppercase outline-1 text-lg">
            <button
              className="float-right align-right px-1 md:px-3 text-2xl"
              type="button"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="max-h-screen w-[400px] h-[400px] relative border-0 rounded-2xl shadow-lg flex flex-col justify-between outline-none focus:outline-none overflow-y-auto overflow-x-hidden text-sm lg-text-lg py-4 pt-0 px-6 md:px-10 ">
            <Lottie animationData={SuccessLottie} loop={false} />;
            <img
              className="hidden"
              src={`https://d.adroll.com/ipixel/LEJIIZ33LNBX3KFS52AJIA/RFC36FDTHBHCXDG4VVPPDW?name=c2dcd5a0&conversion_value=${revenue}&currency=USD`}
              width="1"
              height="1"
              alt="pixel img"
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ModalThankyou;
