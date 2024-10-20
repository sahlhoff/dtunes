"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header className="bg-black/90 backdrop-blur-sm text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/dtunesLogo.png?height=40&width=40"
                alt="Your Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
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
      </div>
    </header>
  );
}
