import AllRepositories from "@/components/user/AllRepositories";
import UserNavbar from "@/components/user/UserNavbar";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  // Add other fields as needed
}

async function getUser(username: string): Promise<User | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUser(params.username);
  return {
    title: user ? `${user.login} - GitHub Profile` : "User Not Found",
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }

  return (
    <div className="text-color8">
      <UserNavbar />
      <div className="max-w-5xl p-4 mx-auto pt-10 flex flex-col md:flex-row gap-6">
        <div className="flex md:w-[256px] flex-col md:h-fit w-full">
          <div className="flex flex-row items-center md:items-start gap-4 md:flex-col">
            <Image
              height={0}
              width={0}
              sizes="100%"
              src={user?.avatar_url}
              className="md:w-full w-16 shrink-0 aspect-square rounded-full object-cover overflow-clip"
              alt={user?.login}
            />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">{user?.name}</div>
              <div className="text-lg text-color6">{user?.login}</div>
            </div>
          </div>

          <div className="text-sm text-color8 mt-6">{user?.bio}</div>
        </div>
        <AllRepositories username={user?.login} />
      </div>
    </div>
  );
}
