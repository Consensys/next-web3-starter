"use client";

import { WagmiProvider, deserialize, serialize } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { createPublicClient, http } from "viem";
import { linea } from "viem/chains";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const client = createPublicClient({
  chain: linea,
  transport: http(),
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<WagmiProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        retry: 0,
      },
      mutations: { networkMode: "offlineFirst" },
    },
  });

  const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
  });

  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {children}
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
