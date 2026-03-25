"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ssr: false → wagmi does NOT try to reconnect on mount from localStorage.
// This is the key fix: wallet only connects when the user explicitly clicks.
const config = getDefaultConfig({
  appName: "Supercompute",
  projectId: "195c4b15eafe2c2f160bd7c1512ba93a",
  chains: [base],
  ssr: false,
});

const queryClient = new QueryClient();

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
