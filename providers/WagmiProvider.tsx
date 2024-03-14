import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MetaMaskProvider } from "@metamask/sdk-react";

import { createPublicClient, http } from "viem";
import { linea } from "viem/chains";

export const client = createPublicClient({
  chain: linea,
  transport: http(),
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Provider: React.FC<WagmiProviderProps> = ({ children }) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "RAD Starter",
      url: host,
    },
  };

  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </MetaMaskProvider>
  );
};

export default Provider;
