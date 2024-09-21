import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gray-300 bg-gray-200 py-4">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="mb-4 flex flex-wrap justify-center md:mb-0 md:justify-start">
          <ul className="flex space-x-8 text-gray-700">
            <li>
              <Link href="/properties" className="hover:underline">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
