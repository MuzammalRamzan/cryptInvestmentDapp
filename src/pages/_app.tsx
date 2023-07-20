import "@/styles/globals.css";
import "./app.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, bsc } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { NextIntlProvider } from "next-intl";

const config = createConfig(
  getDefaultConfig({
    appName: "yPredict App",
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [bsc, mainnet, polygon],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);
export default function App({ Component, pageProps }: AppProps) {
  // const config: Partial<FullConfig> = {
  //   readOnlyChainId: supportedChainId,
  //   readOnlyUrls: {
  //     [supportedChainId]: rpcUrl,
  //   },
  //   pollingInterval: 50000,
  //   notifications: {
  //     expirationPeriod: 1000,
  //     checkInterval: 1000,
  //   },
  //   refresh: 3,
  // };

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <NextIntlProvider messages={pageProps.messages}>
          <Toaster
            position="top-center"
            toastOptions={{ style: { fontSize: 14 } }}
            reverseOrder={false}
          />
          <Component {...pageProps} />
        </NextIntlProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
