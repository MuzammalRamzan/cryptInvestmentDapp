import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, PaymentIntent } from "@stripe/stripe-js";
import StripeCheckoutForm from "../backlink-estimator/StripeCheckoutForm";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface ModalStripePaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntent: PaymentIntent) => void;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);
const StripePayment: React.FC<ModalStripePaymentProps> = ({
  onClose,
  isOpen,
  onSuccess,
}) => {
  const t = useTranslations("BacklinkEstimator");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const stripe = useStripe();
  useEffect(() => {
    if (router.isReady) {
      if (!stripe) {
        return;
      }
      const { payment_intent_client_secret } = router.query;

      if (!payment_intent_client_secret) {
        return;
      }

      stripe
        .retrievePaymentIntent(payment_intent_client_secret as string)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              toast.success("Payment succeeded!");
              onSuccess(paymentIntent);
              break;
            case "processing":
              toast.success("Your payment is processing.");
              break;
            case "requires_payment_method":
              toast.error("Your payment was not successful, please try again.");
              break;
            default:
              toast.error("Something went wrong.");
              break;
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          router.replace(router.pathname);
        });
    }
  }, [stripe, router]);
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmed(false);
    }
  }, [isOpen]);
  return isOpen ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-3 sm:px-0">
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-neutral-900 opacity-60"
        onClick={onClose}
      ></div>
      <div className="relative w-auto my-0 md:my-6 mx-auto max-w-3xl md:max-w-full">
        <div className="absolute z-10 right-2 md:px-1 top-1 items-stretch px-0 py-2 text-black-500 font-bold uppercase outline-1 text-lg">
          <button
            className="float-right align-right px-1 md:px-3 text-2xl hover:text-red-600"
            type="button"
            onClick={onClose}
          >
            <Icon icon="ic:outline-cancel" />
          </button>
        </div>
        <div className="max-h-screen w-[95vw] md:w-[90vw] lg:w-[60vw] xl:w-[40vw] min-h-[15rem] relative border-0 rounded-2xl shadow-lg flex flex-col justify-between bg-white outline-none focus:outline-none overflow-y-auto overflow-x-hidden text-sm lg-text-lg py-4 pt-0 px-6 md:px-10 ">
          <div
            className="w-[100%] h-[6px] bg-black self-center rounded-xl mb-2"
            style={{
              background:
                "radial-gradient(circle at top left, #f03985, #5144f8)",
            }}
          />
          <div className="flex-1 w-full h-fit mt-8">
            <div className="w-full mt-[24px] mb-[32px]">
              {isConfirmed ? (
                <StripeCheckoutForm onCancel={onClose} />
              ) : (
                <div>
                  <p className="text-sm text-darkText leading-6">
                    {t("confirmMessage")}
                  </p>
                  <div className="mt-8 flex gap-10 items-center justify-end">
                    <button
                      onClick={() => onClose()}
                      type="button"
                      className="relative items-center overflow-hidden text-md font-medium text-red-500"
                    >
                      {t("Cancel")}
                    </button>
                    <button
                      type="submit"
                      onClick={() => setIsConfirmed(true)}
                      className="relative px-6 h-11 min-w-[100px] inline-flex items-center overflow-hidden text-md font-medium group gap-2 justify-center rounded-full hover:scale-[99.5%] bg-gradient text-white"
                    >
                      {t("Confirm")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const ModalStripePayment: React.FC<ModalStripePaymentProps> = (props) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const options = {
    theme: "stripe",
    clientSecret,
  };
  const createPaymentIntent = async () => {
    try {
      fetch("/api/payment-intent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 99 * 100 }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((e) => console.log(e));
    } catch (e) {}
  };
  useEffect(() => {
    createPaymentIntent();
  }, []);
  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <StripePayment {...props} />
    </Elements>
  ) : null;
};

export default ModalStripePayment;
