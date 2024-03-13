import { http, createConfig } from "wagmi";
import { lineaTestnet, mainnet, linea } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, linea, lineaTestnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [linea.id]: http(),
    [lineaTestnet.id]: http(),
  },
});
