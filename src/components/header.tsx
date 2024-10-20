"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react"; // Import ThirdwebProvider
import { darkTheme } from "thirdweb/react";

export function HeaderComponent() {
  const pathname = usePathname();

  require("dotenv").config();

  const client = createThirdwebClient({
    clientId: process.env.THIRDWEB_CLIENT_ID || "defaultClientId",
    secretKey: process.env.THIRDWEB_SECRET_KEY || "defaultSecretKey",
  });

  const wallets = [
    createWallet("io.metamask"),
    // createWallet("me.rainbow"),
    // createWallet("io.rabby"),
    // createWallet("com.coinbase.wallet"),
    // createWallet("org.uniswap"),
    // createWallet("com.trustwallet.app"),
    // createWallet("com.okex.wallet"),
    // createWallet("io.zerion.wallet"),
    // add other wallets...
  ];

  return (
    <ThirdwebProvider>
      <header className="bg-black/90 backdrop-blur-sm text-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/dtunesLogo.png?height=40&width=40"
                  alt="dTunes Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </Link>
              <nav className="ml-10">
                <ul className="flex space-x-4 justify-center">
                  <li>
                    <Link
                      href="/"
                      className={` justify-center px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === "/"
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === "/about/"
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <ConnectButton
              // auth={{
              //   isLoggedIn: async (address) => {
              //     console.log("checking if logged in!", { address });
              //     return await isLoggedIn();
              //   },
              //   doLogin: async (params) => {
              //     console.log("logging in!", params);
              //   },
              //   getLoginPayload: async ({ address }) =>
              //     generatePayload({ address }),
              //   doLogout: async () => {
              //     console.log("logging out!");
              //   },
              // }}
              client={client}
              wallets={wallets}
              theme={darkTheme({
                colors: { borderColor: "#ffffff" },
              })}
              connectButton={{ label: "Sign In" }}
              connectModal={{
                size: "compact",
                title: "Connect",
                showThirdwebBranding: false,
              }}
            />
          </div>
        </div>
      </header>
    </ThirdwebProvider>
  );
}
