import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col bg-footer">
      <div className="flex flex-row justify-between py-14 px-4 md:px-10 lg:px-16 xl:px-20">
        <span className="text-white text-[clamp(28px,4dvw,36px)]">
          CodeLens
        </span>
        <div className="flex-1"></div>
        <div className="flex flex-col space-y-1 pr-10">
          <Link href="/" className="text-white text-sm font-light">
            About
          </Link>
          <Link href="/contact" className="text-white text-sm font-light">
            Contact
          </Link>
          <Link href="/login" className="text-white  text-sm font-light">
            Login
          </Link>
        </div>
      </div>

      <div className="flex flex-row space-x-4 justify-center p-5">
        <span className="text-white text-xs font-thin">
          Terms and Conditions
        </span>
        <div className="flex space-x-1">
          <span className="text-white text-xs font-thin">Copyright © </span>
          <span className="text-white text-xs text-bold">CodeLens</span>
        </div>
      </div>
    </div>
  );
}
