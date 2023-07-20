import useDisclosure from "@/hooks/useDisclosure";
import { Icon } from "@iconify/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import toast from "react-hot-toast";

const StripeCheckoutForm: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => {
  const stripe = useStripe();
  const {
    isOpen: isLoading,
    onClose: stopLoading,
    onOpen: startLoading,
  } = useDisclosure();
  const elements = useElements();
  const handleSubmit = async (e: React.FormEvent) => {
    if (!elements || !stripe) return;
    e.preventDefault();
    startLoading();
    try {
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   elements,
      // });
      // if (error) {
      //   return setError(error?.message);
      // } else if (paymentMethod) {
      //   return onSuccess(paymentMethod);
      // }
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/backlink-estimator/`,
        },
      });
      if (
        [
          "invalid_request_error",
          "card_error",
          "validation_error",
          "api_connection_error",
          "api_error",
          "authentication_error",
          "rate_limit_error",
        ].indexOf(error.type) !== -1
      ) {
        return toast.error(
          error.message ||
            "Please make sure that your card information is correct."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (e) {
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      {/* {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>} */}
      <div className="mt-8 flex gap-10 items-center justify-end">
        <button
          onClick={() => onCancel()}
          type="button"
          className="relative items-center overflow-hidden text-md font-medium text-red-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="relative px-6 h-11 min-w-[100px] inline-flex items-center overflow-hidden text-md font-medium group gap-2 justify-center rounded-full hover:scale-[99.5%] bg-gradient text-white"
        >
          {isLoading ? (
            <Icon icon="svg-spinners:bars-rotate-fade" fontSize={20} />
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;
