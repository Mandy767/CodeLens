import React from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

interface AccountProps {
  session: Session | null;
}

export default function AccountButton({ session }: AccountProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-full flex md:w-10 items-center gap-4 rounded">
          <div
            style={{
              backgroundImage: session
                ? `url(${session?.user?.image})`
                : "#E9EBED",
            }}
            className="aspect-square h-full rounded-full bg-cover overflow-clip"
          ></div>
          <div className="md:hidden flex text-color8">
            {session?.user?.name}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-color2 text-color7 border-color4">
        <DropdownMenuItem className="hover:bg-color3">
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-color3">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-color4" />
        <DropdownMenuItem
          className="hover:bg-color3"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
