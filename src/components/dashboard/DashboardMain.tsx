"use client";
import React, { useState } from "react";
import DashboardNav from "./DashboardNav";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function DashboardMain() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      // Redirect to the dynamic route with the username
      router.push(`/${username}`);
    }
  };
  return (
    <div className="flex items-center flex-col flex-1 px-4">
      <DashboardNav session={session} />
      <div className="flex flex-col mb-10 pt-36">
        <span className="text-3xl md:text-5xl flex text-color8 font-bold">
          Hello,
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-color8 to-slate-500">
            {session?.user?.name}
          </span>
        </span>

        <h2 className="text-2xl md:text-4xl text-color7 font-bold mt-1">
          How can I help you today?
        </h2>
      </div>
      <form
        className="flex flex-col md:flex-row gap-2 w-full max-w-md items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input
          className="bg-[#e9ebed21] text-color7 focus-visible:ring-offset-1 focus-visible:ring-offset-color6 placeholder:text-[#7f7f7f] placeholder:text-[clamp(16px,3dwv,28px)] h-10 border-none "
          type="link"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter GitHub Link"
        />
        <Button
          className="bg-color8 text-color1 md:w-fit w-full h-10 hover:bg-color7 ml-[0_!important]"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
