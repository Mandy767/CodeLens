"use client";
import React from "react";
import AccountButton from "../dashboard/AccountButton";
import { useSession } from "next-auth/react";

export default function UserNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-between border-b border-b-color4 items-center p-4">
      <span className="text-xl">CodeLens</span>

      <div className="flex gap-2 items-center">
        <div className="md:flex hidden gap-4 items-center">
          <button
            type="button"
            className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-10 rounded bg-color3 ring-0 text-slate-300 shadow-[inset_1px_1px_0_0_#ffffff0d] hover:bg-color4"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none text-slate-300 dark:text-slate-400"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
            <span className="flex-auto">Quick search...</span>
            <kbd className="font-sans font-semibold dark:text-slate-500">
              <abbr
                title="Control"
                className="no-underline text-slate-300 dark:text-slate-500"
              >
                Ctrl
              </abbr>
              K
            </kbd>
          </button>
          <div className="h-10 w-[1px] bg-color4" />
          <AccountButton session={session} />
        </div>
      </div>
    </nav>
  );
}
