"use client";
import React, { useState, useEffect } from "react";
import color from "@/data/Languages.json";
import { Input } from "../ui/input";

interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface LanguageColors {
  [key: string]: string;
}

async function getRepositories(username: string): Promise<Repository[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default function AllRepositories({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repository[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchRepositories() {
      const repos = await getRepositories(username);
      setRepos(repos);
    }
    fetchRepositories();
  }, [username]);

  const filteredRepos = repos?.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center flex-1 gap-4 text-color8 min-h-[50dvh]">
      <Input
        className="bg-[#e9ebed21] text-color7 focus-visible:ring-offset-1 focus-visible:ring-offset-color6 placeholder:text-[#7f7f7f] placeholder:text-[clamp(16px,3dwv,28px)] h-10 border-none "
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
        placeholder="Search Repositories"
      />
      {!filteredRepos ? (
        <section className="border border-color4 w-full flex-1 rounded p-4 flex items-center justify-center text-color8 min-h-[50dvh]">
          No Repositories Found
        </section>
      ) : (
        <section className="border-t border-color4 flex-1 rounded flex flex-col items-center text-color8 min-h-[50dvh] w-full">
          {filteredRepos.map((item, index) => (
            <div
              key={index}
              className="border-b text-color5 border-b-color4 flex py-6 w-full justify-between"
            >
              <div className="flex flex-col w-4/5">
                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-xl font-semibold">
                    {item.name}
                  </span>
                  <div className="text-xs text-color5 border rounded-full px-2 leading-[18px] border-color3">
                    Public
                  </div>
                </div>
                <div className="mt-2 text-sm">{item.description}</div>
                <div className="mt-4 text-xs flex gap-4">
                  <div className="items-center flex gap-1">
                    {item.language && (
                      <div
                        className="h-3 aspect-square rounded-full"
                        style={{
                          backgroundColor:
                            (color as LanguageColors)[item.language] || "gray",
                        }}
                      />
                    )}
                    <span>{item.language}</span>
                  </div>
                  {item.forks_count > 0 && (
                    <div className="flex gap-1 items-center">
                      <svg
                        aria-label="fork"
                        role="img"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        className="fill-current"
                      >
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                      </svg>
                      {item.forks_count}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-color3 border whitespace-nowrap h-fit border-color4 rounded text-xs px-3 py-[5px]">
                {item.stargazers_count} Stars
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
