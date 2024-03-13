"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectWalletButton = () => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
      return;
    }
    const connector = connectors[0];
    connect({ connector });
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-gray-800 font-sans text-white font-medium py-2 px-4 rounded hover:bg-opacity-80 duration-200 hover:shadow-xl"
    >
      {isConnected ? "Disconnect" : "Connect Wallet"}
    </button>
  );
};
